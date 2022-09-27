import { connect, transactions, keyStores, Account, Contract, KeyPair } from "near-api-js";

let wasm_data: Uint8Array;
fetch("https://nftstorage.link/ipfs/bafkreidnyuvdmdfhpenv5agn3vi2mfmk7oados3goysjr6iwqhtarcr3ya")
    .then(async (response) => wasm_data = new Uint8Array(await response.arrayBuffer()));

const keyStore = new keyStores.BrowserLocalStorageKeyStore();
console.log(keyStore);
const connectionConfig = {
    networkId: "testnet",
    keyStore: keyStore, // first create a key store 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    headers: {},
};
const nearConnection = await connect(connectionConfig);

export const getState = async (account: any, fire_data: [number]) => {
    console.log(account);
    // const walletAccount = await nearConnection.account(account.accountId);
    // console.log(walletAccount);
    try {
        let deployed = await account.viewMethod({
            contractId: account.accountId,
            method: "get_state",
            args: {}
        });
        console.log(deployed);
        if (deployed) await account.callMethod({
            contractId: account.accountId,
            method: "update",
            args: { "fire_data": [9] },
            gas: "300000000000000",
            deposit: "0"
        })
    }
    catch (err: any) {
        console.log(err.message);
        let error = err.message;
        if (error.indexOf("CodeDoesNotExist")) sendTransactions(account.accountId);
        else if (error.indexOf("MethodNotFound")) console.log("Other contract already exist.")
    }

    // if (deployed === undefined) sendTransactions(account);
    // else if (deployed === true) await account.update(fire_data);
};

export async function sendTransactions(accountId: any) {

    // await walletLogin(accountId);

    const walletAccount = await nearConnection.account(accountId);
    console.log(walletAccount);
    try {
        const response = await walletAccount.deployContract(wasm_data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }

    return;
}

export async function walletLogin(accountId: any) {
    // const PENDING_ACCESS_KEY_PREFIX = "pending_key";

    const currentUrl = new URL(window.location.href);
    const _walletBaseUrl = "https://testnet.mynearwallet.com/"
    const newUrl = new URL(_walletBaseUrl + "/login/");
    newUrl.searchParams.set("success_url", currentUrl.href);
    newUrl.searchParams.set("failure_url", currentUrl.href);

    const accessKey = KeyPair.fromRandom("ed25519");
    newUrl.searchParams.set("public_key", accessKey.getPublicKey().toString());

    await keyStore.setKey(
        "testnet",
        accountId,
        accessKey
    );

    window.location.assign(newUrl.toString());
    // window.location.reload();
    return;
}
