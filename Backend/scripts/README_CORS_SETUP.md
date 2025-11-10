# GCS Bucket CORS Configuration

## Problem
When uploading files directly to Google Cloud Storage from the browser, you may encounter CORS errors like:
```
Access to XMLHttpRequest at 'https://storage.googleapis.com/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

This happens because the GCS bucket needs CORS configuration to allow direct uploads from your frontend.

## Solution

### Option 1: Run the Setup Script (Recommended)

1. Make sure you have the GCS credentials configured in your `.env` file or `gcs-key.json`

2. Run the setup script:
```bash
cd Backend
node scripts/setupBucketCors.js
```

This will automatically configure CORS on all your buckets (input, output, and default).

### Option 2: Configure via Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/storage/browser)
2. Select your bucket (e.g., `fileinputbuckets`)
3. Click on the **Permissions** tab
4. Click on **CORS** tab
5. Click **Edit CORS configuration**
6. Paste the following JSON:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "responseHeader": [
      "Content-Type",
      "Content-Length",
      "x-goog-resumable",
      "x-goog-requested-with",
      "x-goog-upload-command",
      "x-goog-upload-header-content-length",
      "x-goog-upload-header-content-type",
      "x-goog-upload-offset",
      "x-goog-upload-status",
      "x-goog-upload-url"
    ],
    "maxAgeSeconds": 3600
  }
]
```

7. Click **Save**

### Option 3: Configure via gsutil CLI

Create a file `cors.json`:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "responseHeader": [
      "Content-Type",
      "Content-Length",
      "x-goog-resumable",
      "x-goog-requested-with",
      "x-goog-upload-command",
      "x-goog-upload-header-content-length",
      "x-goog-upload-header-content-type",
      "x-goog-upload-offset",
      "x-goog-upload-status",
      "x-goog-upload-url"
    ],
    "maxAgeSeconds": 3600
  }
]
```

Then run:
```bash
gsutil cors set cors.json gs://fileinputbuckets
```

## Security Note

The configuration above uses `"origin": ["*"]` which allows uploads from any origin. For production, you should restrict this to your specific domains:

```json
{
  "origin": [
    "http://localhost:5173",
    "https://yourdomain.com",
    "https://www.yourdomain.com"
  ],
  ...
}
```

## Verify CORS Configuration

To verify CORS is configured correctly:

```bash
gsutil cors get gs://fileinputbuckets
```

Or check in the Google Cloud Console under the bucket's **Permissions** > **CORS** tab.

