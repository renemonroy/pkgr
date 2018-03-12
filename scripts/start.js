process.env.NODE_ENV = 'development';

const config = require('../lib/config');
const log = require('../utils/log');
const lifespan = require('../utils/lifespan');

module.exports = (options) => {
  log.debugging = Boolean(options.debug);

  const clearScreen = (name, version) => {
    log.clear();
    log.sign(name, version, { font: 'Big' });
  };

  const stopScript = () => {
    log.debug('config ↴\n', config);
    lifespan.finish();
  };

  ((opts) => {
    try {
      lifespan.start();

      process.on('unhandledRejection', lifespan.fail('Unhandled error thrown.'));
      ['SIGINT', 'SIGTERM'].forEach((sig) => { process.on(sig, stopScript); });

      const { package: {displayName, name, version} } = config.setup(opts);
      clearScreen(displayName || name, version);

      log(`${displayName || name} desktop application running...`);

      stopScript();
    } catch(err) {
      return Promise.reject(err);
    }
  })(options)
    .catch(lifespan.fail('Something went wrong during start execution.'));
};
