import  svgToImg from "svg-to-img"

export class SvgGenerator {


    async transform(svg)
    {
        const image = await svgToImg.from(svg).toPng({
            encoding: "base64"
        });

        console.log(image);
    }

}