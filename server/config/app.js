require('dotenv').config();

module.exports = {

    LOCAL_URL: {
        URL: process.env.URL,
        PORT: process.env.PORT,
        ENV: process.env.ENV,
        APP_NAME: process.env.APP_NAME,
    },
    JWT: {
        SECRET: process.env.JWT_SECRET,
    },
    DATABASE: {
        MONGO: {
            URL: process.env.DATABASE_URL,
            PORT: process.env.DATABASE_PORT,
            DATABASE: process.env.DATABASE_NAME,

        }
    },
    DEFAULT: {
        USERNAME: "storage\\defaults\\user.png",
        PROFILENAME: "storage\\defaults\\profile.png"
    },
    STORAGE: {
        LOCAL: process.env.STORAGE
    }

}