import {MintRequestParams} from "../mint-request-params";

export class CustomParams extends MintRequestParams {
    background!: string
    ears: string = "long"
    prop: string = ""
    bodyMainColor!: string
    bodyOffColor!: string
    bodyPattern!: string
}