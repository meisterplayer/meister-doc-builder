const fs = require('fs');
const path = require('path');

const {
    MEISTER_CORE_MODULE_NAME,
    MEISTER_CORE_DOC_NAME,
} = require('./constants');

function convertModuleName(prefix, moduleName) {
    if (moduleName === MEISTER_CORE_MODULE_NAME) { return MEISTER_CORE_DOC_NAME; }
    // Remove the plugin prefix
    const pluginName = moduleName.replace(prefix, '');
    return pluginName.charAt(0).toUpperCase() + pluginName.substring(1);
}

function copyFile(source, target, cb) {
    let cbCalled = false;

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }

    const rd = fs.createReadStream(source);
    rd.on('error', (err) => { done(err); });

    const wr = fs.createWriteStream(target);
    wr.on('error', (err) => { done(err); });
    wr.on('close', () => { done(); });

    rd.pipe(wr);
}

function createDestinationPaths(dirPath) {
    return function createDestinationFilePath(fileName) {
        return path.normalize(`${dirPath}/${fileName}.md`);
    };
}

function createSourcePaths(dirPath, type) {
    return function createSourceFilePath(modulePath) {
        return path.normalize(`${dirPath}/${modulePath}/${type}`);
    };
}

function isMeisterDirectory(prefix, dirName) {
    return dirName.indexOf(prefix) !== -1 || dirName === MEISTER_CORE_MODULE_NAME;
}

function makeDir(dirPath, cb) {
    // Create directory if it doesn't exist.
    fs.mkdir(dirPath, (err) => {
        if (!err || err.code === 'EEXIST') {
            cb();
        } else {
            cb(err);
        }
    });
}

function mergeSourcesDestinations(sources, destinations) {
    // eslint-disable-next-line arrow-body-style
    return sources.map((source, index) => { return { src: source, dest: destinations[index] }; });
}

module.exports = {
    convertModuleName,
    copyFile,
    createDestinationPaths,
    createSourcePaths,
    isMeisterDirectory,
    makeDir,
    mergeSourcesDestinations,
};
