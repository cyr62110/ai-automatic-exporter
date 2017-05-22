import _ from 'underscore/underscore.js';

export default class ExporterManager {

    constructor() {
        this._exporters = [];
    }

    /**
     * Returns an instance of Exporter capable of exporting the source into the format
     * described in the export profile. It will return null if no exporter is capable.
     * @param {ExportProfile} exportProfile export profile
     * @return {Exporter}
     */
    getExporterForProfile(exportProfile) {
        return _.chain(this._exporters)
            .filter((exporter) => { return exporter.canExport(exportProfile) })
            .first()
            .value();
    }

    registerExporter(exporter) {
        this._exporters.push(exporter);
    }
}
