import Results from "../utils/results";

export default class ExportManager {

    constructor(configManager, formatManager, exporterManager) {
        this._configManager = configManager;
        this._formatManager = formatManager;
        this._exportedManager = exporterManager;
    }

    setConfigPath(configPath) {
        this._configManager.setConfigPath(configPath);
    }

    /**
     * Read the configuration and export all export profiles in it as images.
     *
     * @return {Results} a results containing the result of each export profile described in the configuration.
     */
    export() {
        var configResult = this._configManager.load();
        if (configResult.isError()) {
            return Results.just(loadResult);
        }

        let exportResults = _(configManager.getExportProfiles()).chain()
            .map((exportProfile) => {
                let exporter = exporterManager.getExporterForProfile(exportProfile);
                if (exporter === null) {
                    return Result.error(exportProfile.getSource(), "Cannot find an exporter");
                }
                return exporter.exportAsFile(exportProfile);
            })
            .reduce((results, result) => {
                results.add(result);
                return results;
            }, new Results())
            .value();
        return exportResults;
    }
}