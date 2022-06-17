import template from "../data/template.json"
import { EditionService } from "./edition-service"

const editionService = new EditionService()


export class MetadataService {
    getMetadataRequest(requestBody, imgUrl): any {

        const payloadEntry = template.payload[0]

        const editionNumber = editionService.getEdition(requestBody.voucher) + 1
        const total = editionService.getEditionTotal()

        const theData = {... template,
            payload:
                [
                    {...payloadEntry,
                        to: requestBody.eoa,
                        externalId: `SBNYv1-${editionNumber}`,
                        metadata:
                            {...payloadEntry.metadata,
                                edition:
                                    {...payloadEntry.metadata.edition,
                                        number: editionNumber,
                                        totalNumber: total
                                    },
                                title:
                                    {en: `Startbunny SRR Season 1 #${editionNumber}/${total}`
                                    },
                                image:imgUrl,
                                thumbnailURL: imgUrl
                            }
                    }
                ]
        }
        return theData
    }
}