import {GalleryService} from "../gallery-service";


describe("GalleryService", () => {
    let service: GalleryService = new GalleryService()
    describe("issueWebhookV1", () => {
        it("accepts a valid issue webhook v1", async () => {
            expect(await service.addIssuedSRRByWebhookV1({})).toMatchObject({success: true})
        })
    })
})