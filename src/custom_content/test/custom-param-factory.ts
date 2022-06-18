import {backGroundColors, hairColor} from "../colors";
import {CustomParams} from "../custom-params";
import {randomInt} from "crypto";

let counter = 0
const factory = {
    getWithDescription: (): { params: CustomParams, contentDescription: string } => {
        counter += 1
        return {
            params: {
                background: getRandomBackgroundColorId(),
                bodyMainColor: getRandomHairColorId(),
                bodyOffColor: getRandomHairColorId(),
                ears: "",
                eoa: "",
                eyes: "",
                glasses: "",
                hair: "",
                bodyPattern: "",
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


export const getValidCustomParams = (): { params: CustomParams, contentDescription: string } => {
    return factory.getWithDescription()
}