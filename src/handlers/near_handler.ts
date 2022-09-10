import { connect, Contract, Near, WalletConnection } from "near-api-js";
import { BrowserLocalStorageKeyStore } from "near-api-js/lib/key_stores";
import {
  app_name,
  nearNetwork,
  near_app_prefix,
  near_connection_config,
  storage_prefix,
  wallet_connect_contract_id,
} from "../constants";

export default class near_handler {
  static instance: near_handler | null = null;
  static init = () => {
    near_handler.instance = new near_handler();
    return this.instance;
  };

  keyStore: BrowserLocalStorageKeyStore | null = null;
  connection: Near | null = null;
  walletConnection: WalletConnection | null = null;

  constructor() {
    this._constructor();
  }

  _constructor = async () => {
    this.keyStore = new BrowserLocalStorageKeyStore(
      localStorage,
      storage_prefix
    );
    this.connection = await connect(near_connection_config(this.keyStore));
    this.walletConnection = new WalletConnection(
      this.connection,
      near_app_prefix
    );
  };

  connectWallet = async () => {
    if (!this.walletConnection) {
      return;
    }

    await this.walletConnection.requestSignIn({
      contractId: wallet_connect_contract_id,
    });
  };

  disconnectWalle = async () => {
    if (!this.walletConnection) {
      return;
    }

    if (this.walletConnection.isSignedIn()) {
      this.walletConnection.signOut();
    }
  };

  getWalletId = () => {
    if (!this.walletConnection) {
      return "";
    }

    if (this.walletConnection.isSignedIn()) {
      return this.walletConnection.getAccountId();
    }

    return "";
  };

  getAccountObject = async () => {
    if (!this.walletConnection) {
      return null;
    }

    if (this.walletConnection.isSignedIn()) {
      return this.walletConnection.account();
    }

    return null;
  };

  getAccountBalance = async () => {
    if (!this.walletConnection) {
      return;
    }

    const account = await this.walletConnection.account();
    return await account.getAccountBalance();
  };
  getAccountDetails = async () => {
    if (!this.walletConnection) {
      return;
    }

    const account = await this.walletConnection.account();
    return await account.getAccountDetails();
  };

  createContract = async (contractId: string, methodName: string) => {
    if (!this.walletConnection) {
      return;
    }

    const contract = new Contract(this.walletConnection.account(), contractId, {
      viewMethods: [],
      changeMethods: [methodName],
    });
    return contract;
  };
  loadContract = async (contractId: string, methodName: string) => {
    if (!this.walletConnection) {
      return;
    }

    const contract = new Contract(this.walletConnection.account(), contractId, {
      viewMethods: [],
      changeMethods: [methodName],
    });
    return contract;
  };
}
