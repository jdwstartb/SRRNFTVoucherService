import {isTest} from "../util";
import FormData from "form-data";
import axios from "axios";

export class SrrApiService {

    async issueAndTransferSRR(metadata): Promise<{ success: boolean }> {
        // call API with axios

        console.log(JSON.stringify(metadata))

        if (isTest()) {
            console.log("return success response from startrail mock without issue as environment is test")
            return {success: true}
        }
        const data = new FormData();
        data.append('file', metadata);
        data.append('pinataOptions', '{"cidVersion": 1}');
        data.append('pinataMetadata', `{"name": "${name}.png", "keyvalues": {"company": "Pinata"}}`);

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            headers: {
                'Authorization': `Bearer PINATA ${process.env.SRR_PINATA_JWT}`,
                ...data.getHeaders()
            },
            data: data
        };

        const res = await axios(config);

        console.log(res.data);
        if (res.data) {
            return {success: true}
        }
        throw new Error("unimplemented")
    }
}