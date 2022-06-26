import {parse} from 'svgson'

export class SvgFeatureFragmentsBuilderService {

    async getFeatureFragmentsFromSVGString(input: string): Promise<FeatureDefinition[]> {
        const resultingFragments: FeatureDefinition[] = []
        const svgson = await parse(input)

        let orderNumber = 0
        svgson.children.forEach(child => {
            if (child.name == "g") {
                const characteristics = this.getCharacteristics(child)

                resultingFragments.push({
                    featureName: child.attributes['inkscape:label'],
                    characteristics,
                    orderNumber
                })
            }
        })
        return resultingFragments
    }

    getCharacteristics(featureLayer): Characteristic[] {
        const characteristics: Characteristic[] = []
        featureLayer.children.forEach(characteristic => {
            characteristics.push({name: "props-glasses", content: ""})
        })
        return characteristics
    }
}

class Characteristic {
    name: string
    content: string
}


class FeatureDefinition {
    featureName: string
    orderNumber: number
    characteristics: Characteristic[]
}


function updatePathStyleById(containerElem, pathId, oldStyle, newStyle) {
    // pathElem = containerElem.children.find(elem => elem.attributes.id == pathId);
    // pathElem.attributes.style = pathElem.attributes.style.replace(oldStyle,
    //     newStyle);
}

