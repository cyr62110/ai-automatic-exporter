import _ from 'underscore/underscore';
import Result from "./result";

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
     * @return {string} All result messages concatenated.
     */
    getMessagesAsString() {
        return _(this._results).chain()
            .filter((result) => { return result.isError() })
            .reduce((messages, result) => {
                if (messages.length > 0) {
                    messages += '\n';
                }
                return messages + result.getMessage();
            }, "")
            .value();
    }

    toString() {
        return _(this._results)
            .reduce((messages, result) => {
                if (messages.length > 0) {
                    messages += '\n';
                }
                return messages + result.toString();
            }, "");
    }

    /**
     * Instantiate a Results instance with a single Result in it.
     * @return {Results} a Results.
     */
    static just(result) {
        let results = new Results();
        results.add(result);
        return results;
    }

    /**
     * Instantiate a Results with a single successful Result in it.
     * @return {Results} a successful Results.
     */
    static success(element) {
        return Results.just(Result.success(element));
    }

    /**
     * Instantiate a Results with a single failed Result in it.
     * @return {Results} a failed Results.
     */
    static error(element, message) {
        return Results.just(Result.error(element, message));
    }
}
