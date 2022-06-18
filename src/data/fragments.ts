const hairColor = {
    "brown": {color: "#00ff00ff", highlight: "#00000000"},
    "white": {color: "#ffffffff", highlight: "#00000000"},
}
const colorSchema = {
    black: "#000000",
    darkGrey: "#4C4C4C",
    midGrey: "#6B6073",
    lightGrey: "#A4A4A4",
    lighterGrey: "#AAA0B0",
    lightestGrey: "#EFEFEF",
    darkBlue: "#002642",
    midBlue: "#01375D",
    blue: "#11649D",
    skyblue: "#59A8E0",
    lighterBlue: "#B6DBF4",
    lightestBlue: "#D8CFFC",
    deepPurple: "#230D31",
    purple: "#49146B",
    darkViolet: "#583E9D",
    midviolet: "#6E5BBB",
    violet: "#876E97",
    lighterViolet: "#AA9BE7",
    darkTurquoise: "#369685",
    turquoise: "#5BBBAA",
    lightTurquoise: "#B5E8DF",
    darkGreen: "#3F8000",
    lightgreen: "#91BB5B",
    lighterGreen: "#CFE8B0",
    darkRed: "#D73045",
    red: "#F27383",
    lightRed: "#FDC7CE",
    darkOrange: "#BA4A00",
    midOrange: "#E46A18",
    lightOrange: "#FEDCC6",
    lightestOrange: "#FEF8F3",
    lightestRed: "#FEE5E8",
    lightestTeal: "#EDF7FE",
    lightestTurquoise: "#EFFEFC",
    lightestGreen: "#F2FEED",
    lightestViolet: "#F4F3F8",
    lightestPurple: "#F5EFF9",
    offwhite: "#FEFEFE"
}
const backGroundColors = (({
                               midBlue,
                               darkRed,
                               darkGreen,
                               midOrange,
                               darkTurquoise,
                               deepPurple,
                               midviolet,
                               skyblue
                           }) => ({
    midBlue,
    darkRed,
    darkGreen,
    midOrange,
    darkTurquoise,
    deepPurple,
    midviolet,
    skyblue
}))(colorSchema)

export const fragments = {

    getAsSVG: function (fragment: string): string {
        return `<svg  width=\"1600\" height=\"1600\" viewBox=\"0 0 1600 1600\" fill=\"none\"  xmlns=\"http://www.w3.org/2000/svg\">${fragment}</svg>`
    },
    background: {
        get: function (color: string): string {
            return `<rect style="opacity:1;fill:${this[color]};fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="rect815" height="1600px" x="0" y="0" width="1600px" />`
        },
        ...backGroundColors
    },
    bodyMainColor: hairColor,
    bodyOffColor: hairColor,
    bodyPattern: {
        get(pattern: string, mainColor: string, offColor: string): string {
            return this[pattern].replace("\$mainColor", hairColor[mainColor].color).replace("\$offColor", hairColor[offColor].color).replace("\$highlight", hairColor[mainColor].highlight)
        },
        one: "<somethign>$mainColor</somethign>$highlight<anotherthing>$offColor</anotherthing>"
    },
    hair: {
        "unicorn": "<something></something>",
        "iro": "<something></something>",
        "bald": "<something></something>",
        "bangs": "<something></something>",
        "kopftuch": "<something></something>"
    },
    accessoir: {
        "sunglasses": "<something></something>",
        "glasses": "<something></something>",
        "eyepatch": "<something></something>"
    },
    eyes: {
        "regular": "<something></something>",
        "red": "<something></something>",
        "blind": "<something></something>",
        "buttons": "<something></something>",
        "cute": "<something></something>"
    }
}