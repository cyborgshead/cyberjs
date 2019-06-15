const utils = require('./utils');
const keypair = require('./keypair');
const codec = require('./codec');
const constants = require('./constants').CyberdNetConfig;

module.exports = {
    encode(acc) {
        if (!utils.isEmpty(acc)) {
            const defaultCoding = constants.DEFAULT_ENCODING;

            switch (defaultCoding) {
                case constants.ENCODING_BECH32: {
                    if (codec.hex.isHex(acc.address)) {
                        acc.address = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCADDR, acc.address);
                    }
                    
                    if (codec.hex.isHex(acc.publicKey)) {
                        acc.publicKey = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCPUB, acc.publicKey);
                    }
                    break;
                }
                default: { }
            }
            return acc;
        }
    },

    create(language) {
        const keyPair = keypair.create();

        if (keyPair) {
            return this.encode({
                address: keyPair.address,
                phrase: keyPair.secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey,
            });
        }
        return keyPair;
    },

    recover(secret, language) {
        const keyPair = keypair.recover(secret);

        if (keyPair) {
            return this.encode({
                address: keyPair.address,
                phrase: secret,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey,
            });
        }
    },

    importAccount(privateKey) {
        const keyPair = keypair.import(privateKey);

        if (keyPair) {
            return this.encode({
                address: keyPair.address,
                phrase: null,
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey,
            });
        }
    },

    isValidAddress(address) {
        return keypair.isValidAddress(address);
    },

    isValidPrivate(privateKey) {
        return keypair.isValidPrivate(privateKey);
    },

    getAddress(publicKey) {
        const pubKey = codec.hex.hexToBytes(publicKey);
        let address = keypair.getAddress(pubKey);

        address = codec.bech32.toBech32(constants.PREFIX_BECH32_ACCADDR, address);
        return address;
    }
}