const fs = require('fs-extra');
const path = require('path');

const pathsJSON = require('../config/paths.json');
const { objReducer } = require('../utils/commons');
const { OPTIONS, INDEX_CSS, INDEX_HTML, INDEX_JS } = require('../utils/constants');

const config = module.exports;

const getOptions = (opts) => ({
  ...OPTIONS,
  ...Object.keys(opts)
    .filter(key => OPTIONS.hasOwnProperty(key) && typeof opts[key] !== 'undefined')
    .map(key => ({ [key]: opts[key] }))
    .reduce(objReducer, {}),
});

const getPaths = (cwd) => ({
  cwd,
  ...Object.keys(pathsJSON)
    .map(key => ({ [key]: path.resolve(cwd, pathsJSON[key]) }))
    .reduce(objReducer, {}),
});

config.setup = (opts = {}) => {
  const paths = getPaths(process.cwd());
  return Object.assign(config, {
    options: getOptions(opts),
    package: JSON.parse(fs.readFileSync(paths.package, 'utf-8')),
    paths,
  });
};
