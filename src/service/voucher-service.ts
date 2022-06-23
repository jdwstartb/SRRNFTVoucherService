import low from 'lowdb';

import {EditionService} from './edition-service'

const editionService = new EditionService()

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.SRR_MINTER_DB_FILE || ".data/db-test.json");
const db = low(adapter);

// default user list
db.defaults({
    vouchers: [
        {"code": "abc", "used": "true"},
    ]
}).write();


export class VoucherService {

    async invalidateVoucher(voucherCode): Promise<void> {
        if (!this.isValidVoucher(voucherCode)) {
            throw new Error("voucher code invalid")
        }
        this.addUsedVoucher(voucherCode)
    }

    isValidVoucher(voucherCode) {
        if (editionService.getEdition(voucherCode) === 0) {
            return false
        }
        const usedVouchers: any[] = this.getUsedVouchers()
        const wasUsed = usedVouchers.findIndex((ele) => voucherCode === ele.code)

        return (wasUsed < 0)
    }

    getEdition(voucherCode) {
        return editionService.getEdition(voucherCode)
    }

    getUsedVouchers() {
        let usedVouchers: any[] = [];
        let vouchersEntries = db.get('vouchers').value()
        vouchersEntries.forEach(function (vouch) {
            usedVouchers.push({code: vouch.code, used: vouch.used});
        });


        return usedVouchers
    }

    addUsedVoucher(theVoucher) {
        db.get('vouchers')
            .push({code: theVoucher, used: true})
            .write()
    }

    resetVouchers() {
        let vouchersEntries = db.set('vouchers', []).write()
    }

}