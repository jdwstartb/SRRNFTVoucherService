import {MintRequestParams} from "../mint-request-params";

export class CustomParams extends MintRequestParams {
    background!: string
    ears: string = "long"
    props: string = ""
    bodyMainColor!: string
    bodyOffColor!: string
    spotPattern!: string
    earShape!: string
}