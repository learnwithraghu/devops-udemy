# CloudArchitect: Interactive AWS Sandbox

Master AWS architecture by building production-grade solutions in a hands-on sandbox environment. This project uses pure HTML/JS/CSS and can be served statically.

## 🚀 Quick Start (Local)

To run the sandbox locally, use any static file server.

**Option 1: Python**
```bash
python3 -m http.server 8080
```

**Option 2: Node.js (npx)**
```bash
npx serve .
```

Navigate to `http://localhost:8080` to begin.

---

## ☁️ Deployment Guide (AWS)

This application is designed to be hosted as a static website on AWS for a true "Cloud Native" experience.

### 1. S3 Static Website Hosting
1. **Create Bucket**: Create an S3 bucket (e.g., `cloud-architect-sandbox`).
2. **Upload Files**: Upload all project files (`index.html`, `site.css`, `usecases/`, `aws_icons/`, etc.).
3. **Enable Hosting**: In the **Properties** tab, enable "Static website hosting" and set `index.html` as the index document.
4. **Permissions**: In the **Permissions** tab, disable "Block all public access" (if serving directly from S3) and add a Bucket Policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

### 2. CloudFront Distribution (Recommended)
For better performance and HTTPS support:
1. **Create Distribution**: Create a CloudFront distribution with your S3 bucket as the **Origin Domain**.
2. **Origin Access Control (OAC)**: Use OAC to restrict S3 access so the bucket remains private while CloudFront serves the content.
3. **Default Root Object**: Set to `index.html`.
4. **Viewer Protocol Policy**: Select "Redirect HTTP to HTTPS".

### 3. Route 53 Custom Domain
- Create an **A Record** (Alias) in your Hosted Zone pointing to the CloudFront distribution domain name.

---

## 🛠️ Architecture
- **Core Engine**: `builder.js` / `builder.css`
- **Data Layer**: `usecase-data.js` (Defines all architectural challenges)
- **Styling**: Vanilla CSS with CSS Variables for a modern, fluid UI.

© 2026 CloudArchitect Hub. Build the Cloud. Master the Cloud.
