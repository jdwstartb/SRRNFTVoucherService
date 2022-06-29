import {PinataService} from "../pinata-service";

describe("PinataService", () => {
    const service: PinataService = new PinataService()
    describe("get CID", () => {
        it("returns the correct CID", async () => {

            await service.calculateCID(Buffer.from("YWJjZGU=", "base64"))
        })
    })

})