import {sha256} from 'multiformats/hashes/sha2'
import {CID} from "multiformats";
import * as json from 'multiformats/codecs/json'
import {base32} from "multiformats/bases/base32"

import axios from 'axios'
import FormData from 'form-data'
import {FileBackupService} from "./file-backup-service";
import {mockDependencies} from "../util";
import fs from "fs";

const fileBackupService = new FileBackupService()


export class PinataService {
    async uploadImage(imageData, name): Promise<{ success: boolean, message: string, payload: { url: string } }> {
        const cid = await this.calculateCID(imageData)

        const savedFilePath = this.backupFile(imageData, cid, name)

        if (!savedFilePath) {
            return {success: false, message: "file Not uploaded", payload: {url: `https://todo.todo.todo/todo/${cid}`}}
        }

        const uploadResponse = await this.uploadFile(imageData, cid, name, savedFilePath)

        if (uploadResponse) {
            return {success: true, message: "", payload: {url: `https://gateway.pinata.cloud/ipfs/${uploadResponse}`}}
        }
        return {success: false, message: "failed writing file to pinata", payload: {url: ""}}
    }

    async calculateCID(imageData): Promise<string> {


        const sameHash = await sha256.digest(Buffer.from(imageData, "base64"))


        const cid = CID.create(1, json.code, sameHash)


        return cid.toString(base32.encoder)
    }

    async backupFile(imageData, cid, name): Promise<string | false> {
        const returnPromise = fileBackupService.writePngToBackupLocation(imageData, name, cid)

        try {
            const resultValue = await returnPromise
            return resultValue
        } catch (err) {

            console.log(err)
            return false
        }

    }


    async uploadFile(imageData, cid, name, pathPromise): Promise<string | boolean> {
        if (mockDependencies()) {
            console.log("return without upload to Pinata in current environment in test")
            return true
        }
        const data = new FormData();
        const path = await pathPromise
        console.log(path)
        data.append('file', fs.createReadStream(path));
        data.append('pinataOptions', '{"cidVersion": 1}');
        data.append('pinataMetadata', `{"name": "${name}.png", "keyvalues": {"company": "Pinata"}}`);

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            headers: {
                'Authorization': `Bearer ${process.env.SRR_PINATA_JWT}`,
                ...data.getHeaders()
            },
            data: data
        };

        console.log(`${Date.now()}: requesting pinata ...`)

        try {
            const res = await axios(config);
            console.log(`${Date.now()}: requesting pinata done`)
            console.log(res.data);
            if (res.data) {
                return res.data.IpfsHash
            }
        } catch (err) {
            console.log(err)
            return false
        }
        throw new Error("unimplemented")
    }
}
