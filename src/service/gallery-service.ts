import low from 'lowdb';

import {EditionService} from './edition-service'
import {IssueWebhookBody} from "../types/StartrailAPITypes";

const editionService = new EditionService()

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
                viewerUrl: entry.metadata.thumbnailURL,
                imageUrl: entry.metadata.thumbnailURL,
                srrId: entry.srrId,
                title: entry.metadata.title.en
            })
        })

        db.get('galleryEntries')
            .push(...newEntries)
            .write()
        return {success: true}
    }

    async getGalleryEntries(): Promise<GalleryEntry[]> {

        let galleryEntries: GalleryEntry[] = [];
        let galleryEntities = db.get('galleryEntries').value()
        galleryEntities.forEach(function (entry) {
            console.log(entry)
            galleryEntries.push({
                viewerUrl: entry.viewerUrl,
                imageUrl: entry.imageUrl,
                srrId: entry.srrId,
                title: entry.title
            });
        });


        return galleryEntries
    }

    resetGalleryEntries() {
        let vouchersEntries = db.set('galleryEntries', []).write()
    }
}

export interface GalleryEntry {
    viewerUrl: string
    imageUrl: string
    srrId: string
    title: string
}
