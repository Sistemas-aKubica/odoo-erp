import { useService } from "@web/core/utils/hooks";
import { useComponent, useEffect } from "@odoo/owl";

export function useUserQRCodeReader(callbackMap, exclusive = false) {
    const current = useComponent();
    const qrCodeReader = useService("user_qr_code_reader");
    if (qrCodeReader) {
        for (const [key, callback] of Object.entries(callbackMap)) {
            callbackMap[key] = callback.bind(current);
        }
        useEffect(
            () => qrCodeReader.register(callbackMap, exclusive),
            () => []
        );
    }
}
