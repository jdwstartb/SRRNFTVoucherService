export class ValidatorService {

    isValidVoucher(voucherCode) {
        if (getEdition(voucherCode) === -1){
            return false
        }
        const usedVouchers: any[] = getUsedVouchers()
        const wasUsed = usedVouchers.findIndex((ele) => voucherCode === ele.code)

        return (wasUsed < 0)
    }

}