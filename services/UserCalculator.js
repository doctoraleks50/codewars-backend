class UserCalculator {

    getExp(levelArray) {
        return levelArray
            .reduce((sum, item) => (sum += 9 - item), 0)
    }

    getLevel(exp) {
        return 8 - (Math.floor(Math.sqrt(exp / 5)))
    }

}

module.exports = UserCalculator;