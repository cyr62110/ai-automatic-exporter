export default class Result {

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
