const axios = require('axios');

const builder = require('./builder');
const codec = require('./codec');
const crypto = require('./crypto');
const sender = require('./sender');
const constants = require('./constants');

async function transfer(addressTo, amount) {
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

    const sendRequest = {
        acc,
        from: sender.address,
        to: codec.bech32.toBech32(constants.CyberdNetConfig.PREFIX_BECH32_ACCADDR, addressTo),
        amount: amount,
        type: 'send'
    };

    const txRequest = builder.buildAndSignTxRequest(sendRequest, sender.privateKey, sender.chain);
    const signedSendHex = codec.hex.stringToHex(JSON.stringify(txRequest));

    return axios({
        method: 'get',
        url: `${sender.node}/submit_signed_send?data="${signedSendHex}"`,
    })
    // .then(res => console.log(res))
    .catch(error => console.log('Cannot send', error));
}

async function link(from, to) {
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
    
    const sendRequest = {
        acc,
        fromCid: from,
        toCid: to,
        type: 'link'
    };
    
    const txRequest = builder.buildAndSignTxRequest(sendRequest, sender.privateKey, sender.chain);
    const signedSendHex = codec.hex.stringToHex(JSON.stringify(txRequest));

    return axios({
        method: 'get',
        url: `${sender.node}/submit_signed_link?data="${signedSendHex}"`,
    })
    // .then(res => console.log(res))   
    .catch(error => console.log('Cannot send', error));
}

// transfer("5EDE722AC46B33CB8B8EDBF3893C36FA8B992EA8", 5000);
link("QmV2i3zrWF2ZzmKtzMFMFqyrAjadShFn5qwmU3ANv66BTY", "QmSQuSbrLrrUK4qUUsHPrk68WaBH6DFerkUhxf9zLZaSSS");