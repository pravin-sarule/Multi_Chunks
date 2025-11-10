

// const { bucket, fileInputBucket } = require('../src/config/gcs'); // Make sure this is correctly importing your initialized bucket

// /**
//  * Upload a file buffer to Google Cloud Storage
//  */
// exports.uploadToGCS = async (filename, buffer, folder = 'uploads', isBatch = false) => {
//   const targetBucket = isBatch ? fileInputBucket : bucket;
//   const timestamp = Date.now();
//   const destination = `${folder}/${timestamp}_${filename}`;
//   const file = targetBucket.file(destination);

//   await file.save(buffer, {
//     resumable: false,
//     contentType: 'auto',
//     metadata: {
//       cacheControl: 'public, max-age=31536000'
//     },
//   });

//   // Return GCS path (not signed URL)
//   return { url: file.publicUrl(), path: destination };
// };

// /**
//  * Generate a temporary signed URL for download
//  */
// exports.getSignedUrl = async (gcsPath, expiresInSeconds = 300) => {
//   const file = bucket.file(gcsPath);

//   const [url] = await file.getSignedUrl({
//     version: 'v4',
//     action: 'read',
//     expires: Date.now() + expiresInSeconds * 1000, // Default 5 minutes
//   });

//   return url;
// };
const { bucket, fileInputBucket } = require('../config/gcs');
const path = require('path');

/**
 * Upload a file buffer to Google Cloud Storage
 *
 * @param {string} filename - Original file name
 * @param {Buffer} buffer - File buffer
 * @param {string} folder - Destination folder in GCS
 * @param {boolean} isBatch - If true, upload to fileInputBucket (for DocAI)
 * @param {string} mimetype - File MIME type
 * @returns {Promise<{ gsUri: string, gcsPath: string }>}
 */
exports.uploadToGCS = async (
  filename,
  buffer,
  folder = 'uploads',
  isBatch = false,
  mimetype = 'application/octet-stream'
) => {
  const targetBucket = isBatch ? fileInputBucket : bucket;
  const timestamp = Date.now();

  // Ensure safe filename
  const safeFilename = filename.replace(/\s+/g, '_');
  const destination = path.posix.join(folder, `${timestamp}_${safeFilename}`);
  const file = targetBucket.file(destination);

  await file.save(buffer, {
    resumable: false,
    metadata: {
      contentType: mimetype,
      cacheControl: 'public, max-age=31536000',
    },
  });

  // Return gs:// URI for internal use
  return {
    gsUri: `gs://${targetBucket.name}/${destination}`,
    gcsPath: destination,
  };
};

/**
 * Generate a temporary signed URL for download
 *
 * @param {string} gcsPath - Path inside the main bucket
 * @param {number} expiresInSeconds - Expiry in seconds (default 5 min)
 * @returns {Promise<string>} Signed URL
 */
exports.getSignedUrl = async (gcsPath, expiresInSeconds = 300) => {
  const file = bucket.file(gcsPath);

  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + expiresInSeconds * 1000,
  });

  return url;
};

/**
 * Generate a V4 signed URL so clients can upload directly to GCS.
 *
 * @param {Object} options
 * @param {string} options.filename - Original filename (used for path suffix)
 * @param {string} options.folder - Destination folder/prefix inside the bucket
 * @param {string} options.contentType - MIME type that the client must use for upload
 * @param {number} [options.expiresInSeconds=900] - URL validity duration
 * @param {boolean} [options.isBatch=false] - Whether to target the batch input bucket
 * @returns {Promise<{ signedUrl: string, expiresAt: string, gcsPath: string, gsUri: string, bucket: string }>}
 */
exports.generateV4UploadSignedUrl = async ({
  filename,
  folder = 'uploads',
  contentType = 'application/octet-stream',
  expiresInSeconds = 900,
  isBatch = false,
}) => {
  const targetBucket = isBatch ? fileInputBucket : bucket;
  const safeFilename = filename.replace(/\s+/g, '_');
  const timestamp = Date.now();
  const destination = path.posix.join(folder, `${timestamp}_${safeFilename}`);

  const file = targetBucket.file(destination);
  const expirationMs = Date.now() + expiresInSeconds * 1000;

  const [signedUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: expirationMs,
    contentType,
  });

  return {
    signedUrl,
    expiresAt: new Date(expirationMs).toISOString(),
    gcsPath: destination,
    gsUri: `gs://${targetBucket.name}/${destination}`,
    bucket: targetBucket.name,
  };
};
