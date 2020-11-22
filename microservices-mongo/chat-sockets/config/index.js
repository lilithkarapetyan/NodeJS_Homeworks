module.exports = {
    user: {
        auth: {
            JWT_SECRET: "SECRET",
            timeout: 15000
        },
        infoURL:  `${process.env.API_URL}/api/users/me`
    }
}