import {NFTSVGBuilderService} from "../nft-svg-builder-service";
import {getValidCustomParams} from "../../custom_content/test/custom-param-factory";


describe("NFTSVGBuilderService", () => {
    const nftSVGBuilderService = new NFTSVGBuilderService()

    it("builds a basic svg", async () => {
        const svgData = await nftSVGBuilderService.buildSVGString(getValidCustomParams().params)

        expect(svgData).toMatch(/^<svg.*xmlns="http:\/\/www.w3.org\/2000\/svg".*>.*<\/svg>$/)
    })
})