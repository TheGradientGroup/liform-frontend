require('dotenv').config()
module.exports = {
    env: {
        API_SERVER: process.env.API_SERVER,
        IPSTACK_KEY: process.env.IPSTACK_KEY
    }
};