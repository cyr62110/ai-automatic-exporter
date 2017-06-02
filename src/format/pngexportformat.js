import ExportFormat from "./exportformat";

export default class PngExportFormat extends ExportFormat {

    getFormatNames() {
        return ['png', 'png24'];
    }

    getExportType() {
        return ExportType.PNG24;
    }

    getDefaultExportOptions() {
        return new ExportOptionsPNG24();
    }

    getExtension() {
        return 'png';
    }
}