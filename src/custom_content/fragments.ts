import {backGroundColors} from "./colors";

export const fragments = {
    background: {
        get: function (color: string): string {
            return `<rect style="opacity:1;fill:${this[color]};fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" id="rect815" height="1600px" x="0" y="0" width="1600px" />`
        },
        ...backGroundColors

    },
    bodyPattern: {
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
    },
    ears: {
        tag: "",
        short: "",
        twoBent: "",
        oneBent: "",
        long: ""
    },
    feetAndTail: {
        base: `<g id="feetAndTailLayer" transform="translate(0,126.33332)" style="display:inline"><g style="display:inline" id="feetAndTailLayer2" transform="translate(-422.2774,8.49401)"><ellipse   style="opacity:1;fill:@mainColor;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:3.96875;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"   id="path956"   cx="685.24561"   cy="175.72989"   rx="11.717261"   ry="11.528275" />   <path   style="opacity:1;fill:@mainColor;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:5.29166651;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"   d="m 695.57052,225.58384 c 2.92646,5.90394 -7.57646,24.24369 -13.61104,27.23491 -6.03458,2.99122 -5.31566,-10.49883 -8.24212,-16.40277 -2.92646,-5.90394 -0.40682,-13.1149 5.62776,-16.10611 6.03459,-2.99122 13.29894,-0.62998 16.2254,5.27397 z"   id="path817-7-60"/>   <path   style="opacity:1;fill:@mainColor;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:5.29166651;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"   d="m 599.18865,239.04786 c -2.0296,6.26908 -3.04348,19.89871 -9.45128,17.8242 -6.40781,-2.07451 -20.46818,-21.77627 -18.43858,-28.04536 2.0296,-6.26909 13.55462,-6.96078 19.96243,-4.88627 6.40781,2.07452 9.95703,8.83834 7.92743,15.10743 z"   id="path817-7-6-4" /></g></g>`
    },
    bodyAndBelly: {
        base: `<g id="bellyLayerBG" transform="translate(0,126.33331)"> <path style="display:inline;opacity:1;fill:@mainColor;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:5.29166651;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 259.4564,159.93995 c 0,8.15929 24.97824,58.61049 19.27912,67.5987 -15.67663,24.72399 -44.71293,22.13359 -65.60899,22.13359 -19.83879,0 -66.28006,9.22163 -73.29423,-24.33177 -3.66152,-17.51547 20.16078,-52.52643 20.16078,-61.99874 1e-5,-34.11024 25.66742,-57.60433 53.13345,-57.60433 27.46604,0 46.32987,20.09229 46.32987,54.20255 z" id="bellyLayer-path817-3-4" /> <path style="display:inline;opacity:1;fill:@highlight;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:3.24582934;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 240.21687,192.27731 c 0,5.01497 15.29017,36.02393 11.80152,41.54837 -9.5963,15.19616 -27.37058,13.60403 -40.16189,13.60403 -12.14411,0 -40.57267,5.6679 -44.86633,-14.95512 -2.24135,-10.76555 12.34122,-32.28443 12.34122,-38.10643 2e-5,-20.96529 15.71205,-35.4055 32.52511,-35.40551 16.81307,1e-5 28.36037,12.34937 28.36037,33.31466 z" id="bellyLayer-path817-3-4-9" /></g>`
    }


}