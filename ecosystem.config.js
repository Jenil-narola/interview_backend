module.exports = {
    apps: [
        {
            name: "LYNX-API",
            script: "./server.js",
            watch: false, // Change to true if you want to watch file changes and restart the server automatically
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production",
            },
            autorestart: false,
            error_file: "/home/ubuntu/LYNX-err.log",
            out_file: "/home/ubuntu/LYNX-out.log"
        }
    ]
}