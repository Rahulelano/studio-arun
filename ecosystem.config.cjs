module.exports = {
    apps: [
        {
            name: "studio-arun-backend",
            script: "./backend/server.js",
            env: {
                NODE_ENV: "production",
                PORT: 6050
            },
            watch: false
        }
    ]
};
