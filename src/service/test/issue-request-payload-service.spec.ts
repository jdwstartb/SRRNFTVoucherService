import {IssueRequestPayloadService} from "../issue-request-payload-service"
import {getValidCustomParams} from "../../custom_content/test/custom-param-factory";

describe('MetadataService', () => {
    let service

    beforeEach(() => {
        const editionServiceMock = {
            getEdition: jest.fn().mockReturnValue(2),
            getEditionTotal: jest.fn().mockReturnValue("12")
        }
        service = new IssueRequestPayloadService(editionServiceMock)
    })
    it("returns  external id and the edition number naming", () => {
        const imgUrl = "https://www.google.com/url"
        const file = service.getIssueSRRRequestPayload(getValidCustomParams().params, imgUrl)
        expect(file).toMatchObject({
            payload: [{
                externalId: /^SBNYv1-2.*$/,
                metadata: {title: {en: /.*, my Startbunny \(Summer '22 Edition\)/}}
            }]
        })
    })

    it("returns the given URLs at the correct position", () => {
        const imgUrl = "https://www.google.com/url"
        const file = service.getIssueSRRRequestPayload(getValidCustomParams().params, imgUrl)
        expect(JSON.stringify(file)).toMatch(/https:\/\/www.google.com\/url/)
        expect(file).toMatchObject({payload: [{metadata: {thumbnailURL: imgUrl, image: imgUrl}}]})
    })

    describe('getFeatureText', () => {
        it('keeps a simple text', () => {
            expect(service.getFeatureText("orange")).toEqual("orange")
        })
        it('removes feature text', () => {
            expect(service.getFeatureText("orange-orange")).toEqual("orange")
        })
    })
})