import {FileLoaderService} from "../file-loader.service";

describe('FileLoaderService', function () {
    const service: FileLoaderService = new FileLoaderService()

    it('loads the source file as utf8', async () => {
        const content = await service.loadSourceFileContent('./source-images/automation.svg')
        console.log(content)
    })
});