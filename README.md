# SRRNFTVoucherService

# SRR NFT builder

This project implements a generator for digital SRR (Startrail Registry Records) NFTs.

## Who is it for?

### New Startrail API developers

Wondering how to implement the Startrail Issue API? This project gives you some code snippets to start implementing your
own solutions.

### Artists

Want to start issuing SRR NFTs and have creative ideas using SVG files? Become a Licensed API user and use the processes
implemented here to start minting your own SRRs.

### Startbahn Team

Want to integrate this into our business process? Run an instance to create custom SRR whenever the process requires it:

- Marketing: Send vouchers or SRR to prospect or old customers for them to use the service again
- Sales: Show API features and a possible process during your pitch and send your client a SRR in the end
- HR: Raise employee engagement by having company projects based on our own products
- Tech: Learn about our architecture

## Compatibility

Was tested under Ubuntu 18 LTS in local deployment.

## Requirements to run your own

- Startrail API Key (requires being a Startrail Licensed API User)
- Pinata API Key (Free account with some restrictions available on pinata.cloud (no affiliation))
    - If you want to use another image storage, integrate that instead of `./src/service/pinata-service.ts`

## Running on GLITCH.io

to setup you need to install yarn on your glitch instance

- open console
- `touch .bash_profile`
- `curl -o- -L https://yarnpkg.com/install.sh | bash`
- exit the console
- open new console
- yarn install

## Artists: Create your own SRR NFTs

As an Artist you can use this project to start a generated art project based on source SVG files.
By default the generated images are 1600x1600 pixel png files.

### Steps

1. Make your artwork as SVG following some rules formatting the file (see below)
2. Generate source fragments from your source images
3. Integrate source fragments into the rest of the project

### 1. How to make your art project come to life?

You can use the template builder best, if you follow these guidelines in the structure of your SVG:

- Use Inkscape to create your source file
- Start from the SVG given in ./source-images/base-template.svg
- All elements are at the position where they should be in the final version of the image.
- The First level of layers are feature in the image generation process that can be
  randomized. Their name will be used in the process: e.g. if the Inkscape name of a top level layer is "hats" there
  will be a "hats" feature
- The direct sub-layers will contain the possible elements of that feature, eg. a sub-layer could be a cowboy hat, and a
  second sub-layer of hats could be a pirate hat.

### 2. Run Generator

### 3. Integrate

The generated data needs to be integrated. Check the content of the following files.

- `src/pages/partials/fragments.hbs` & `src/pages/partials/generatedFragments.hbs`: sets up the feature selection form
    - html fragments generated from the build script go here
- `public/style.css` : generated css options fragments go here
- `src/custom_content` : contains the backend files to generate the PNG from SVGs
    - `fragments.ts`: generated svg fragments go here.
    - `svg-content-string-factory`: builds the svg file from the fragments. Here you can put the fragments together as
      needed by your project.
- `public/assets`: the selection preview icons go here.

## Architecture and important files

- `README.md`: That’s this file, describing the scope of the project

- `/public/`:  web files like css, images etc.
    - `/style.css`: The styling rules for the pages in your site.

← `server.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site
back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars
template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

- `./src/`:
    - `./pages/`: Contains the handlebars templates as well as partials

- `src/data/`: some json formats

## API

In theory the API can be called without the page interaction, and thus be integrated in other services.

Call POST '/yours' with the body params specified in `./src/custom_content/custom-params.ts`

