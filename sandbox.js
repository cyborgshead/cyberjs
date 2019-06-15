const axios = require('axios');

const builder = require('./builder');
const codec = require('./codec');
const crypto = require('./crypto');
const sender = require('./sender');
const constants = require('./constants');

async function transfer(addressTo) {
    const addressInfo = await axios({
        method: 'get',
        url: `${sender.node}/account?address="${sender.address}"`,
    });
    
    if(!addressInfo.data.result) { return console.log ("error") };
    const account = addressInfo.data.result.account;
    if(!account) { return console.log ("error") };
    
    const acc = {
        address: account.address,
        chain_id: sender.chain,
        account_number: parseInt(account.account_number, 10),
        sequence: parseInt(account.sequence, 10)
    };
    console.log("ACC:\n", acc)
    
    const sendRequest = {
        acc,
        from: sender.address,
        to: codec.bech32.toBech32(constants.CyberdNetConfig.PREFIX_BECH32_ACCADDR, addressTo),
        amount: 10000,
        type: 'send'
    };
    console.log("SEND_REQUEST:\n", sendRequest);
    
    const txRequest = builder.buildAndSignTxRequest(sendRequest, sender.privateKey, sender.chain);
    console.log("TX_REQUEST:\n", txRequest);
    
    const signedSendHex = codec.hex.stringToHex(JSON.stringify(txRequest));
    console.log("SIGNED_SEND_HEX:\n", signedSendHex);
    
    console.log()
}

transfer("5EDE722AC46B33CB8B8EDBF3893C36FA8B992EA8");