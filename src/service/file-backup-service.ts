import {promises as fsPromises} from "fs";

export class FileBackupService {
    async writePngToBackupLocation(content, name, cid): Promise<string> {
        const path = `./.data/images/${name}_${cid}.png`
        return this.writeFile(path, content, "base64")
    }

    async ensurePathExists(path): Promise<void> {
        await fsPromises.mkdir(path, {recursive: true})
        return
    }

    async writeFile(path, content, encoding): Promise<string> {
        const parts = path.split("/")
        parts.pop()
        const folders = parts.join("/")
        await this.ensurePathExists(folders)

        await fsPromises.writeFile(path, content, encoding)
        return path
    }

    async getFileContent(path): Promise<string> {
        return ""
    }

    async writeOptionsCSSToBuildLocation(content): Promise<string> {
        const path = `./custom_data_build/option-css.css`
        return this.writeFile(path, content, "utf-8")
    }
}