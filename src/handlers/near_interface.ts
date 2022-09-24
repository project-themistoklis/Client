export class NearHandler {
    contractId: any;
    wallet: any;

    constructor({ contractId, walletToUse }: any) {
      this.contractId = contractId;
      this.wallet = walletToUse;    
    }
  
    async getGreeting() {
      return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_greeting' });
    }
  
    async setGreeting(greeting: any) {
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_greeting', args: { message: greeting } });
    }
  }