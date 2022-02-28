const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis)

const host = '127.0.0.1'
const port = 6379
const password = '123456'

const client = redis.createClient({
    host,
    port,
    password,
    retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
            return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error("Retry time exhausted")
        }
        if (options.attempt > 10) {
            return undefined
        }
        return Math.min(options.attempt * 100, 3000);
    },
})

client.on("error", function(e) {
    console.error('dynamic-render redis error: ', e)
});



const redisClient = {
    client
}
module.exports = redisClient