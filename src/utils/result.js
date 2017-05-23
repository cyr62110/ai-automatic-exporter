export default class Result {

    /**
     * Default constructor for Result.
     * @param {string} element Element that we were processing.
     * @param {boolean} success true if the element has been fully processed, false otherwise.
     * @param {string} message a message indicating the cause of the error.
     */
    constructor(element, success, message) {
        this._element = element;
        this._success = success;
        this._message = (message !== undefined)?message:null;
        if (!this._success && this._message === null) {
            throw "message must be not be null for error result.";
        }
    }

    getElement() {
        return this._element;
    }

    isSuccess() {
        return this._success;
    }

    isError() {
        return !this._success;
    }

    getMessage() {
        return this._message;
    }

    static success(element) {
        return new Result(element, true);
    }

    static error(element, message) {
        return new Result(element, false, message);
    }

    toString() {
        if (this._success) {
            return `[${this._element}] SUCCESS`;
        } else {
            return `[${this._element}] FAILED: ${this._message}`;
        }
    }
}
