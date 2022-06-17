import {NFTSVGBuilderService} from "../nft-svg-builder-service";



describe("NFTSVGBuilderService", ()=>{
    const nftSVGBuilderService = new NFTSVGBuilderService()

    it("builds a basic svg", async()=>{
        const svgData = await nftSVGBuilderService.buildSVGString({eyes:"buttons"})

        expect(svgData).toMatch(/^<\?xml version="1.0" encoding="UTF-8" standalone="no"\?><svg xmlns='http:\/\/www.w3.org\/2000\/svg'>.*<\/svg>$/)
    })
})