import {MetadataService} from "../metadata-service";

const editionServiceMock = {getEdition: jest.fn(), getEditionTotal:jest.fn()}
const service = new MetadataService(editionServiceMock)

describe('MetadataService', ()=>{
    it("returns desired metadata", ()=>{
        const file = service.getMetadataRequest({}, "https://www.google.com/url")
        expect (JSON.stringify(file)).toMatch(/https:\/\/www.google.com\/url/)
    })
})