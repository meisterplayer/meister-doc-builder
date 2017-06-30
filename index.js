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

const { MEISTER_DOCS_DESTINATION, MEISTER_PATHS } = require('./constants');


function copyDocs() {
    MEISTER_PATHS.forEach((MEISTER_PATH) => {
        fs.readdir(path.normalize(MEISTER_PATH.path), (err, files) => {
            if (err) { throw err; }

            const meisterDirectories = files.filter(isMeisterDirectory.bind(null, MEISTER_PATH.prefix));

            const destinationPaths = meisterDirectories.map(convertModuleName.bind(null, MEISTER_PATH.prefix))
                .map(createDestinationPaths(MEISTER_DOCS_DESTINATION));

            const sourcePaths = meisterDirectories.map(createSourcePaths(MEISTER_PATH.path));
            const zippedSrcDst = mergeSourcesDestinations(sourcePaths, destinationPaths);

            zippedSrcDst.forEach((zip) => {
                copyFile(zip.src, zip.dest, () => {});
            });
        });
    });
}

makeDir(path.normalize(MEISTER_DOCS_DESTINATION), (err) => {
    if (err) { throw err; }
    copyDocs();
});
