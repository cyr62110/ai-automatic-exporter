import FormatManager from "./core/formatmanager";
import ExporterManager from "./core/exportermanager";
import JpegExportFormat from "./format/jpegexportformat";
import PngExportFormat from "./format/pngexportformat";
import SimpleArtboardExporter from "./exporter/artboard/simpleartboardexporter";
import ConfigManager from "./core/configmanager";
import WebExportProfileBuilder from "./config/webexportprofilebuilder";

/**
 * Class representing the entry point of the plugin for both UI and non-UI operation.
 *
 * In UI mode, it will display a window where the user can configure the plugin before
 * starting the export.
 *
 * In non-UI mode, the plugin will try to discover a configuration file and automatically
 * export profiles described in it.
 */
export default class Plugin {

    constructor() {
        this._formatManager = new FormatManager();
        this._exporterManager = new ExporterManager();
        this._configManager = new ConfigManager();

        this._registerFormats(this._formatManager);
        this._registerExporters(this._exporterManager, this._formatManager);
        this._registerExportProfileBuilders(this._configManager, this._formatManager);
    }

    _registerFormats(formatManager) {
        formatManager.registerExportFormat(new JpegExportFormat());
        formatManager.registerExportFormat(new PngExportFormat());
    }

    _registerExporters(exporterManager, formatManager) {
        exporterManager.registerExporter(new SimpleArtboardExporter(formatManager));
    }

    _registerExportProfileBuilders(configManager, formatManager) {
        configManager.registerExportProfileBuilder(new WebExportProfileBuilder(formatManager));
    }

    /**
     * Launch the plugin in UI mode.
     */
    launch() {
        // FIXME
    }

    /**
     * Launch the plugin in non-UI mode.
     */
    launchWithoutUI() {
        let document = app.activeDocument;
        if (document === null) {
            Window.alert("Make sure you have an active document before launching export script.");
            return;
        }

        let configurationFile = this._discoverConfiguration(document);
        if (configurationFile == null) {
            Window.alert("Cannot find any configuration file beside the document.");
            return;
        }

        let configResult = this._configManager.load();
        if (configResult.isError()) {
            Window.alert(configResult.toString());
            return;
        }
        Window.alert(exportResults.toString());
    }

    /**
     * Look for a configuration file named either: configs.json or <document name>.configs.json in the same
     * folder as the document.
     *
     * @param {Document} document Document from which the images will be exported.
     * @return {String} The path of the configuration or null if none can be found.
     * @private
     */
    _discoverConfiguration(document) {
        let documentFile = document.fullName;
        if (documentFile === null) {
            return null;
        }
        let configFile = null;
        let configsUri = null;

        configsUri = `${documentFile.parent.absoluteURI}/${documentFile.displayName}.exports.json`; // FIXME displayName contains ext.
        Window.alert(configsUri);
        configFile = new File(configsUri);
        if (configFile.exists) {
            return configFile;
        }

        configsUri = `${documentFile.parent.absoluteURI}/exports.json`;
        Window.alert(configsUri);
        configFile = new File(configsUri);
        if (configFile.exists) {
            return configFile;
        }

        return null;
    }
}