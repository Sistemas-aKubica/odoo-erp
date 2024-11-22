import { useService } from "@web/core/utils/hooks";
import { BarcodeVideoScanner } from "@web/core/barcode/barcode_video_scanner";

export class UserQRCodeScanner extends BarcodeVideoScanner {
    static props = ['setEmail'];
    setup() {
        super.setup();
        this.barcodeScanner = useService("user_qr_code_reader");
        this.sound = useService("mail.sound_effects");
        this.notification = useService("notification");
        this.props = {
            ...this.props,
            facingMode: "environment",
            onResult: (result) => this.onResult(result),
            onError: console.error,
            delayBetweenScan: 2000,
        };
    }
    onResult(result) {
        this.props.setEmail(result)
        this.sound.play("beep");
        this.notification.add(
            "Email read successfully from QR code",
            { autocloseDelay: 3000, title: "Code scanned", type: 'success' }
        );
    }
}
