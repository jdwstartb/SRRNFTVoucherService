import low from 'lowdb';

import {EditionService} from './edition-service'

const editionService = new EditionService()

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('.data/db.json');
var db = low(adapter);

// default user list
db.defaults({
    vouchers: [
        {"code": "abc", "used": "true"},
    ]
}).write();


export class VoucherService {

    invalidateVoucher(voucherCode) {
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

}