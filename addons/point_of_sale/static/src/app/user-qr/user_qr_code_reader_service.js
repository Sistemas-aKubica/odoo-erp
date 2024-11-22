import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { Mutex } from "@web/core/utils/concurrency";
import { session } from "@web/session";
import { AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { BarcodeParser } from "@barcodes/js/barcode_parser";
import { GS1BarcodeError } from "@barcodes_gs1_nomenclature/js/barcode_parser";

export class BarcodeReader {
    static serviceDependencies = ["dialog", "hardware_proxy", "notification", "action", "orm"];
    constructor(parser, { dialog, hardware_proxy, notification, action, orm }) {
        this.parser = parser;
        this.dialog = dialog;
        this.action = action;
        this.orm = orm;
        this.hardwareProxy = hardware_proxy;
        this.notification = notification;
        this.setup();
    }

    setup() {
        this.mutex = new Mutex();
        this.cbMaps = new Set();
        // FIXME POSREF: When LoginScreen becomes a normal screen, we can remove this exclusive callback handling.
        this.exclusiveCbMap = null;
        this.remoteScanning = false;
        this.remoteActive = 0;
    }

    scan(code) {
        return this.mutex.exec(() => this._scan(code));
    }
    async _scan(code) {
        if (!code) {
            return;
        }

        let parseBarcode;
        parseBarcode = this.parser.parse_barcode(code);
    }

    // the barcode scanner will listen on the hw_proxy/scanner interface for
    // scan events until disconnectFromProxy is called
    connectToProxy() {
        this.remoteScanning = true;
        if (this.remoteActive >= 1) {
            return;
        }
        this.remoteActive = 1;
        this.waitForBarcode();
    }

    async waitForBarcode() {
        const barcode = await this.hardwareProxy.message("scanner").catch(() => {});
        if (!this.remoteScanning) {
            this.remoteActive = 0;
            return;
        }
        this.scan(barcode);
        this.waitForBarcode();
    }

    // the barcode scanner will stop listening on the hw_proxy/scanner remote interface
    disconnectFromProxy() {
        this.remoteScanning = false;
    }
}

export const UserQRCodeReaderService = {
    dependencies: [...BarcodeReader.serviceDependencies, "dialog", "barcode", "orm"],
    async start(env, deps) {
        const { dialog, barcode } = deps;
        const parser = new BarcodeParser({ nomenclature: null });
        const barcodeReader = new BarcodeReader(parser, deps);

        barcode.bus.addEventListener("barcode_scanned", (ev) => {
            if (barcodeReader) {
                barcodeReader.scan(ev.detail.barcode);
            } else {
                dialog.add(AlertDialog, {
                    title: _t("Unable to parse barcode"),
                    body: _t(
                        "No barcode nomenclature has been configured. This can be changed in the configuration settings."
                    ),
                });
            }
        });

        return barcodeReader;
    },
};

registry.category("services").add("user_qr_code_reader", UserQRCodeReaderService);
