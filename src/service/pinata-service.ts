export class PinataService {
    async uploadImage(imageData):Promise<{success: boolean, message: string, payload:{url:string}}>{
        const cid = this.calculateCID(imageData)

        const uploadResponse = await this.uploadFile(imageData)


        return {success:true, message: "", payload:{url:`https://todo.todo.todo/todo/${cid}`}}
    }

    calculateCID(imageData):string{
        return `Qx123` // todo: add implementation with sha and CID calculation. CID is Base5x encoded SHA-256
    }

    async uploadFile(imageData): Promise<boolean> {
        return true // todo: implement call. add pinata keys to env etc
    }

}
