import {MetadataService} from "../metadata-service"

describe('MetadataService', () => {
    let service

    beforeEach(() => {
        const editionServiceMock = {
            getEdition: jest.fn().mockReturnValue(2),
            getEditionTotal: jest.fn().mockReturnValue("12")
        }
        service = new MetadataService(editionServiceMock)
    })
    it("returns  external id and the edition number naming", () => {
        const imgUrl = "https://www.google.com/url"
        const file = service.getMetadataRequest({}, imgUrl)
        expect(file).toMatchObject({
            payload: [{
                externalId: "SBNYv1-2",
                metadata: {title: {en: "Startbunny SRR Season 1 #2/12"}}
            }]
        })
    })

    it("returns the given URLs at the correct position", () => {
        const imgUrl = "https://www.google.com/url"
        const file = service.getMetadataRequest({}, imgUrl)
        expect(JSON.stringify(file)).toMatch(/https:\/\/www.google.com\/url/)
        expect(file).toMatchObject({payload: [{metadata: {thumbnailURL: imgUrl, image: imgUrl}}]})
    })

})