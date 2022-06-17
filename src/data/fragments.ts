const hairColor = {
    "brown": {color:"#00ff00ff", highlight:"#00000000"},
    "white": {color:"#ffffffff", highlight:"#00000000"}
}

export const fragments = {
    background: {
        "blue": ""
    },
    bodyMainColor:hairColor,
    bodyOffColor:hairColor,
    bodyPattern: {
        get(pattern:string,mainColor:string,offColor:string): string {
            return this[pattern].replace("\$mainColor",hairColor[mainColor].color).replace("\$offColor", hairColor[offColor].color).replace("\$highlight", hairColor[mainColor].highlight)
        },
        one: "<somethign>$mainColor</somethign>$highlight<anotherthing>$offColor</anotherthing>"
    },
    "hair": {
        "unicorn": "<something></something>",
        "iro": "<something></something>",
        "bald": "<something></something>",
        "bangs": "<something></something>",
        "kopftuch": "<something></something>"
    },
    "accessoir": {
        "sunglasses": "<something></something>",
        "glasses": "<something></something>",
        "eyepatch": "<something></something>"
    },
    "eyes": {
        "regular": "<something></something>",
        "red": "<something></something>",
        "blind": "<something></something>",
        "buttons": "<something></something>",
        "cute": "<something></something>"
    }
}