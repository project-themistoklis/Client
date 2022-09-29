use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet, Vector};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise, PromiseOrValue,
};
use std::convert::TryInto;


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    // contract owner
    pub owner_id: AccountId,
    // contract data
    pub fire_data: [f64;2],
    // deployed flag
    pub deployed: bool
}


#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(owner_id: AccountId, fire_data: [f64;2]) -> Self {
        //create a variable of type Self with all the fields initialized. 
        let mut this = Self {
            owner_id,
            fire_data,
            deployed: true,
        };

        this
    }

    #[payable]
    pub fn update(&mut self, fire_data: [f64;2]) {
        assert_eq!(
            &env::predecessor_account_id(),
            &self.owner_id,
            "Owner's method"
        );
        self.fire_data = fire_data
    }

    pub fn get_state(self)->bool{
        self.deployed
    }

    pub fn get_fireData(self)->[f64;2]{
        self.fire_data
    }
}