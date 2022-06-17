import { SvgGenerator } from './svg-generator-service'
const svgGenerator = new SvgGenerator()
import { MetadataService } from './metadata-service'

import { VoucherService } from './voucher-service'
const voucherService = new VoucherService()
import {NFTSVGBuilderService } from './nft-svg-builder-service'
import {EditionService} from "./edition-service";
const svgBuilderService = new NFTSVGBuilderService()

const editionService = new EditionService()
const metadataService = new MetadataService(editionService)
export class MintRequestProcessingService {

    async requestMinting(request) {

    }


    async generateFileAndUploadAndMint (request) {
        const theVoucher = request.body.voucher

        const nftImageSource = svgBuilderService.buildSVGString(request.body)
        svgGenerator.transform(nftImageSource)

        const url = "https://todo.todo.todo/todo"

        const nftMetadata = metadataService.getMetadataRequest(request.body, url)
        console.log(nftMetadata)

        voucherService.invalidateVoucher(theVoucher)

    }

}