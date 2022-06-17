import {VoucherService} from "../voucher-service";


describe("VoucherService", () => {
    let service

    let validKey = "validKey"
    let invalidKey = "otherKey"
    let keyToUse

    beforeAll(() => {

        service = new VoucherService()

        keyToUse = "keyToConsume"

        process.env.SRR_MINTER_MINT_KEYS = `${validKey},${keyToUse}`
        service.resetVouchers()
    })


    describe('lifecycle', () => {
        it("key stays valid by only asking", () => {
            expect(service.isValidVoucher(validKey)).toBeTruthy()
            expect(service.isValidVoucher(validKey)).toBeTruthy()
        })

        it("invalidates a valid key", () => {
            expect(service.isValidVoucher(keyToUse)).toBeTruthy()
            service.invalidateVoucher(keyToUse)
            expect(service.isValidVoucher(keyToUse)).toBeFalsy()

            expect(() => service.invalidateVoucher(keyToUse)).toThrowError(/invalid/)
        })
    })


})