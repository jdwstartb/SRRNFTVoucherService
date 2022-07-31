import faker from '@faker-js/faker';
import {MintRequestProcessingService} from "../mint-request-processing-service";
import {MintRequestParams} from "../../types/mint-request-params";
import {getValidCustomParams} from "../../custom_content/test/custom-param-factory";


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
        const result = await service.performMintRequest(invalidKeyParams)
        expect(result).toMatchObject({success: false})
    })

    it("returns a successful object", async () => {
        const validParams = {...getValidCustomParams().params, props: "props-props-pirate", voucher: validKey} as any
        const result = await service.performMintRequest(validParams)
        expect(result).toMatchObject({success: true})
    })

    describe('crowns', () => {
        it('rejects if the prop is a crown and the voucher is not allowed to take it.', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: validKey,
                props: "props-props-crownfirst"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: false})
        })

        it('allows regular choice.', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: validKey,
                props: "props-props-pirate"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: true})
        })


        it('allows crown for first place', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: "and",
                props: "props-props-crownfirst"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: true})
        })

        it('rejects if the prop is first place crown and the voucher is second place.', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: "bbb",
                props: "props-props-crownfirst"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: false})
        })

        it('rejects if the prop is third place crown and the voucher is first place.', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: "and",
                props: "props-props-crownthird"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: false})
        })

        it('rejects if the prop is second place crown and the voucher is third place.', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: "klm",
                props: "props-props-crownsecond"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: false})
        })

        it('rejects if the prop is first place but no crown is chosen', async () => {
            const validParams = {
                ...getValidCustomParams().params,
                voucher: "klm",
                props: "props-props-pirate"
            } as any
            expect(await service.validatePropChoice(validParams)).toMatchObject({success: false})
        })


    })


})