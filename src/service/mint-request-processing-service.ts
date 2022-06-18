import {PNGFromSvgGenerator} from './svg-generator-service'
import {MetadataService} from './metadata-service'
import {VoucherService} from './voucher-service'
import {NFTSVGBuilderService} from './nft-svg-builder-service'
import {EditionService} from "./edition-service";
import {PinataService} from "./pinata-service";
import {MintRequestParams} from "../mint-request-params";


const pngFromSvgGenerator = new PNGFromSvgGenerator()
const voucherService = new VoucherService()
const svgBuilderService = new NFTSVGBuilderService()
const editionService = new EditionService()
const pinataService = new PinataService()
const metadataService = new MetadataService(editionService)


export class MintRequestProcessingService {

    async requestMinting(request) {

    }


    async generateFileAndUploadAndMint(requestParams: MintRequestParams): Promise<{ success: boolean, message: string }> {


        const theVoucher = requestParams.voucher

        if (!voucherService.isValidVoucher(theVoucher)) {
            return {success: false, message: "validation Error"}
        }
        const editionNumber = voucherService.getEdition(theVoucher)

        const nftImageSource = await svgBuilderService.buildSVGString(requestParams)

        const pngBuffer = await pngFromSvgGenerator.transform(nftImageSource)

        const pinataResponse = await pinataService.uploadImage(pngBuffer, `SBNYv1-${editionNumber}`)

        if (!pinataResponse.success) {
            return {success: false, message: "Error when uploading"}
        }

        const nftMetadata = metadataService.getMetadataRequest(requestParams, pinataResponse.payload.url)


        voucherService.invalidateVoucher(theVoucher)

        return {success: true, message: "ok"}

    }

}