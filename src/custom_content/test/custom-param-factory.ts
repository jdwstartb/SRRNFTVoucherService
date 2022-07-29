import {hairColor} from "../colors";
import {CustomParams} from "../custom-params";
import {randomInt} from "crypto";
import {fragments} from "../fragments";

let counter = 0
const factory = {
    getWithDescription: (): { params: CustomParams, contentDescription: string } => {
        counter += 1
        return {
            params: {
                background: getRandomBackgroundColorId(),
                bodyMainColor: getRandomMainHairColorId(),
                bodyOffColor: getRandomOffColorId(),
                earShape: getRandomEars(),
                eoa: "0x887C0d2340d2Fa144289C2E2BF835556f5c6C4E0",
                props: getRandomProp(),
                spotPattern: getRandomBodyPatternId(),
                voucher: "",
                customText: "a Text"
            }, contentDescription: `factoryBunny${counter}`
        }
    }
}

const getRandomProp = (): string => {
    const keys = Object.keys(fragments.props)
    return keys[randomInt(0, keys.length)]
}

const getRandomBackgroundColorId = (): string => {
    const keys = Object.keys(fragments.background)
    return keys[randomInt(0, keys.length)]
}

const getRandomMainHairColorId = (): string => {
    const keys = Object.keys(hairColor)

    return hairColor[keys[(randomInt(0, keys.length / 2) * 2 + 1)]].name
}

const getRandomOffColorId = (): string => {
    const keys = Object.keys(hairColor)

    return hairColor[keys[(randomInt(0, 12 / 2) * 2 + 0)]].name
}

const getRandomEars = (): string => {
    const keys = Object.keys(fragments.earShape)
    return keys[randomInt(0, keys.length)]
}

const getRandomBodyPatternId = (): string => {
    const keys = Object.keys(fragments.spotPattern)
    return keys[randomInt(0, keys.length)]
}

export const getValidCustomParams = (): { params: CustomParams, contentDescription: string } => {
    return factory.getWithDescription()
}