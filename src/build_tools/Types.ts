export class Characteristic {
    name: string
    content: string
    inputHtml?: string
    css?: string
    labelHtml?: string
    exampleFileLocation?: string
    previewContent?: string
}


export class FeatureDefinition {
    featureName: string
    orderNumber: number
    characteristics: Characteristic[]
    htmlFormFeaturePrefix?: string
    htmlFormFeaturePostfix?: string
}
