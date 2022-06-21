export class IssuePayload {

    srrId: string
    externalId: string
    metadata: StartrailMetadataV2
}

export class IssueWebhookBody {
    data: IssuePayload[]
}

export class StartrailMetadataV2 {
    "$schema": string = "https://api.startrail.io/api/v1/schema/registry-record-metadata.v2.0.schema.json"
    "$schemaIntegrity": string = "sha256-f63238ce3b8c4f8a99fb453d716d5451f75508c2e403a58af0412014187e7a61"
    title: StartrailMultilang
    size: StartrailArtworkSize
    medium: StartrailMultilang
    edition: StartrailEdition
    note: StartrailMultilang
    thumbnailURL: string
    yearOfCreation: StartrailMultilang
    isDigital: boolean
    digitalDataHash: string
    name: string
    description: string
    image: string
    external_url: string
}

interface StartrailMultilang {
    en: string
    ja: string
}

interface StartrailArtworkSize {
    width: number
    height: number
    unit: string

}

interface StartrailEdition {
    uniqueness: string
    proofType: string
    number: number
    totalNumber: number

}


