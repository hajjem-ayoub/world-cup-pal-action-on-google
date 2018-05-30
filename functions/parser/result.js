class ResultParser {

    static getResult(match, type) {
        return type === 'home' ? match.home_result : match.away_result;
    }

}

module.exports = ResultParser;
