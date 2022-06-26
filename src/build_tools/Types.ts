export class Characteristic {
    name: string
    content: string
}


export class FeatureDefinition {
    featureName: string
    orderNumber: number
    characteristics: Characteristic[]
}
