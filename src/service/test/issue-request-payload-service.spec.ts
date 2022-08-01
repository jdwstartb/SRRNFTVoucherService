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

    describe("getPlacementTextEn", () => {
        it('returns place 1', () => {
            expect(service.getPlacementTextEn(1)).toEqual("1st Place")
        })
        it('returns place 2', () => {
            expect(service.getPlacementTextEn(2)).toEqual("2nd Place")
        })
        it('returns place 3', () => {
            expect(service.getPlacementTextEn(3)).toEqual("3rd Place")
        })
        it('returns other places', () => {
            expect(service.getPlacementTextEn(4)).toEqual("")
        })
    })

    describe("getPlacementTextJa", () => {
        it('returns place 1', () => {
            expect(service.getPlacementTextJa(1)).toEqual("順位：第一位")
        })
        it('returns place 2', () => {
            expect(service.getPlacementTextJa(2)).toEqual("順位：第二位")
        })
        it('returns place 3', () => {
            expect(service.getPlacementTextJa(3)).toEqual("順位：第三位")
        })
        it('returns other places', () => {
            expect(service.getPlacementTextJa(4)).toEqual("")
        })
    })
})