module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.7',
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: 'jest',
    },
  },
  mongoURLEnvName: 'DATABASE_URL',
};
