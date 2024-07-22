class Logger {
    static info(message) {
        console.log(`INFO: ${message}`);
    }

    static error(message, error) {
        console.error(`ERROR: ${message}`, error);
    }
}

module.exports = { Logger };
