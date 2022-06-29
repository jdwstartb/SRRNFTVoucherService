import {FileBackupService} from "../service/file-backup-service";

const fileAccessService = new FileBackupService()

export class FileLoaderService {


    async loadSourceFileContent(pathToFile: string): Promise<string> {
        const contentBuffer = await fileAccessService.getFileContent(pathToFile)
        return contentBuffer.toString("utf8")
    }
}