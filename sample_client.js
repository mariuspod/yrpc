require('dotenv').config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1337

const { YearnExporter, grpc } = require("./yrpc");
const client = new YearnExporter(`${host}:${port}`, grpc.credentials.createInsecure())
/**
 * this is a sample client requesting the prices for several contracts over gRPC. 
 */

const addresses = {
  list: [
    "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
    "0x514910771af9ca656af840dff83e8264ecf986ca",
    "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"
  ]
};

const call = client.GetPrices(addresses);
console.log("calling yearn_exporter.getPrices()...");
call.on('data', function(address) {
  console.log(address);
});
call.on('end', function(address) {
  console.log("done.")
})