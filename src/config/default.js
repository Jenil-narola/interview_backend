module.exports = {
    "winston": {
        "level": "debug"
    },
    "logging": {
        "razorpay": false,
    },
    "bcryptjs": {
        "salt": 6
    },
    "cors": {
        "whitelist": ["http://www.example.com"]
    },
    "awsSDK": {
        "region": "ca-central-1",
        "bucketName": "lynx-prod",
        "directory": {
            "sftp": "sftp",
            "files": "files",
        },
        "acl": "public-read"
    },
    "multer": {
        "validMimeType": [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "application/pdf",
            "audio/mp3",
            "audio/x-wav",
            "audio/wav",
            "audio/mpeg",
            "audio/ogg",
            "audio/mp4",
            "video/mp4",
            "video/x-flv",
            "video/x-msvideo",
            "video/x-ms-wmv",
            "video/quicktime",
            "video/webm",
            "video/x-matroska",
            "video/3gpp",
            "video/3gpp2",
            "video/avi",
            "video/mpeg",
            "video/ogg",
            "video/x-ms-asf",
            "application/octet-stream",
            "application/x-x509-ca-cert"
        ],
        "maxSize": 500 * 1024 * 1024
    },
    healthCheckPaths: [
        "/",
        "/health",
        '/_ah/start',
    ],
    ignoreLogPaths: [
        '/favicon.ico',
        '/images/icons/gear.png'
    ],
    sensitiveKey: [
        'password',
        'token',
        'authorization',
        'auth',
        'access_token',
        'user-agent',
        'passphrase'
    ]
}