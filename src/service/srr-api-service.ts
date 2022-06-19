import {mockDependencies} from "../util";
import axios from "axios";

export class SrrApiService {

    async issueAndTransferSRR(metadata): Promise<{ success: boolean }> {
        // call API with axios

        console.log(JSON.stringify(metadata))

        if (mockDependencies()) {
            console.log("return success response from startrail mock without issue as environment is test")
            return {success: true}
        }


        const config = {
            method: 'post',
            url: 'https://api-cert-qa.startrail.startbahn.jp/api/v1/commerce/srrs',
            headers: {
                'Content-Type': 'application/json',
                "commerce-api-key": process.env.SRR_MINTER_API_KEY || "",
                "issuer-address": process.env.SRR_MINTER_LUW_CONTRACT_ADDRESS || "",
                "super-header": "testing"
            },
        }
        try {
            const res = await axios.post(config.url, metadata, {headers: config.headers})
            console.log(res.data);
            if (res.data) {
                return {success: true}
            }
        } catch (e) {
            console.log(e)
            return {success: false}
        }


        throw new Error("unimplemented")
    }
}