
function add(x, y) {
    return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
};

function SHA1hex(num) {
    var sHEXChars = "0123456789abcdef";
    var str = "";
    for (var j = 7; j >= 0; j--)
        str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
    return str;
};

function AlignSHA1(sIn) {
    var nblk = ((sIn.length + 8) >> 6) + 1,
        blks = new Array(nblk * 16);
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < sIn.length; i++)
        blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
    blks[nblk * 16 - 1] = sIn.length * 8;
    return blks;
};

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
};

function ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
};

function kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
        (t < 60) ? -1894007588 : -899497514;
};

function SHA1(sIn) {
    var x = AlignSHA1(sIn);
    var w = new Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
        e = add(e, olde);
    }
    var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);
    return SHA1Value.toLowerCase();
};

const DIFF_AVG_NUM = 20;
const MAX_BOUNTY_BLOCK = 5760;
const BLOCK_A_MONTH = 175200;
const NRC20 = 20;
const UNSUBSCRIBE = 0;
const SUBSCRIBE = 1;
const DEFAULT = 2;

var nrc20Interface = {
    name: function (){
    },
    symbol: function (){
    },
    decimals: function (){
    },
    totalSupply: function (){
    },
    balanceOf: function (_owner){
    }
};

var nrcInterface = {
    name: function (){
    }
};

var Holder = function (obj) {
    this.parse(obj);
};


Holder.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            this.holderId = new BigNumber(data.holderId);
            this.vipId = new BigNumber(data.vipId);
            this.account = data.account;     // read only
            this.tokens = data.tokens;     // read and write (need auth)  // store is {"n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt": 0/1/2}  0-unsubscribe 1-subscribe 2-default/ query returns  {"n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt": {subscribe: 0/1/2, type: 20, name: CGToken, symbol: CGT, decimals: 18, balance: 100}};
            this.lastBounty = new BigNumber(data.lastBounty);  // var bk_height = new BigNumber(Blockchain.block.height);
            this.bounty = data.bounty;         // rw // set to vipHolder if bounty is not 0 // set to 0 when balance is less than bounty
            this.difficulty = new BigNumber(data.difficulty);  //rw
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray = this.diffArray.push(new BigNumber(data.diffArray[i]));
            }
            this.isVip = data.isVip;
            this.avatar = data.avatar;     // rw
            this.other = data.other;       // rw
        } else {
            this.holderId = new BigNumber(0);
            this.vipId = new BigNumber(-1);
            this.account = '0x0';
            this.tokens = {};
            this.lastBounty = new BigNumber(0);
            this.bounty = new BigNumber(0);
            this.difficulty = new BigNumber(0);
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray = this.diffArray.push(new BigNumber(0));
            }
            this.isVip = false;
            this.avatar = '';
            this.other = {};
        }
    }
};


var Token = function (obj) {
    this.parse(obj);
};

Token.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            this.tokenId = new BigNumber(data.tokenId);
            this.popularId = new BigNumber(data.popularId);
            this.address = data.address;         // read only
            this.logo = data.logo;         // read and write (need auth)
            this.price = data.price;       // rw  //for worker
            this.lastBounty = new BigNumber(data.lastBounty);  // rw // //for worker var bk_height = new BigNumber(Blockchain.block.height);
            this.bounty = new BigNumber(data.bounty);   // rw  // for cashier
            this.cashier = data.cashier;          //rw  // for auth
            this.difficulty = new BigNumber(data.difficulty); // rw  // for worker
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray = this.diffArray.push(new BigNumber(data.diffArray[i]));
            }
            this.name = data.name;         // rw
            this.type = data.type;         // ro
            this.symbol = data.symbol;     // rw
            this.decimals = data.decimals;     //ro
            this.totalSupply = data.totalSupply;    // rw
            this.auth = new BigNumber(data.auth);   // rw // deposit NTT to maintain auth and set up a revision threshold
            this.enabled = data.enabled;            // rw  only auth
            this.popular = data.popular;            // rw
            this.popularity = new BigNumber(data.popularity);  // r //deposit NTT to support the Token
            this.community = data.community;        // rw  // website, email, twitter, facebook, telegram, youtube, github...
            this.other = data.other;                // rw
        } else {
            this.tokenId = new BigNumber(0);
            this.popularId = new BigNumber(-1);
            this.address = '0x0';
            this.logo = '';
            this.price = {'nas': 0, 'usd': 0, 'cny': 0};
            this.lastBounty = new BigNumber(0);
            this.bounty = new BigNumber(0);
            this.cashier = '0x0';
            this.difficulty = new BigNumber(0);
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray = this.diffArray.push(new BigNumber(0));
            }
            this.name = '';
            this.type = 0;
            this.symbol = '';
            this.decimals = 0;
            this.totalSupply = new BigNumber(0);
            this.auth = new BigNumber(0);
            this.enabled = true;
            this.popular = false;
            this.popularity = new BigNumber(0);
            this.community = {};
            this.other = {};
        }
    }
};

function randomStr() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//var sha1 = require('sha1');
//var i = 1000000;
//
//while (true){
//    i--;
//    var randomString = randomStr();
//    if(SHA1(randomString) === sha1(randomString)){
//        console.log('test pass: ' + randomString + ' :sha1: ' + SHA1(randomString));
//    } else{
//        throw new Error('test fail: ' + randomString + ' :sha1: ' + SHA1(randomString));
//    }
//    if(i < 0){
//        break;
//    }
//}

//console.log(SHA1('n1dLmzZq3XqwQWxiYo7jwdWnditGnqTxwo'+'n1HhV62oW2WNhWMA9gddgiR7Vuopjqh1onp'));
//console.log(sha1('n1dLmzZq3XqwQWxiYo7jwdWnditGnqTxwo'+'n1HhV62oW2WNhWMA9gddgiR7Vuopjqh1onp'));


var BigNumber = require('bignumber.js');

console.log(new BigNumber('-Infinity').isFinite());

