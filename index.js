#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const {
    convertModuleName,
    copyFile,
    createDestinationPaths,
    createSourcePaths,
    isMeisterDirectory,
    makeDir,
    mergeSourcesDestinations,
} = require('./lib');

const { MEISTER_DOCS_DESTINATION, MEISTER_PATH } = require('./constants');


function copyDocs() {
    fs.readdir(path.normalize(MEISTER_PATH), (err, files) => {
        if (err) { throw err; }

        const meisterDirectories = files.filter(isMeisterDirectory);

        const destinationPaths = meisterDirectories.map(convertModuleName)
            .map(createDestinationPaths(MEISTER_DOCS_DESTINATION));
        const sourcePaths = meisterDirectories.map(createSourcePaths(MEISTER_PATH));

        const zippedSrcDst = mergeSourcesDestinations(sourcePaths, destinationPaths);

        zippedSrcDst.forEach((zip) => {
            copyFile(zip.src, zip.dest, () => {});
        });
    });
}

makeDir(path.normalize(MEISTER_DOCS_DESTINATION), (err) => {
    if (err) { throw err; }
    copyDocs();
});
