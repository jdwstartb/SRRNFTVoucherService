import {CustomParams} from "./custom-params";
import {fragments} from "./fragments";
import {hairColor} from "./colors";

/**
 * Use this class to define your own construction of the image SVG data
 */
export class SvgContentStringFactory {
    build(params: CustomParams): string {

        const backgroundFragment = fragments.background.get(params.background)

        const feetAndTailFragment = this.adaptSkinColor(fragments.feetAndTail.base, params.bodyMainColor, params.bodyOffColor)

        const bodyFragment = this.adaptSkinColor(fragments.bodyAndBelly.base, params.bodyMainColor, params.bodyOffColor)

        const earFragment = ""

        const headFragment = ""

        const handsFragment = ""

        const facialFeatureFragment = ""

        const propFragment = ""

        return `${backgroundFragment}${feetAndTailFragment}${bodyFragment}${earFragment}${headFragment}${handsFragment}${facialFeatureFragment}${propFragment}`
    }

    adaptSkinColor(fragment: string, mainColor: string, additionalColor: string): string {
        return fragment.replace(/@mainColor/g, hairColor[mainColor].color).replace(/@offColor/g, hairColor[additionalColor].color).replace(/@highlight/g, hairColor[mainColor].highlight)
    }

}