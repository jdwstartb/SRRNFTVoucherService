import {MetadataService} from "../metadata-service"

describe('MetadataService', ()=>{
    let service

    beforeEach(()=>{
        const editionServiceMock = {getEdition: jest.fn(), getEditionTotal:jest.fn()}
        service = new MetadataService(editionServiceMock)
    })
    it("returns desired metadata", ()=>{
        const file = service.getMetadataRequest({}, "https://www.google.com/url")
        expect (JSON.stringify(file)).toMatch(/https:\/\/www.google.com\/url/)
    })
})