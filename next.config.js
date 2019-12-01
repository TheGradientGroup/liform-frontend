module.exports = {
    env: {
        API_SERVER: process.env.NODE_ENV === 'production' ? 'http://some_api_server.site' : 'http://localhost:5000'
    }
};