const codec = require('./codec');

// console.log(codec.bech32.fromBech32("cyber18va0xrvy5wjv46g8a3wc3f444lky2v96ch6cst"));
// console.log(codec.bech32.fromBech32("cyber1tm08y2kydveuhzuwm0ecj0pkl29ejt4g0upxcw"));
// console.log(codec.hex.hexToBytes(codec.bech32.fromBech32("cyber18va0xrvy5wjv46g8a3wc3f444lky2v96ch6cst")));
// console.log(codec.hex.hexToBytes(codec.bech32.fromBech32("cyber1tm08y2kydveuhzuwm0ecj0pkl29ejt4g0upxcw")));
console.log(codec.hex.hexToBytes(codec.bech32.fromBech32("cyber1r68lcw3wl7sfda49ry6dmk5qg7krp3ytq6cz7t")));
console.log(codec.bech32.fromBech32("cyber1r68lcw3wl7sfda49ry6dmk5qg7krp3ytq6cz7t"));