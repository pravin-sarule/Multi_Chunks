/**
 * Script to configure CORS on Google Cloud Storage buckets
 * Run this once to enable direct uploads from the frontend
 * 
 * Usage: node scripts/setupBucketCors.js
 */

require('dotenv').config({ path: './.env' });
const { Storage } = require('@google-cloud/storage');

let credentials;
if (process.env.GCS_KEY_BASE64) {
  const jsonString = Buffer.from(process.env.GCS_KEY_BASE64, 'base64').toString('utf-8');
  credentials = JSON.parse(jsonString);
} else {
  credentials = require('../gcs-key.json');
}

const storage = new Storage({ credentials });

const inputBucketName = process.env.GCS_INPUT_BUCKET_NAME || 'fileinputbuckets';
const outputBucketName = process.env.GCS_OUTPUT_BUCKET_NAME;
const defaultBucketName = process.env.GCS_BUCKET_NAME || inputBucketName;

async function setupBucketCors() {
  try {
    // CORS configuration for direct uploads
    const corsConfig = [
      {
        origin: ['*'], // Allow all origins, or specify: ['http://localhost:5173', 'https://yourdomain.com']
        method: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        responseHeader: [
          'Content-Type',
          'Content-Length',
          'x-goog-resumable',
          'x-goog-requested-with',
          'x-goog-upload-command',
          'x-goog-upload-header-content-length',
          'x-goog-upload-header-content-type',
          'x-goog-upload-offset',
          'x-goog-upload-status',
          'x-goog-upload-url',
        ],
        maxAgeSeconds: 3600,
      },
    ];

    // Configure CORS for input bucket (used for batch uploads)
    if (inputBucketName) {
      console.log(`📤 Configuring CORS for bucket: ${inputBucketName}`);
      const inputBucket = storage.bucket(inputBucketName);
      await inputBucket.setCorsConfiguration(corsConfig);
      console.log(`✅ CORS configured for ${inputBucketName}`);
    }

    // Configure CORS for default bucket
    if (defaultBucketName && defaultBucketName !== inputBucketName) {
      console.log(`📤 Configuring CORS for bucket: ${defaultBucketName}`);
      const defaultBucket = storage.bucket(defaultBucketName);
      await defaultBucket.setCorsConfiguration(corsConfig);
      console.log(`✅ CORS configured for ${defaultBucketName}`);
    }

    // Configure CORS for output bucket if it exists
    if (outputBucketName) {
      console.log(`📤 Configuring CORS for bucket: ${outputBucketName}`);
      const outputBucket = storage.bucket(outputBucketName);
      await outputBucket.setCorsConfiguration(corsConfig);
      console.log(`✅ CORS configured for ${outputBucketName}`);
    }

    console.log('\n✅ All buckets configured successfully!');
    console.log('You can now upload files directly from the frontend.');
  } catch (error) {
    console.error('❌ Error configuring CORS:', error.message);
    if (error.code === 403) {
      console.error('⚠️  Permission denied. Make sure your service account has Storage Admin role.');
    }
    process.exit(1);
  }
}

setupBucketCors();

