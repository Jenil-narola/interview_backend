// process.env.NODE_ENV = 'production';
console.clear() // Comment this for Continuos logging
// Load Environment Variables from the .env file
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'development'}`, override: true })
require('dotenv').config({ path: `./.env.local`, override: true })

if (!process.env.NODE_ENV || !process.env.PORT) throw new Error('NODE_ENV or PORT not found in .env file. Please configure .env file. See README.md')
process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledrejection', (error) => console.error(error));

const { compareSemanticVersion } = require('./src/utils/version-parser')

const packageJson = require('./package.json');
if (compareSemanticVersion(process.version, '18.0.0') === -1) {
    throw new Error(`Node.js version ${process.version} is not supported. Please upgrade to Node.js ${packageJson.engines.node} or higher`)
}

const logger = require('./src/services/winston');
const getEnv = require('./src/helpers/get-env');
const expressApp = require('./app');
const http = require('http');

// HTTP Server
const server = http.createServer(expressApp);
server.addListener('listening', () => {
    logger.info(`[Server.js]: \x1b[96m\x1b[1m PROJECT: ${packageJson.name} \x1b[0m | \x1b[32m\x1b[1m PORT: ${process.env.PORT} \x1b[0m | \x1b[32m\x1b[1m NODE_ENV: ${process.env.NODE_ENV || '\x1b[31m\x1b[1m NODE_ENV NOT FOUND'} \x1b[0m`)
});

server.listen(process.env.PORT); // Start Server on PORT
require('./src/database')