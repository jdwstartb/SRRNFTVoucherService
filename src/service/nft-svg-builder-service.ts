import {MintRequestParams} from "../mint-request-params";

export class NFTSVGBuilderService {


    async buildSVGString(params: MintRequestParams) {
        const content = this.getContent(params)


        return `<svg  width=\"1600\" height=\"1600\" viewBox=\"0 0 1600 1600\" fill=\"none\"  xmlns=\"http://www.w3.org/2000/svg\">${content}</svg>`
    }

    getContent(params) {
        return `<text xml:space="preserve"  style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:10px;line-height:1.25;font-family:'sans-serif';letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:3px"  x="89.535286" y="112.85129"  id="text817">${params.voucher}</text>`
    }

}