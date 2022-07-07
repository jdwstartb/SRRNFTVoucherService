import {StartrailMetadataV2} from "./srr-metadata.types";

export class IssueWebhookPayload {
    srrId: string
    externalId: string
    metadata: StartrailMetadataV2
}

export class IssueWebhookBody {
    "type": string
    "version": number
    data: IssueWebhookPayload[]
}

export interface IssueRequestPayload {
    to: string;
    externalId: string;
    metadata: StartrailMetadataV2;
    lockExternalTransfer: boolean;
    isPrimaryIssuer: boolean;
    artistAddress: string;
}

export interface IssueRequestRoot {
    payload: IssueRequestPayload[];
}