export class GalleryService {
    async addIssuedSRRByWebhookV1(issuedWebhookV1): Promise<{ success: boolean }> {
        return {success: true}
    }

    async getGalleryEntries(): Promise<[{
        viewerUrl: string
        imageUrl: string
        srrId: string
    }]> {
        return [{
            viewerUrl: "string",
            imageUrl: "string",
            srrId: "string"
        }]
    }
}

class IssuePayload {

    srrId: string
    externalId: string
    metadata: {
        "title": {
            "en": string
        },
        "edition": {
            "number": 1,
        },
        "thumbnailURL": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",

    }


}

