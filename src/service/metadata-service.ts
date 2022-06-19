import template from "../data/template.json"
import {EditionService} from "./edition-service"
import {isNotProd} from "../util";
import {randomInt} from "crypto";


export class MetadataService {

    editionService: EditionService

    constructor(editionService) {
        this.editionService = editionService
    }

    getMetadataRequest(requestBody, imgUrl): any {

        const payloadEntry = template.payload[0]

        const editionNumber = this.editionService.getEdition(requestBody.voucher)
        const total = this.editionService.getEditionTotal()

        let marker = ""
        if (isNotProd()) {
            marker = `-TEST-${requestBody.eoa.slice(0, 5)}-${randomInt(0, 10000)}`
        }

        const theData = {
            ...template,
            payload:
                [
                    {
                        ...payloadEntry,
                        to: requestBody.eoa,
                        externalId: `SBNYv1-${editionNumber}${marker}`,
                        metadata:
                            {
                                ...payloadEntry.metadata,
                                edition:
                                    {
                                        ...payloadEntry.metadata.edition,
                                        number: editionNumber,
                                        totalNumber: total
                                    },
                                title:
                                    {
                                        en: `Startbunny SRR Season 1 #${editionNumber}/${total}`
                                    },
                                image: imgUrl,
                                thumbnailURL: imgUrl
                            }
                    }
                ]
        }
        return theData
    }
}