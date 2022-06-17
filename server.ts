import {MintRequestProcessingService} from './src/service/mint-request-processing-service'
import {VoucherService} from './src/service/voucher-service'
import path from 'path';

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
fastify.get("/", function (request, reply) {

    // params is an object we'll pass to our handlebars template
    let params: any = {seo: seo};


    // If someone clicked the option for a random color it'll be passed in the querystring
    if (request.query.randomize) {

        // We need to load our color data file, pick one at random, and add it to the params
        const colors = require("./src/data/colors.json");
        const allColors = Object.keys(colors);
        let currentColor = allColors[(allColors.length * Math.random()) << 0];

        // Add the color properties to the params object
        params = {
            color: colors[currentColor],
            colorError: null,
            seo: seo
        };
    }

    // The Handlebars code will be able to access the parameter values and build them into the page
    reply.view("/src/pages/index.hbs", params);
});

fastify.get("/yours", function (request, reply) {

    let params: any = {seo: seo};

    reply.view("/src/pages/get-yours.hbs", params);
})

fastify.post("/yours", function (request, reply) {
    let params: any = {seo: seo};
    const theVoucher = request.body.voucher


    if (!voucherService.isValidVoucher(theVoucher)) {
        const error = `voucher code invalid ${theVoucher}`
        console.log(error)
        params.error = error
        return reply.view("/src/pages/get-yours.hbs", params);
    }

    const fileInfo = mintRequestProcessingService.generateFileAndUploadAndMint(request)

    reply.view("/src/pages/get-yours.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, '0.0.0.0', function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
});
