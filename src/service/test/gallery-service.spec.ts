import {GalleryService} from "../gallery-service";


describe("GalleryService", () => {
    let service: GalleryService

    beforeAll(() => {
        service = new GalleryService()
        service.resetGalleryEntries()
    })


    describe('module integration', () => {
        it('saves entries and lets them be retrieved later', async () => {
            const issueWebhookV1 = {
                data: [{
                    srrId: "abc",
                    metadata: {
                        imageUrl: "https://someurl.com",
                        external_url: "https://someurl.com",
                        thumbnailURL: "https://someurl.com"
                    }
                }]
            }

            await service.addIssuedSRRByWebhookV1(issueWebhookV1 as any)

            const getResult = await service.getGalleryEntries()

            expect(getResult).toContainEqual({
                srrId: issueWebhookV1.data[0].srrId,
                imageUrl: issueWebhookV1.data[0].metadata.imageUrl,
                viewerUrl: issueWebhookV1.data[0].metadata.external_url
            })

        })
    })

    describe("issueWebhookV1", () => {
        it("accepts a valid issue webhook v1", async () => {
            expect(await service.addIssuedSRRByWebhookV1({
                data: [{
                    srrId: "abc",
                    metadata: {
                        thumbnailURL: "https://someurl.com",
                        external_url: "https://someurl2.com",
                        imageUrl: "https://someurl.com"
                    }
                }]
            } as any)).toMatchObject({success: true})
        })
    })

    describe("getGalleryEntries", () => {
        it("returns the gallery entries for the frontend", async () => {
            const result = await service.getGalleryEntries()
            result.forEach(entry => {
                expect(entry.viewerUrl).toBeTruthy()
                expect(entry.imageUrl).toBeTruthy()
                expect(entry.srrId).toBeTruthy()
            })

        })
    })
})