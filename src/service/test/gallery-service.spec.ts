import {GalleryService} from "../gallery-service";


describe("GalleryService", () => {
    let service: GalleryService = new GalleryService()
    describe("issueWebhookV1", () => {
        it("accepts a valid issue webhook v1", async () => {
            expect(await service.addIssuedSRRByWebhookV1({})).toMatchObject({success: true})
        })
    })

    describe("getGalleryEntries", () => {
        it("returns the gallery entries for the frontend", async () => {
            const result = await service.getGalleryEntries()
            result.forEach(entry => {
                expect(entry.viewerUrl).toBeTruthy()
                expect(entry.imageUrl).toBeTruthy()
                expect(entry.tokenId).toBeTruthy()
            })

        })
    })
})