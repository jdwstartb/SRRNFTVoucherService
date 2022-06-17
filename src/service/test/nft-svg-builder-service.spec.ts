import {NFTSVGBuilderService} from "../nft-svg-builder-service";



describe("NFTSVGBuilderService", ()=>{
    const nftSVGBuilderService = new NFTSVGBuilderService()

    it("does somethign", ()=>{
        expect(true).toEqual(false)
        nftSVGBuilderService.buildSVGString({})
    })
})