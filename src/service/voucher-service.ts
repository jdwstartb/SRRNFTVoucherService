import low from 'lowdb';

import {EditionService} from './edition-service'

const editionService = new EditionService()

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('.data/db.json');
var db = low(adapter);

// default user list
db.defaults({ vouchers: [
        {"code":"abc", "used":"true"},
    ]
}).write();


export class VoucherService {

    invalidateVoucher(voucherCode) {
        this.addUsedVoucher(voucherCode)
    }

    isValidVoucher(voucherCode) {
        console.log(editionService.getEdition(voucherCode))
        if (editionService.getEdition(voucherCode) === -1){
            return false
        }
        const usedVouchers: any[] = this.getUsedVouchers()
        const wasUsed = usedVouchers.findIndex((ele) => voucherCode === ele.code)

        return (wasUsed < 0)
    }

    getUsedVouchers(){
        var vouchers: any[] = [];
        var vouchersEntries = db.get('vouchers').value()
        vouchersEntries.forEach(function(vouch) {
            vouchers.push({code: vouch.code, used: vouch.used });
        });


        return vouchers
    }

    addUsedVoucher(theVoucher){
        db.get('vouchers')
            .push({ code: theVoucher, used:true })
            .write()
    }

}