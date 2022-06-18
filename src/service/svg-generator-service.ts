import {from} from "svg-to-img"

export class PNGFromSvgGenerator {


    async transform(svg) {
        console.log(svg)
        const image = await from(svg).toPng({
            encoding: "base64"
        })
        return image
    }

}