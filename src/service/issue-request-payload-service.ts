import originalTemplate from "../data/template.json"
import {EditionService} from "./edition-service"
import {isNotProd} from "../util";
import {randomInt} from "crypto";
import {IssueRequestRoot} from "../types/StartrailAPITypes";
import {CustomParams} from "../custom_content/custom-params";

const templateRoot: IssueRequestRoot = originalTemplate

export class IssueRequestPayloadService {


    editionService: EditionService

    constructor(editionService) {
        this.editionService = editionService
    }

    getIssueSRRRequestPayload(requestBody: CustomParams, imgUrl): IssueRequestRoot {

        const payloadEntry = templateRoot.payload[0]

        const editionNumber = this.editionService.getEdition(requestBody.voucher)
        const total = this.editionService.getEditionTotal()

        let marker = ""
        if (isNotProd()) {
            marker = `-TEST-${requestBody.eoa.slice(0, 5)}-${randomInt(0, 10000)}`
        }

        const placementText = ''

        const theData = {
            ...templateRoot,
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
                                        en: `${requestBody.customText}, my Startbunny (Summer '22 Edition)`,
                                        ja: `${requestBody.customText}, my Startbunny (Summer '22 Edition)`
                                    },
                                note: {
                                    en: `NFT Buy & Share Event #2 \n
                                    ${placementText}\n  background color: ${this.getFeatureText(requestBody.background)}\n main hide color: ${this.getFeatureText(requestBody.bodyMainColor)}\n spot color: ${this.getFeatureText(requestBody.bodyOffColor)}\n spot pattern: ${this.getFeatureText(requestBody.spotPattern)}\n ear shape: ${this.getFeatureText(requestBody.earShape)}\n prop: ${this.getFeatureText(requestBody.props)}`,
                                    ja: ``
                                },
                                image: imgUrl,
                                thumbnailURL: imgUrl
                            }
                    }
                ]
        }
        return theData
    }

    getFeatureText(unformatted: string): string {
        return unformatted.replace(/^.*-/, "")
    }

}