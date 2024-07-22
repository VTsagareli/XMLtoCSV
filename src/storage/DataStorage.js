class DataStorage {
    async store(filePath, data) {
        throw new Error('Method "store" must be implemented');
    }
}

module.exports = DataStorage;
