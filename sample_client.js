require('dotenv').config();
const { YearnExporter, grpc } = require("./yrpc");

const host = process.env.HOST || 'localhost';
const ethPort = process.env.ETH_PORT || 1337;
const ftmPort = process.env.FTM_PORT || 1338;

// TODO add secure channel example
const ethClient = new YearnExporter(`${host}:${ethPort}`, grpc.credentials.createInsecure());
const ftmClient = new YearnExporter(`${host}:${ftmPort}`, grpc.credentials.createInsecure());

/**
 * this is a sample client requesting the prices for several contracts over gRPC. 
 */

const ethAddresses = [
  "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
].map(a => ({ address: a, network: "mainnet" }));

const ftmAddresses = [
  "0x29b0Da86e484E1C0029B56e817912d778aC0EC69",
].map(a => ({ address: a, network: "ftm-main" }));

call(ethClient, ethAddresses);
call(ftmClient, ftmAddresses);

function call(client, addresses) {
  const call = client.GetPrices({addresses: addresses});
  console.log("calling yearn_exporter.getPrices()...");
  call.on('data', function(address) {
    console.log(address);
  });
}
