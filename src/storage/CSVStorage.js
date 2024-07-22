const fs = require('fs');

class CSVStorage {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async store(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, data, 'utf-8', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}

module.exports = CSVStorage;
