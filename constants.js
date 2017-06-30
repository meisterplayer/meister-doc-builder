module.exports = {
    MEISTER_CORE_MODULE_NAME: 'meisterplayer',
    MEISTER_CORE_DOC_NAME: 'Meister',
    MEISTER_README_DESTINATION: './meister-docs',
    MEISTER_CHANGELOG_DESTINATION: './meister-changelogs',
    MEISTER_PATHS: [
        { path: './node_modules/@npm-wearetriple', prefix: 'meister-plugin-' },
        { path: './node_modules/@meisterplayer', prefix: 'plugin-' },
    ],
    README_FILE_NAME: 'README.md',
    CHANGELOG_FILE_NAME: 'CHANGELOG.md',
};
