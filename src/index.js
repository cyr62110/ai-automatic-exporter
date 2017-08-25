import _ from "underscore/underscore"
import FormatManager from "./core/formatmanager";
import JpegExportFormat from "./format/jpegexportformat";
import PngExportFormat from "./format/pngexportformat";
import ExporterManager from "./core/exportermanager";
import SimpleArtboardExporter from "./exporter/artboard/simpleartboardexporter";
import ConfigManager from "./core/configmanager";
import WebExportProfileBuilder from "./config/webexportprofilebuilder";
import Results from "./utils/results";

function main()
{
    if (app.activeDocument === null) {
        Window.alert("Make sure you have an active document before launching export script.");
        return;
    }

    let formatManager = new FormatManager();
    formatManager.registerExportFormat(new JpegExportFormat());
    formatManager.registerExportFormat(new PngExportFormat());

    let exporterManager = new ExporterManager();
    exporterManager.registerExporter(new SimpleArtboardExporter(formatManager));

    let configManager = new ConfigManager();
    configManager.registerExportProfileBuilder(new WebExportProfileBuilder(formatManager));
    configManager.setDocument(app.activeDocument);
    configManager.setConfigPath("/Users/cyr62110/Documents/Projets/fftcg-deck-master-graphics/raw/exports.json");
    configManager.setBaseOutputDir(new File("/Users/cyr62110/Desktop/exports"));

    let configResult = configManager.load();
    if (configResult.isError()) {
        Window.alert(configResult.toString());
        return;
    }



    Window.alert(exportResults.toString());
}

main();
