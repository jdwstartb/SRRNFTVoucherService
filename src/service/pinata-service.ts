import {sha256} from 'multiformats/hashes/sha2'
import {CID} from "multiformats";
import * as json from 'multiformats/codecs/json'
import {base32} from "multiformats/bases/base32"

import axios from 'axios'
import FormData from 'form-data'
import {FileBackupService} from "./file-backup-service";
import {isTest} from "../util";

const fileBackupService = new FileBackupService()


export class PinataService {
    async uploadImage(imageData, name): Promise<{ success: boolean, message: string, payload: { url: string } }> {
        const cid = await this.calculateCID(imageData)

        const fileSaved = this.backupFile(imageData, cid, name)

        if (!fileSaved) {
            return {success: false, message: "file Not uploaded", payload: {url: `https://todo.todo.todo/todo/${cid}`}}
        }

        const uploadResponse = await this.uploadFile(imageData, cid, name)

        if (uploadResponse) {
            return {success: true, message: "", payload: {url: `https://todo.todo.todo/todo/${cid}`}}
        }
        return {success: false, message: "failed writing file to pinata", payload: {url: ""}}
    }

    async calculateCID(imageData): Promise<string> {


        const sameHash = await sha256.digest(Buffer.from(imageData, "base64"))


        const cid = CID.create(1, json.code, sameHash)


        return cid.toString(base32.encoder)
    }

    async backupFile(imageData, cid, name): Promise<boolean> {
        const returnPromise = fileBackupService.writePngToBackupLocation(imageData, name, cid)

        const resultValue = await returnPromise

        if (resultValue !== "done") {
            console.log("return with error when saving file")
            return false
        }

        return true

    }


    async uploadFile(imageData, cid, name): Promise<boolean> {
        if (isTest()) {
            console.log("return without upload to Pinata in current environment in test")
            return true
        }
        const data = new FormData();
        data.append('file', imageData);
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
            return true
        }
        throw new Error("unimplemented")
    }
}
