import ExportFormat from "./exportformat";

export default class JpegExportFormat extends ExportFormat {

    getFormatNames() {
        return ['jpg', 'jpeg'];
    }

    getExportType() {
        return ExportType.JPEG;
    }

    getDefaultExportOptions() {
        return new ExportOptionsJPEG();
    }

    getExtension() {
        return 'jpg';
    }
}
