

const voucherKeys: string[] = process.env.MINT_KEYS?.split(",") || []

export class EditionService {


    getEdition(voucherCode) {
        return voucherKeys.findIndex((ele) => voucherCode === ele)
    }

    getEditionTotal(){
        return voucherKeys.length
    }

}