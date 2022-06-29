import {EditionService} from "../edition-service";

describe("EditionService", () => {
    const service = new EditionService()

    process.env.SRR_MINTER_MINT_KEYS = 'abc,123,2,4,5,6'

    it("returns the edition number based on the place in the env key list in non programmer numbering", () => {

        expect(service.getEdition("123")).toEqual(2)
    })

    it("returns the edition size based on the number of entries in the env key list", () => {
        expect(service.getEditionTotal()).toEqual(6)
    })
})