import {MintRequestProcessingService} from './src/service/mint-request-processing-service'
import {VoucherService} from './src/service/voucher-service'
import path from 'path';
import {CustomParams} from "./src/custom_content/custom-params";
import {GalleryService} from "./src/service/gallery-service";

const mintRequestProcessingService = new MintRequestProcessingService()

const voucherService = new VoucherService()


const fastify = require("fastify")({
    logger: false
});

require('dotenv').config()


fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
    engine: {
        handlebars: require("handlebars")
    }
});

// Load and parse SEO data
const seo = require("./src/data/seo.json");
if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", async function (request, reply) {

    // params is an object we'll pass to our handlebars template
    let params: any = {seo: seo};

    params.galleryEntries = await new GalleryService().getGalleryEntries()

    console.log(params)


    // The Handlebars code will be able to access the parameter values and build them into the page
    reply.view("/src/pages/index.hbs", params);
});

fastify.get("/yours", function (request, reply) {

    let params: any = {seo: seo};

    reply.view("/src/pages/get-yours.hbs", params);
})

fastify.post("/yours", async function (request, reply) {
    const requestParams: CustomParams = {...request.body, ears: "long", prop: ""}
    console.log(`${Date.now()}:${JSON.stringify(requestParams)}:entered /yours`)


    let params: any = {seo: seo};
    const theVoucher = requestParams.voucher


    if (!voucherService.isValidVoucher(theVoucher)) {
        const error = `voucher code invalid ${theVoucher}`
        console.log(error)
        params.error = error
        console.log(`${Date.now()}:${JSON.stringify(requestParams)}:exiting /yours`)
        return reply.view("/src/pages/get-yours.hbs", params);
    }

    const fileInfo = await mintRequestProcessingService.generateFileAndUploadAndMint(requestParams)

    reply.view("/src/pages/get-yours.hbs", params);
});


fastify.post("/hook", function (request, reply) {
    console.log(request.body)
    //todo: check api key from startbahn webhook
    // filter response for eoa, tokenid and thumbnail url and put those into a db list
    // then use this list in the gallery page

    reply.send({message: "OK"})
})

// Run the server and report out to the logs
fastify.listen(process.env.PORT, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});
