export const isTest = () => !(["prod"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export const getAsSVG = (fragment: string): string => {
    return `<svg  width=\"1600\" height=\"1600\"    viewBox="0 0 423.33333 423.33333" fill=\"none\"  xmlns=\"http://www.w3.org/2000/svg\">${fragment}</svg>`
}