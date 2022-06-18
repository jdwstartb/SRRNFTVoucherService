import {CustomParams} from "./custom-params";
import {fragments} from "./fragments";
import {hairColor} from "./colors";

/**
 * Use this class to define your own construction of the image SVG data
 */
export class SvgContentStringFactory {
    currentParams: CustomParams

    build(params: CustomParams): string {
        this.currentParams = params

        const backgroundFragment = fragments.background.get(params.background)

        const feetAndTailFragment = this.adaptSkinColor(fragments.feetAndTail.base)

        const bodyFragment = this.adaptSkinColor(fragments.bodyAndBelly.base)

        const earFragment = this.adaptSkinColor(fragments.ears[params.ears])

        const headFragment = this.adaptSkinColor(fragments.head.base)

        const handsFragment = this.adaptSkinColor(fragments.hands.base)

        const snoutFragment = this.adaptSkinColor(fragments.snout.base)

        const facialFeatureFragment = ""

        const propFragment = ""

        return `${backgroundFragment}${feetAndTailFragment}${bodyFragment}${earFragment}${headFragment}${handsFragment}${snoutFragment}${facialFeatureFragment}${propFragment}`
    }

    adaptSkinColor(fragment: string): string {
        const mainColor = this.currentParams.bodyMainColor
        const additionalColor = this.currentParams.bodyOffColor
        return fragment.replace(/@mainColor/g, hairColor[mainColor].color).replace(/@offColor/g, hairColor[additionalColor].color).replace(/@highlight/g, hairColor[mainColor].highlight)
    }

}