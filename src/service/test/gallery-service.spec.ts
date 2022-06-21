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
                type: "issueComplete",
                data: [{
                    srrId: "abc",
                    metadata: {
                        imageUrl: "https://someurl.com",
                        external_url: "https://someurl.com",
                        thumbnailURL: "https://someurl.com",
                        title: {en: "a Title"}
                    }
                }]
            }

            await service.addIssuedSRRByWebhookV1(issueWebhookV1 as any)

            const getResult = await service.getGalleryEntries()

            expect(getResult).toContainEqual({
                srrId: issueWebhookV1.data[0].srrId,
                imageUrl: issueWebhookV1.data[0].metadata.imageUrl,
                viewerUrl: issueWebhookV1.data[0].metadata.external_url,
                title: issueWebhookV1.data[0].metadata.title.en
            })

        })

        it('saves multiple entries', async () => {
            const issueWebhookV1 = {
                type: "issueComplete",
                data: [{
                    srrId: "abc",
                    metadata: {
                        imageUrl: "https://someurl.com",
                        external_url: "https://someurl.com",
                        thumbnailURL: "https://someurl.com",
                        title: {en: "a Title"}
                    }
                }, {
                    srrId: "def",
                    metadata: {
                        imageUrl: "https://someurl2.com",
                        external_url: "https://someurl2.com",
                        thumbnailURL: "https://someurl2.com",
                        title: {en: "a Title"}
                    }
                }]
            }

            await service.addIssuedSRRByWebhookV1(issueWebhookV1 as any)

            const getResult = await service.getGalleryEntries()

            expect(getResult).toContainEqual({
                srrId: issueWebhookV1.data[0].srrId,
                imageUrl: issueWebhookV1.data[0].metadata.imageUrl,
                viewerUrl: issueWebhookV1.data[0].metadata.external_url,
                title: issueWebhookV1.data[0].metadata.title.en
            })

            expect(getResult).toContainEqual({
                srrId: issueWebhookV1.data[1].srrId,
                imageUrl: issueWebhookV1.data[1].metadata.imageUrl,
                viewerUrl: issueWebhookV1.data[1].metadata.external_url,
                title: issueWebhookV1.data[0].metadata.title.en
            })
        })

    })

    describe("issueWebhookV1", () => {
        it("accepts a valid issue webhook v1", async () => {
            expect(await service.addIssuedSRRByWebhookV1({
                "type": "issueComplete",
                data: [{
                    srrId: "abc",
                    metadata: {
                        thumbnailURL: "https://someurl.com",
                        external_url: "https://someurl2.com",
                        imageUrl: "https://someurl.com",
                        title: {en: "a Title"}
                    }
                }]
            } as any)).toMatchObject({success: true})
        })

        it('does not save if the webhook type is not issue', async () => {
            const previousEntries = await service.getGalleryEntries()

            expect(await service.addIssuedSRRByWebhookV1({
                "type": "otherType",
                data: [{
                    srrId: "abc",
                    metadata: {
                        thumbnailURL: "https://someurl.com",
                        external_url: "https://someurl2.com",
                        imageUrl: "https://someurl.com"
                    }
                }]
            } as any)).toMatchObject({success: false})


            expect((await service.getGalleryEntries()).length).toEqual(previousEntries.length)
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