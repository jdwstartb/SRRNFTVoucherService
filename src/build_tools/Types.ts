export class Characteristic {
    name: string
    content: string
    inputHtml?: string
    css?: string
    labelHtml?: string
    exampleFileLocation?: string
}


export class FeatureDefinition {
    featureName: string
    orderNumber: number
    characteristics: Characteristic[]
}
