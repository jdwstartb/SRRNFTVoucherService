import low from 'lowdb';

import {IssueWebhookBody} from "../types/StartrailAPITypes";

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(process.env.SRR_MINTER_DB_FILE || ".data/db-test.json");
const db = low(adapter);

// default user list
db.defaults({
    galleryEntries: []
}).write();


export class GalleryService {
    async addIssuedSRRByWebhookV1(issuedWebhookV1: IssueWebhookBody): Promise<{ success: boolean }> {
        if (issuedWebhookV1.type !== "issueComplete") {
            return {success: false}
        }


        const newEntries: GalleryEntry[] = []
        issuedWebhookV1.data.forEach(entry => {

            newEntries.push({
                viewerUrl: entry.metadata.external_url,
                imageUrl: entry.metadata.thumbnailURL,
                srrId: entry.srrId,
                title: entry.metadata.title.en || ""
            })
        })


        return this.saveNewEntries(newEntries)
    }


    async getGalleryEntries(): Promise<GalleryEntry[]> {

        let galleryEntries: GalleryEntry[] = [];
        let galleryEntities = await this.getAllEntries()
        galleryEntities.forEach(function (entry) {
            galleryEntries.push({
                ...entry
            });
        });


        return galleryEntries.sort(sortByTitle)
    }


    async getAllEntries(): Promise<GalleryEntry[]> {
        return db.get('galleryEntries').value()
    }

    async saveNewEntries(newEntries): Promise<{ success: boolean }> {
        db.get('galleryEntries')
            .push(...newEntries)
            .write()
        return {success: true}
    }


    resetGalleryEntries() {
        db.set('galleryEntries', []).write()
    }
}

export interface GalleryEntry {
    viewerUrl: string
    imageUrl: string
    srrId: string
    title: string
}


function sortByTitle(a: GalleryEntry, b: GalleryEntry): number {
    const aEditionNumber = getEditionNumber(a.title)
    const bEditionNumber = getEditionNumber(b.title)


    return aEditionNumber < bEditionNumber ? -1 : 1

}

function getEditionNumber(title: string): number {
    const editionTag = title.match(/#.*\//)
    if (editionTag) {
        const editionNum = editionTag[0].match(/([0-9]){1,2}/g)
        if (editionNum) {
            const editionAsNumber: number = +editionNum[0]
            return editionAsNumber
        }
    }
    return 0
}