import { PNGFromSvgGenerator } from './svg-generator-service'
const pngFromSvgGenerator = new PNGFromSvgGenerator()
import { MetadataService } from './metadata-service'

import { VoucherService } from './voucher-service'
const voucherService = new VoucherService()
import {NFTSVGBuilderService } from './nft-svg-builder-service'
import {EditionService} from "./edition-service";
import {PinataService} from "./pinata-service";
const svgBuilderService = new NFTSVGBuilderService()

const editionService = new EditionService()
const metadataService = new MetadataService(editionService)
const pinataService = new PinataService()



export class MintRequestProcessingService {

    async requestMinting(request) {

    }


    async generateFileAndUploadAndMint (request) {
        const theVoucher = request.body.voucher

        const nftImageSource = svgBuilderService.buildSVGString(request.body)

        const url = pinataService.uploadImage(pngFromSvgGenerator.transform(nftImageSource))

        const nftMetadata = metadataService.getMetadataRequest(request.body, url)


        voucherService.invalidateVoucher(theVoucher)

    }

}