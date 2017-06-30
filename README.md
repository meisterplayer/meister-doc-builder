# Meister Doc Builder #

Actually, it just searches your node modules for Meister plugins and copies their README.md to `meister-docs` and CHANGELOG.md to `meister-changelog` you project root folder. The READMs are renamed to the name of the plugin.
Install this module as dev-dependency in a Meister-target. To generate README's run `npm run generate-docs`. To generate CHANGELOG's run `npm run  generate-docs -- --changelog` 
