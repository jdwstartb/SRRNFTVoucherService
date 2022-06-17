import  svgToImg from "svg-to-img"

export class PNGFromSvgGenerator {


    async transform(svg)
    {
        const image = await svgToImg.from(svg).toPng({
            encoding: "base64"
        })
        return image
    }

}