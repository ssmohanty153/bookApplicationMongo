import dotenv from 'dotenv';

dotenv.config();

const S_HOSTNAME = process.env.S_HOSTNAME || 'localhost';
const S_PORT = process.env.S_PORT || 3000;

const SERVER = {
    hostname: S_HOSTNAME,
    port: S_PORT
};

const config = {
    server: SERVER
};

export default config;





// The process.env global variable is injected by the Node at runtime for your application to use 
// and it represents the state of the system environment your application is in when it starts. 
// For example, if the system has a PATH variable set, 
// this will be made accessible to you through process.env.PATH which you can use to check 
// where binaries are located and make external calls to them if required.


//In your node app, load dotenv to read .env and set env variables when app starts