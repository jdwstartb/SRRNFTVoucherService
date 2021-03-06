export const colorSchema = {
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
export const hairColor = {
    "brown": {color: colorSchema.darkOrange, highlight: colorSchema.midOrange, name: "brown"},
    "bodyMainColor-brown": {
        color: colorSchema.darkOrange,
        highlight: colorSchema.midOrange,
        name: "bodyMainColor-brown"
    },
    "white": {color: colorSchema.offwhite, highlight: colorSchema.lightestRed, name: "white"},
    "bodyMainColor-white": {
        color: colorSchema.offwhite,
        highlight: colorSchema.lightestRed,
        name: "bodyMainColor-white"
    },
    "black": {color: colorSchema.darkGrey, highlight: colorSchema.midGrey, name: "black"},
    "bodyMainColor-black": {color: colorSchema.darkGrey, highlight: colorSchema.midGrey, name: "bodyMainColor-black"},
    "bright": {color: colorSchema.lightOrange, highlight: colorSchema.lightestOrange, name: "bright"},
    "bodyMainColor-bright": {
        color: colorSchema.lightOrange,
        highlight: colorSchema.lightestOrange,
        name: "bodyMainColor-bright"
    },
    "grey": {color: colorSchema.midGrey, highlight: colorSchema.lighterGrey, name: "grey"},
    "bodyMainColor-grey": {color: colorSchema.midGrey, highlight: colorSchema.lighterGrey, name: "bodyMainColor-grey"},
    "orange": {color: colorSchema.midOrange, highlight: colorSchema.lightOrange, name: "orange"},
    "bodyMainColor-orange": {
        color: colorSchema.midOrange,
        highlight: colorSchema.lightOrange,
        name: "bodyMainColor-orange"
    },
}


export const backGroundColors = (({
                                      midBlue,
                                      darkBlue,
                                      darkOrange,
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
    darkBlue,
    darkOrange,
    deepPurple,
    midviolet,
    skyblue
}))(colorSchema)
