import {INode, parse, stringify} from 'svgson'
import {Characteristic, FeatureDefinition} from "./Types";

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
            const cleanedUp = this.cleanupSodipodiAndAddPathID(characteristic, `${this.getInkscapeName(featureLayer)}-${this.getInkscapeName(characteristic)}`)
            const extractedCharacteristic = {
                name: `${this.getInkscapeName(featureLayer)}-${this.getInkscapeName(characteristic)}`,

                content: stringify(cleanedUp)
            }
            characteristics.push(extractedCharacteristic)

        })

        return characteristics
    }

    getInkscapeName(element): string {
        return element.attributes['inkscape:label']
    }

    cleanupSodipodiAndAddPathID(node: INode, characteristicPath): INode {
        const newNode: INode = {name: node.name, type: node.type, value: node.value, children: [], attributes: {}}

        Object.keys(node.attributes).forEach(attributeKey => {
            if (!attributeKey.match(/(inkscape|sodipodi)/)) {
                newNode.attributes[attributeKey] = node.attributes[attributeKey]
            }
        })
        newNode.attributes["id"] = `${newNode.attributes["id"]}-${characteristicPath}`

        node.children.forEach(childNode => {
            newNode.children.push(this.cleanupSodipodiAndAddPathID(childNode, characteristicPath))
        })
        return newNode
    }

}

