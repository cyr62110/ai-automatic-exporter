import FormatManager from "./core/formatmanager";
import JpegExportFormat from "./format/jpegexportformat";
import PngExportFormat from "./format/pngexportformat";
import ExporterManager from "./core/exportermanager";
import {SimpleArtboardExporter} from "./exporter/artboard/simpleartboardexporter";
import ExportProfile from "./exporter/exportprofile";

if (app.activeDocument === null) {
    Window.alert("Make sure you have an active document before launching export script.");
}

let formatManager = new FormatManager();
formatManager.registerExportFormat(new JpegExportFormat());
formatManager.registerExportFormat(new PngExportFormat());

let exporterManager = new ExporterManager();
exporterManager.registerExporter(new SimpleArtboardExporter(formatManager));

let exportProfile = new ExportProfile();
exportProfile.setSource(app.activeDocument.artboards.getByName("fire"));
exportProfile.setOutputFormat("jpg");
exportProfile.setOutputFile(new File("/Users/cyr62110/Desktop/test.jpg"));

let exporter = exporterManager.getExporterForProfile(exportProfile);
let result = exporter.exportAsFile(exportProfile);
Window.alert(result.toString());