
require('dotenv').config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1337

const PROTO_PATH = 'yrpc.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const YearnExporter = grpc.loadPackageDefinition(packageDefinition).YearnExporter;

module.exports = {
  client: new YearnExporter(`${host}:${port}`, grpc.credentials.createInsecure())
}
