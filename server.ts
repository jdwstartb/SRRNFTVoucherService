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
        handlebars: require("handlebars"),
        //layout: './src/pages/layout/main.hbs'
    }
});

// Load and parse SEO data
const seo = require("./src/data/seo.json");
if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Route to the gallery
 */
fastify.get("/", async function (request, reply) {

    // params is an object we'll pass to our handlebars template
    let params: any = {seo: seo};

    params.galleryEntries = await new GalleryService().getGalleryEntries()

    console.log(params)


    // The Handlebars code will be able to access the parameter values and build them into the page
    reply.view("/src/pages/index.hbs", params);
});

/**
 * Route to the build a bunny site
 */
fastify.get("/yours", function (request, reply) {

    let params: any = {seo: seo};

    reply.view("/src/pages/get-yours.hbs", params);
})

/**
 * Route to accept a bunny building request
 */
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

    const fileInfo = await mintRequestProcessingService.performMintRequest(requestParams)

    reply.view("/src/pages/get-yours.hbs", params);
});

/**
 * route to handle issue api webhook requests onIssuance and onTransfer
 */
fastify.post("/hook", async function (request, reply) {
    console.log(`${Date.now()}: entered /hook with ${JSON.stringify(request.body)}`)
    if (request.headers['x-api-key'] !== process.env.SRR_WEBHOOK_API_KEY) {
        reply.status(404).send({message: "NOT AUTHORIZED"})
    }


    try {
        const processResult = await new GalleryService().addIssuedSRRByWebhookV1(request.body)
        reply.send({message: "OK"})
    } catch (e) {
        console.log(e)
        reply.status(500).send({message: "ERROR"})
    }
})

fastify.get("/faq", function (request, reply) {

    let params: any = {seo: seo};

    reply.view("/src/pages/faq.hbs", params);
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
