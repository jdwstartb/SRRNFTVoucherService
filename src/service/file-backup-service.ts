import fs from "fs";


export class FileBackupService {
    async writePngToBackupLocation(content, name, cid): Promise<string> {
        const path = `./.data/images/${name}_${cid}.png`
        const parts = path.split("/")
        parts.pop()
        const folders = parts.join("/")
        await this.ensurePathExists(folders)

        const returnPromise = new Promise<string>((fulfill, reject) => {

            fs.writeFile(path, content, "base64", (error) => {

                if (error) {
                    console.log(error)
                    reject("error")
                }
                fulfill("done")
            })
        })
        return returnPromise
    }

    async ensurePathExists(path): Promise<void> {
        return new Promise<void>((fulfill, reject) => {
            fs.mkdir(path, {recursive: true}, (err) => {

                fulfill()
            });
        })
    }
}