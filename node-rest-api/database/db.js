const dbConfig = {
    host: '127.0.0.1',
    port: 27017,
    db: 'wordUpDb',
    storage: 'mongodb'
}

dbConfig.url = `${dbConfig.storage}://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;


module.exports = dbConfig;