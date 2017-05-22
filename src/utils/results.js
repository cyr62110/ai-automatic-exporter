import _ from 'underscore/underscore.js';

export default class Results {

    constructor() {
        this._results = [];
    }

    add(result) {
        this._results.push(result);
    }

    isSuccess() {
        return _.some(this._results, (result) => {
            return result.isSuccess();
        });
    }

    /**
     * Returns all messages
     */
    getMessagesAsString() {
        return _.chain(this._results)
            .filter((result) => { return result.isError() })
            .reduce((messages, result) => {
                if (messages.length > 0) {
                    messages += '\n';
                }
                return messages + result.getMessage();
            }, "")
            .value();
    }

    /**
     * Instantiate a Results instance with a single Result in it.
     */
    static just(result) {
        var results = new Results();
        results.add(result);
        return results;
    }
}
