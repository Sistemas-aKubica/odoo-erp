/* global QRcode */

import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class QRCodeComponent extends Component {
    static template = "receipt_screen.qr_code";

    setup() {
        this.pos = usePos();
        const order = this.pos.get_order();
        this.qrDataUrl = "";

        this.generateQRCode(order);
    }

    async generateQRCode(order) {
        try {
            this.qrDataUrl = await QRCode.toDataURL(`
                {
                    "keyIdentifier": "PETROMON",
                    "type": "CONSULT",
                    "src": "odoo",
                    "url": "http://localhost:8069/jsonrpc",
                    "id": "${order.uuid}"
                }
            `, { width: 300 });
        } catch (err) {
            console.error("Failed to generate QR code", err);
        }
    }
}