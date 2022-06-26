import {INode, parse, stringify} from 'svgson'

export class SvgFeatureFragmentsBuilderService {

    async getFeatureFragmentsFromSVGString(input: string): Promise<FeatureDefinition[]> {
        const resultingFragments: FeatureDefinition[] = []
        const svgson = await parse(input)

        let orderNumber = 0
        svgson.children.forEach(child => {
            if (child.name == "g") {
                const characteristics = this.getCharacteristics(child)

                resultingFragments.push({
                    featureName: `${this.getInkscapeName(child)}`,
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
            console.log(characteristic)
            characteristics.push({
                name: `${this.getInkscapeName(featureLayer)}-${this.getInkscapeName(characteristic)}`,

                content: stringify(this.cleanupSodipodi(characteristic))
            })
        })
        return characteristics
    }

    getInkscapeName(element): string {
        return element.attributes['inkscape:label']
    }

    cleanupSodipodi(node: INode): INode {
        const newNode: INode = {name: node.name, type: node.type, value: node.value, children: [], attributes: {}}
        return newNode
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

