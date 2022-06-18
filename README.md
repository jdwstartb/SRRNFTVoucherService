# SRRNFTVoucherService

# SRR NFT builder

This project implements a generator for digital SRR (Startrail Registry Records)

## Possibilities of use:

- Sales pitch: Have a running instance of this thing and issue and send your client and SRR during the pitch.
- Startup project for Clients: Give clients an idea how they can get started and interact with our API

## Compatibility

Was tested under Ubuntu 18 LTS

## Requirements to run your own

- Startrail API Key (requires being a Startrail Licensed User)
- Pinata API Key

## What's in this project?

← `README.md`: That’s this file, describing the scope of the project

← `public/style.css`: The styling rules for the pages in your site.

← `server.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site
back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars
template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

← `src/`: This folder holds the site template along with some basic data files.

← `src/pages/index.hbs`: This is the main page template for your site. The template receives parameters from the server
script, which it includes in the page HTML. The page sends the user submitted color value in the body of a request, or
as a query parameter to choose a random color.

← `src/colors.json`: A collection of CSS color names. We use this in the server script to pick a random color, and to
match searches against color names.

← `src/seo.json`: When you're ready to share your new site or add a custom domain, change SEO/meta settings in here.

## Try this next 🏗️

## Built on Glitch!
