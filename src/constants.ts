export const ip = "127.0.0.1";
export const port = 65535;
export const webServerUrl = `http://${ip}:${port}`;
export const storage_prefix = "asd_";

export const app_name = "Themis Client";

export const near_contract_name = "test";
export const near_app_prefix = "asd_";
export const nearNetwork = "testnet";
export const wallet_connect_contract_id = "example-contract." + nearNetwork;
export const near_connection_config = (keyStore: any) => {
  return {
    networkId: nearNetwork,
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
};
