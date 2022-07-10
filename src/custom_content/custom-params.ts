import {MintRequestParams} from "../types/mint-request-params"

export class CustomParams extends MintRequestParams {
    background!: string
    props: string = ""
    bodyMainColor!: string
    bodyOffColor!: string
    spotPattern!: string
    earShape!: string
}