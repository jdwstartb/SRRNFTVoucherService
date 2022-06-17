const voucherKeys: string[] = []

export class EditionService {

    initKeys() {
        if (voucherKeys.length === 0) {
            voucherKeys.push(...(process.env.MINT_KEYS?.split(",") || []))
        }
    }

    getEdition(voucherCode) {
        this.initKeys()

        return (voucherKeys.findIndex((ele) => voucherCode === ele) + 1)
    }

    getEditionTotal() {
        return voucherKeys.length
    }

}