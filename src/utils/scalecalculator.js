/**
 * Utility to compute the size/scale to resize an image.
 */
export default class ScaleCalculator {

    constructor(scaleCalculator) {
        this._sourceWidth = null;
        this._sourceHeight = null;
        this._outputWidth = null;
        this._outputHeight = null;
    }

    /**
     * Set the source rect. Source width and height will be computed from it.
     * @param {rect} sourceRect rect of the source.
     */
    setSourceRect(sourceRect) {
        if (sourceRect === undefined || sourceRect === null) {
            return;
        }
        let sX = sourceRect[0];
        let sY = sourceRect[1];
        let eX = sourceRect[2];
        let eY = sourceRect[3];

        this._sourceWidth = Math.abs(eX - sX);
        this._sourceHeight = Math.abs(eY - sY);
    }

    /**
     * Set the width of the source.
     * @param {number} sourceWidth width of the source.
     */
    setSourceWidth(sourceWidth) {
        this._sourceWidth = sourceWidth;
    }

    /**
     * Set the height of the source.
     * @param {number} sourceHeight height of the source.
     */
    setSourceHeight(sourceHeight) {
        this._sourceHeight = sourceHeight;
    }

    /**
     * Returns the aspect ratio (w/h) of the source.
     * @return {number} source aspect ratio.
     */
    getSourceAspectRatio() {
        if (this._sourceWidth === null || this._sourceHeight === null) {
            throw "Cannot compute source scale: source width and/or height are null.";
        }
        return this._sourceWidth / this._sourceHeight;
    }

    /**
     * Set the desired width of the output image.
     * @param {number} outputWidth output width.
     */
    setOutputWidth(outputWidth) {
        this._outputWidth = outputWidth;
    }

    /**
     * Returns the output width.
     * If none has been set, it will be infer from the output height by keeping the aspect ratio.
     * @return {number} Output width.
     */
    getOutputWidth() {
        if (this._outputWidth !== null) {
            return this._outputWidth;
        } else if (this._outputHeight !== null) {
            return this._outputHeight * this.getSourceAspectRatio();
        } else {
            return this._sourceWidth;
        }
    }

    /**
     * Returns the horizontal scale to set to transform the size of the source to the one specified output.
     * @return {number} Horizontal scale. 100% meens output width is the same as source.
     */
    getHorizontalScale() {
        if (this._sourceWidth === null) {
            throw "Cannot compute horizontal scale: source width is null.";
        }
        return (this.getOutputWidth() / this._sourceWidth) * 100.0;
    }

    /**
     * Set the desired height of the output image.
     * @param {number} outputHeight output height.
     */
    setOutputHeight(outputHeight) {
        this._outputHeight = outputHeight;
    }

    /**
     * Returns the output height.
     * If none has been set, it will be infer from the output width by keeping the aspect ratio.
     * @return {number} Output height.
     */
    getOutputHeight() {
        if (this._outputHeight !== null) {
            return this._outputHeight;
        } else if (this._outputWidth !== null) {
            return this._outputWidth / this.getSourceAspectRatio();
        } else {
            return this._sourceHeight;
        }
    }

    /**
     * Returns the vertical scale to set to transform the size of the source to the one specified output.
     * @return {number} Vertical scale. 100% meens output width is the same as source.
     */
    getVerticalScale() {
        if (this._sourceHeight === null) {
            throw "Cannot compute vertical scale: source height is null.";
        }
        return (this.getOutputHeight() / this._sourceHeight) * 100.0;
    }
}