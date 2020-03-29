const config = require('./config/validator')

console.log("config: " + config)

let server
try {
    server = require('./server')
} catch (ex) {
    throw new Error("Server not found")
}
