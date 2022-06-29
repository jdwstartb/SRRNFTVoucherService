export const mockDependencies = () => !(["prod", "qa"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export const isNotProd = () => !(["prod"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export const getAsSVG = (fragment: string): string => {
    return getAsSVGWithSize(fragment, 1600, 1600)
}

export const getAsPreviewSVG = (fragment: string): string => {
    return getAsSVGWithSize(fragment, 100, 100)
}

const getAsSVGWithSize = (fragment: string, sizeX: number, sizeY: number): string => {
    return `<svg  width=\"${sizeX}\" height=\"${sizeY}\"    viewBox="0 0 1600 1600" fill=\"none\"  xmlns=\"http://www.w3.org/2000/svg\">${fragment}</svg>`
}


export class Logger {
    logName: string

    constructor(logName: string) {
        this.logName = logName
    }

    log(logString: string) {
        console.log(`${Date.now()}: ${this.logName}: ${logString}`)
    }

}
