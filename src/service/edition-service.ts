

const voucherKeys: string[] = process.env.MINT_KEYS?.split(",") || []

export class EditionService {


    getEdition(voucherCode) {
        console.log(voucherKeys)
        console.log( process.env.MINT_KEYS)
        console.log( process.env)

        return voucherKeys.findIndex((ele) => voucherCode === ele)
    }

    getEditionTotal(){
        return voucherKeys.length
    }

}