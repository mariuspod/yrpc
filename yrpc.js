
const PROTO_PATH = __dirname + '/yrpc.proto';
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
module.exports = {
  YearnExporter: grpc.loadPackageDefinition(packageDefinition).YearnExporter,
  grpc: grpc
}
