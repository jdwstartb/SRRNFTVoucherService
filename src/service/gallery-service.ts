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
        db.get('galleryEntries')
            .push({
                viewerUrl: issuedWebhookV1.data[0].metadata.thumbnailURL,
                imageUrl: issuedWebhookV1.data[0].metadata.thumbnailURL,
                srrId: issuedWebhookV1.data[0].srrId
            })
            .write()
        return {success: true}
    }

    async getGalleryEntries(): Promise<{
        viewerUrl: string
        imageUrl: string
        srrId: string
    }[]> {

        let galleryEntries: {
            viewerUrl: string
            imageUrl: string
            srrId: string
        }[] = [];
        let galleryEntities = db.get('galleryEntries').value()
        galleryEntities.forEach(function (entry) {
            galleryEntries.push({viewerUrl: entry.viewerUrl, imageUrl: entry.imageUrl, srrId: entry.srrId});
        });


        return galleryEntries
    }

    resetGalleryEntries() {
        let vouchersEntries = db.set('galleryEntries', []).write()
    }
}


