import {PNGFromSvgGenerator} from './svg-generator-service'
import {IssueRequestPayloadService} from './issue-request-payload-service'
import {VoucherService} from './voucher-service'
import {NFTSVGBuilderService} from './nft-svg-builder-service'
import {EditionService} from "./edition-service";
import {PinataService} from "./pinata-service";
import {MintRequestParams} from "../mint-request-params";
import {SrrApiService} from "./srr-api-service";
import {Logger} from "../util";


const pngFromSvgGenerator = new PNGFromSvgGenerator()
const voucherService = new VoucherService()
const svgBuilderService = new NFTSVGBuilderService()
const editionService = new EditionService()
const pinataService = new PinataService()
const metadataService = new IssueRequestPayloadService(editionService)
const srrApiService = new SrrApiService()

export class MintRequestProcessingService {

    async performMintRequest(requestParams: MintRequestParams): Promise<{ success: boolean, message: string }> {


        const theVoucher = requestParams.voucher

        const validationResult = await this.validateRequest(theVoucher)
        if (!validationResult.success) {
            return validationResult
        }

        const pngData = await this.generatePng(requestParams)

        const pinataResponse = await this.uploadPng(pngData, theVoucher)

        if (!pinataResponse.success) {
            return {success: false, message: "Error when uploading requested image"}
        }

        const startrailAPIResponse = await this.handleStartrailRequest(requestParams, pinataResponse.payload.url)

        if (startrailAPIResponse.success) {
            await voucherService.invalidateVoucher(theVoucher)
            return {success: true, message: "ok"}
        }
        return {success: false, message: "error"}
    }


    async validateRequest(theVoucher: string): Promise<{ success: boolean, message: string }> {
        if (!voucherService.isValidVoucher(theVoucher)) {
            return {success: false, message: "validation Error"}
        }

        return {success: true, message: "OK"}
    }


    async generatePng(requestParams: MintRequestParams): Promise<string | Buffer> {

        this.logger.log('starting SVG generation')
        const nftImageSource = await svgBuilderService.buildSVGString(requestParams)
        this.logger.log('build SVG string done')


        const pngBuffer = await pngFromSvgGenerator.transform(nftImageSource)
        this.logger.log('transformation done')
        
        return pngBuffer
    }

    async uploadPng(fileContentData: Buffer | string, theVoucher: string): Promise<{ success: boolean, message: string, payload: { url: string } }> {
        const editionNumber = voucherService.getEdition(theVoucher)

        const fileName = `SBNYv1-${editionNumber}`

        this.logger.log('pinata start')
        const pinataResponse = await pinataService.uploadImage(fileContentData, fileName)
        this.logger.log('pinata done')

        return pinataResponse
    }

    async handleStartrailRequest(requestParams: MintRequestParams, imageUrl): Promise<{ success: boolean }> {

        this.logger.log('preparing issue request payload ...')
        const srrMetadata = metadataService.getIssueSRRRequestPayload(requestParams, imageUrl)
        this.logger.log('preparing issue request payload done')


        this.logger.log('starting issue request ...')
        const startrailAPIResponse = await srrApiService.issueAndTransferSRR(srrMetadata)
        this.logger.log('issue request done')

        return startrailAPIResponse
    }

    logger: Logger = new Logger(this.constructor.name)

}
