export const mockDependencies = () => !(["prod", "qa"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export const isNotProd = () => !(["prod"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export const getAsSVG = (fragment: string): string => {
    return `<svg  width=\"1600\" height=\"1600\"    viewBox="0 0 423.33333 423.33333" fill=\"none\"  xmlns=\"http://www.w3.org/2000/svg\">${fragment}</svg>`
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
