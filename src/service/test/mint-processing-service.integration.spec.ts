import faker from '@faker-js/faker';
import {MintRequestProcessingService} from "../mint-request-processing-service";
import {MintRequestParams} from "../../mint-request-params";


describe("MintProcessingService Integration", () => {

    let validKey = faker.datatype.hexaDecimal(32)
    let invalidKey = "otherKey"
    let service: MintRequestProcessingService

    beforeAll(() => {
        process.env.SRR_MINTER_MINT_KEYS = `and,bbb,klm,ttc,${validKey},abc,def,123,456,678,765`
        service = new MintRequestProcessingService()
    })

    it("returns an error if key invalid", async () => {
        const invalidKeyParams = {voucher: invalidKey} as MintRequestParams
        const result = await service.generateFileAndUploadAndMint(invalidKeyParams)
        expect(result).toMatchObject({success: false})
    })

    it("returns a successful object", async () => {
        const validParams = {voucher: validKey} as MintRequestParams
        const result = await service.generateFileAndUploadAndMint(validParams)
        expect(result).toMatchObject({success: true})
    })
})