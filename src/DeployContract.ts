import { connect, keyStores, KeyPair } from "near-api-js";
import { wallet } from "./main";
let wasm_data: Uint8Array;
fetch(
  "https://nftstorage.link/ipfs/bafkreidnyuvdmdfhpenv5agn3vi2mfmk7oados3goysjr6iwqhtarcr3ya"
).then(
  async (response) => (wasm_data = new Uint8Array(await response.arrayBuffer()))
);

let data = await fetch("./main.wasm");
let buf = new Uint8Array(await data.arrayBuffer());

const keyStore = new keyStores.BrowserLocalStorageKeyStore();
console.log(keyStore);
const nearConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  headers: {},
};
const near = await connect({ keyStore, ...nearConfig });

export const getState = async (account: any, fire_data: [number, number]) => {
  console.log(account);
  // const walletAccount = await nearConnection.account(account.accountId);
  // console.log(walletAccount);
  try {
    let deployed = await account.viewMethod({
      contractId: account.accountId,
      method: "get_state",
      args: {},
    });
    console.log(deployed);
    if (deployed) updateContract(account, [0.9, 9.0]);
  } catch (err: any) {
    console.log(err.message);
    let error = err.message;
    if (error.indexOf("CodeDoesNotExist") > 0)
      sendTransactions(account.accountId);
    else if (error.indexOf("MethodNotFound") > 0)
      console.log("Other contract already exist.");
    else if (error.indexOf("initialized") > 0)
      initContract(account, [0.0, 0.0]);
    else if (error.indexOf("Deserialization") > 0)
      sendTransactions(account.accountId);
  }
};

export const getBalance = async () => {
  if (await wallet.startUp()) {
    const account = await near.account(wallet.accountId);
    const balance = await account.getAccountBalance();
    return parseInt(balance.total);
  }

  return 0;
};

async function sendTransactions(accountId: any) {
  const walletAccount = await near.account(accountId);
  // console.log(data);
  // console.log(buf);
  try {
    const response = await walletAccount.deployContract(buf);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return;
}

async function initContract(account: any, fire_data: [number, number]) {
  await account.callMethod({
    contractId: account.accountId,
    method: "new",
    args: { owner_id: account.accountId, fire_data: [0.0, 0.0] },
    gas: "300000000000000",
    deposit: "0",
  });
}

async function updateContract(account: any, fire_data: [number, number]) {
  await account.callMethod({
    contractId: account.accountId,
    method: "update",
    args: { fire_data: fire_data },
    gas: "300000000000000",
    deposit: "0",
  });
}

export async function walletLogin(accountId: any) {
  console.log(accountId);
  const currentUrl = new URL(window.location.href);
  const _walletBaseUrl = "https://testnet.mynearwallet.com/";
  const newUrl = new URL(_walletBaseUrl + "/login/");
  newUrl.searchParams.set("success_url", currentUrl.href);
  newUrl.searchParams.set("failure_url", currentUrl.href);

  const accessKey = KeyPair.fromRandom("ed25519");
  newUrl.searchParams.set("public_key", accessKey.getPublicKey().toString());

  await keyStore.setKey("testnet", accountId, accessKey);

  window.location.assign(newUrl.toString());

  console.log(accessKey);
  // setStore(keyStore);
  // window.location.reload();
  return;
}
