import {sha256} from 'multiformats/hashes/sha2'
import {CID} from "multiformats";
import * as json from 'multiformats/codecs/json'
import {base32} from "multiformats/bases/base32"

import axios from 'axios'
import FormData from 'form-data'
import {FileBackupService} from "./file-backup-service";

const fileBackupService = new FileBackupService()
const isTest = !(["prod"].findIndex((ele) => process.env.SRR_MINTER_ENV === ele) >= 0)

export class PinataService {
    async uploadImage(imageData, name): Promise<{ success: boolean, message: string, payload: { url: string } }> {
        const cid = await this.calculateCID(imageData)

        const uploadResponse = await this.uploadFile(imageData, cid, name)


        return {success: true, message: "", payload: {url: `https://todo.todo.todo/todo/${cid}`}}
    }

    async calculateCID(imageData): Promise<string> {


        const sameHash = await sha256.digest(Buffer.from(imageData, "base64"))


        const cid = CID.create(1, json.code, sameHash)


        return cid.toString(base32.encoder)
    }


    async uploadFile(imageData, cid, name): Promise<boolean> {
        // const path = `./.data/images/${name}_${cid}.png`
        // console.log(path)
        // const returnPromise = new Promise((fulfill, reject) => {
        //     fs.writeFile(path, imageData, "base64", (error) => {
        //
        //         if (error) {
        //             console.log(error)
        //             reject(error)
        //         }
        //         console.log("done")
        //         fulfill("done")
        //     })
        // })

        const returnPromise = fileBackupService.writePngToBackupLocation(imageData, name, cid)

        const resultValue = await returnPromise

        if (resultValue !== "done") {
            console.log("return with error when saving file")
            return false
        }

        if (isTest) {

            console.log("return ok after saving file in test")
            return true
        }
        var data = new FormData();
        data.append('file', imageData);
        data.append('pinataOptions', '{"cidVersion": 1}');
        data.append('pinataMetadata', `{"name": "${name}.png", "keyvalues": {"company": "Pinata"}}`);

        var config = {
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
            return true
        }
        throw new Error("unimplemented")
    }
}
