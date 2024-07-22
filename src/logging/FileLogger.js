const fs = require('fs').promises;
const Logger = require('./Logger');

class FileLogger extends Logger {
    constructor(filePath) {
        super();
        this.filePath = filePath;
    }

    async log(message) {
        try {
            await fs.appendFile(this.filePath, `${new Date().toISOString()} - ${message}\n`);
        } catch (error) {
            console.error(`Failed to write log: ${error.message}`);
        }
    }
}

module.exports = FileLogger;
