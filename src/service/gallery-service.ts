export class GalleryService {
    async addIssuedSRRByWebhookV1(issuedWebhookV1): Promise<{ success: boolean }> {
        return {success: true}
    }

    async getGalleryEntries(): Promise<[{
        viewerUrl: string
        imageUrl: string
        tokenId: string
    }]> {
        return [{
            viewerUrl: "string",
            imageUrl: "string",
            tokenId: "string"
        }]
    }

}