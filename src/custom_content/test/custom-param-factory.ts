import {backGroundColors, hairColor} from "../colors";
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
                bodyMainColor: getRandomHairColorId(),
                bodyOffColor: getRandomHairColorId(),
                ears: getRandomEars(),
                eoa: "",
                eyes: "",
                glasses: "",
                hair: "",
                bodyPattern: getRandomBodyPatternId(),
                mouth: "",
                voucher: "",
            }, contentDescription: `factoryBunny${counter}`
        }
    }
}


const getRandomBackgroundColorId = (): string => {
    const keys = Object.keys(backGroundColors)
    return keys[randomInt(0, keys.length)]
}


const getRandomHairColorId = (): string => {
    const keys = Object.keys(hairColor)
    return hairColor[keys[randomInt(0, keys.length)]].name
}

const getRandomEars = (): string => {
    const keys = Object.keys(fragments.ears)
    return keys[randomInt(0, keys.length)]
}

const getRandomBodyPatternId = (): string => {
    const keys = Object.keys(fragments.bodyPattern)
    return keys[randomInt(0, keys.length)]
}

export const getValidCustomParams = (): { params: CustomParams, contentDescription: string } => {
    return factory.getWithDescription()
}