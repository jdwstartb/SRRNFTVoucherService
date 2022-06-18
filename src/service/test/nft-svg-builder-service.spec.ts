import {NFTSVGBuilderService} from "../nft-svg-builder-service";
import {MintRequestParams} from "../../mint-request-params";


describe("NFTSVGBuilderService", () => {
    const nftSVGBuilderService = new NFTSVGBuilderService()

    it("builds a basic svg", async () => {
        const svgData = await nftSVGBuilderService.buildSVGString({eyes: "buttons"} as MintRequestParams)

        expect(svgData).toMatch(/^<svg.*xmlns="http:\/\/www.w3.org\/2000\/svg".*>.*<\/svg>$/)
    })
})