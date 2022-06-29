import {from} from "svg-to-img"

export class PNGFromSvgGenerator {


    async transform(svg) {
        
        const image = await from(svg).toPng({
            encoding: "base64"
        })
        return image
    }

}