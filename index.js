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

const {
    README_FILE_NAME,
    CHANGELOG_FILE_NAME,
    MEISTER_README_DESTINATION,
    MEISTER_PATHS,
    MEISTER_CHANGELOG_DESTINATION,
} = require('./constants');


let type = README_FILE_NAME;
let destination = MEISTER_README_DESTINATION;
if (
    (process.argv[2] === '--changelog') ||
    (process.argv[2] === '--changelogs') ||
    (process.argv[2] === 'changelogs') ||
    (process.argv[2] === 'changelog')
    ) {
    type = CHANGELOG_FILE_NAME;
    destination = MEISTER_CHANGELOG_DESTINATION;
}

function copyDocs() {
    MEISTER_PATHS.forEach((MEISTER_PATH) => {
        fs.readdir(path.normalize(MEISTER_PATH.path), (err, files) => {
            if (err) { throw err; }

            const meisterDirectories = files.filter(isMeisterDirectory.bind(null, MEISTER_PATH.prefix));

            const destinationPaths = meisterDirectories.map(convertModuleName.bind(null, MEISTER_PATH.prefix))
                .map(createDestinationPaths(destination));

            const sourcePaths = meisterDirectories.map(createSourcePaths(MEISTER_PATH.path, type));
            const zippedSrcDst = mergeSourcesDestinations(sourcePaths, destinationPaths);

            zippedSrcDst.forEach((zip) => {
                copyFile(zip.src, zip.dest, () => {});
            });
        });
    });
}

makeDir(path.normalize(destination), (err) => {
    if (err) { throw err; }
    copyDocs();
});
