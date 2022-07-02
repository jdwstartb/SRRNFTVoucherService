import {CustomParams} from "./custom-params";
import {fragments} from "./fragments";
import {hairColor} from "./colors";
import {isNotProd} from "../util";

/**
 * Use this class to define your own construction of the image SVG data
 */
export class SvgContentStringFactory {
    currentParams: CustomParams

    build(params: CustomParams): string {
        this.currentParams = params

        const backgroundFragment = fragments.background[params.background]


        const bodyFragment = fragments.bodyMainColor[params.bodyMainColor]

        const earFragment = this.adaptSkinColor(fragments.earShape[params.earShape])


        const bodyPattern = this.adaptSkinColor(fragments.spotPattern[params.spotPattern])

        const snoutFragment = this.adaptSkinColor(fragments.misc["misc-snout"])

        const mouthNoseFragment = fragments.misc["misc-mouthNose"]

        const eyesFragment = fragments.misc["misc-eyes"]

        const propFragment = fragments.props[params.props]

        const watermarkOrNothing = this.getWatermarkFragmentIfTest(params)

        return `${backgroundFragment}${earFragment}${bodyFragment}${bodyPattern}${snoutFragment}${mouthNoseFragment}${eyesFragment}${propFragment}${watermarkOrNothing}`
    }

    adaptSkinColor(fragment: string): string {
        const mainColor = this.currentParams.bodyMainColor
        const additionalColor = this.currentParams.bodyOffColor
        return fragment.replace(/@mainColor/g, hairColor[mainColor].color).replace(/@offColor/g, hairColor[additionalColor].color).replace(/@highlight/g, hairColor[mainColor].highlight)
    }

    getWatermarkFragmentIfTest(params: CustomParams): string {
        if (isNotProd()) {
            const paramsAsString = JSON.stringify(params)
            return fragments.testWatermark.base.replace(/@params/g, paramsAsString)
        }
        return ``
    }

}