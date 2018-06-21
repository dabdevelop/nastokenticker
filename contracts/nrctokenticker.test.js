'use strict';

var Nebulas = require("nebulas");
var Account = Nebulas.Account;
var Transaction = Nebulas.Transaction;
var Utils = Nebulas.Utils;
var Unit = Nebulas.Unit;

var accounts = ["f43213c3d0077b05c651684557d528652a6dbeee38a66b282273254ead06ff8d","249e8e7a8ca2db4cbe29e2f2f42a2b2740b35408e36f26ed7a1c2561abcd3799","57cb155243ebd675c8db3e68130e93ea435dd7b965bb31529c6920b633b68a65","30164f79d09eb406fd5eedb429a3cfa98d5166a23d62671979d388e6619b5319","4d6bf2a3ad1be97f5ed993d8d13da10bcb7b22f48347eb156c2230ad83ee4f9e","32efa52fe58240975d06bc412a2f8c7426ea3a67e437fbc47411f4978b4d3a08","864a30fc56c14113b317eaa3e0a532c27f22f9720f0a5be3390a1fd42caaef68","ddb4f25864b6e1c7085b29383f23e327a0dd190f004dd6ffb25ef60adaf2136e","d44b68150e3a22f50206650f04a847555ceb74e6c30902c9327c0fd1fe0f36a7","4c1ff05b93224ed19e62e1ef0fbdfd89af15e7e83905cf71c5fabac8d0a72712","15746f6acb40558c25d2b1f063abd94a79e7d53bd2da72732e1fc67186a06567","d66e6687d960c01902b2b0553e84161fefd6681b72c9ca1cf1bea3e87dfdb5cc","b921404a4cfee4a4d321551073fa02ed25abd2f8aea732b11eb5f1445de7f05f","846bfc7185e2e480c99ac4660e15cbf5f9cccb7a749ddd607e69556fe27c8feb","fbb3087742a515812a600fc5bec09fca94d0fadbf4069227a463f57cca2502a6","0c4abde99ffa9619c0e33498c7676d8e4d1394cef5b1b133e49d21be8ad7bd26","b3a05a0b245f146d4798efe51ebfb255cfb2b9e48f065b222768c0f7656148d9","dbe2700c56dbc62ab4052a46f82bb39bba317009b94e8886cb57fe81fcc9929e","df38d879ef7fae929f4419dd854ce3e59a03d393f8a28ac3828f4397bbea4a5e","72d160f4ebd03d34a81a9544c4ab09904b78d35b4fce5fd976d760739d829135","c328f37e8faa4cf733267a8d22bdf1bb13800b3034b69c3f3b75a1cc022bcfeb","614de1ef53e281c3b73a110591653d67017be090b7f4cc6779ef0e3963116d33","43760d7fc503622abb5b2a0e7563c965c86bd1844d851313e65361fcda4edf8e","eeaf8a90d160b63063c3f264729f1ca9f890a2b5b6cd556fd0d6a1ba4433f988"];


var BigNumber = require('bignumber.js');

var neb = new Nebulas.Neb();
//neb.setRequest(new Nebulas.HttpRequest("http://localhost:8685"));
//neb.setRequest(new Nebulas.HttpRequest("https://mainnet.nebulas.io"));
neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
//var chainID = 1;
var chainID = 1001;

// n1aedmxzq8XBb3TUgPE6ms556h5ymCkrtu2
var sourceAccount = new Account("dbafc4ed12085345ac5f0ad24959c94e421b6c9e27e7de5a2ed1b4072c9f9684");

// n1TpE5KzBX3gjJgEEAuoRTF68F6FHzxBdgh
//var sourceAccount = new Account("badfe9a04d91b2656ca5ea22d70b05f2df07929ddebb788e6870b5a155665611");

var globalParams = {
    account: sourceAccount,
    accounts: accounts
};

var players = [];

var contract = 'n1rtjQSEKSxmyQ9mpMhrTmU4xDpwavkbSUK';
//var contract = 'n235Bs9WMYYQAuo7w3F8XrhX5DCtWbSQ6cY';
//console.log(sourceAccount.getAddressString());



var batch = false;
var usePlayer = false;

//deploy();

//testLogin();

//testSetHolder({n1aedmxzq8XBb3TUgPE6ms556h5ymCkrtu2: 1}, 'https://explorer.nebulas.io/testnet/address/n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD/nnn.png', {dddd:333});

//testSetBounty(30);

//testSetTokenBounty("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 1000);

//testAuthorize("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 10000);
//testPopularize("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 12000);

//testSubmitToken("n1aedmxzq8XBb3TUgPE6ms556h5ymCkrtu2", 20);

//testSubmitTokenRaw("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 20, 'CapitalGameToken', "CGT", 18, 1000000);
//testSubmitTokenRaw("n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD", 20, 'CapitalGameToken', "CGT", 18, 200000);

//testSubmitBalanceRaw("n1aedmxzq8XBb3TUgPE6ms556h5ymCkrtu2", "n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 0.01);
//testSubmitBalanceRaw("n1MMHWF3BFhhHcSbiPMJgqzL8YYRsS4M27S", "n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", 101.66);
//testSubmitBalanceRaw("n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD", "n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD", 2);

//testUpdateTokenPrice("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", {NAS: 0.0297, CNY: 1.047, USD: 0.162});


//testSetToken("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt", "", true, {website: 'https://cgplayerone.com/', email: 'ft.nudt@gmail.com'}, {});

//testGetToken("n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt");

//testGetTokenByIndex(0);
//testGetTokensByIndexArray([0,1]);
//testGetTokensByAddressArray(['n1sr4JA4e9QPB4opLk2Kjmp8NkP6GGoAmnt', 'n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD']);

//testGetTokens(0, 1);

//testGetHolder("n1MMHWF3BFhhHcSbiPMJgqzL8YYRsS4M27S");
//testGetHolderByIndex(1);

//testGetHoldersByIndexArray([0, 1]);
//testGetHoldersByAccountArray(['n1aedmxzq8XBb3TUgPE6ms556h5ymCkrtu2', 'n1xjLawUUw3A5bwgkQYvhCkbVPztKCEawvD']);
testGetHolders(0, 2);


//tokenNum();
//holderNum();
//popularTokenNum();
//vipHolderNum();




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function testLogin(){
    var fun = 'login';
    var args = [];
    call(fun, args, 0, function(){});
}

function testSubmitToken(_address, _type){
    var fun = 'submitToken';
    var args = [];
    args.push(_address);
    args.push(_type);
    call(fun, args, 0, function(){});
}

function testSubmitTokenRaw(_address, _type, _name, _symbol, _decimals, _totalSupply){
    var fun = 'submitTokenRaw';
    var args = [];
    args.push(_address);
    args.push(_type);
    args.push(_name);
    args.push(_symbol);
    args.push(_decimals);
    args.push(_totalSupply);
    call(fun, args, 0, function(){});
}

function testSubmitBalanceRaw(_account, _address, _balance){
    var fun = 'submitBalanceRaw';
    var args = [];
    args.push(_account);
    args.push(_address);
    args.push(_balance);
    call(fun, args, 0, function(){});
}

function testUpdateTokenPrice(_address, _price){
    var fun = 'updateTokenPrice';
    var args = [];
    args.push(_address);
    args.push(_price);
    call(fun, args, 0, function(){});
}

function testSetToken(_address, _logo, _enabled, _community, _other){
    var fun = 'setToken';
    var args = [];
    args.push(_address);
    args.push(_logo);
    args.push(_enabled);
    args.push(_community);
    args.push(_other);
    call(fun, args, 0, function(){});
}

function testSetHolder(_subscribe, _avatar, _other){
    var fun = 'setHolder';
    var args = [];
    args.push(_subscribe);
    args.push(_avatar);
    args.push(_other);
    call(fun, args, 0, function(){});
}

function testSetBounty(_bountyAMonth){
    var fun = 'setBounty';
    var args = [];
    args.push(_bountyAMonth);
    call(fun, args, 0, function(){});
}

function testSetTokenBounty(_address, _bountyAMonth){
    var fun = 'setTokenBounty';
    var args = [];
    args.push(_address);
    args.push(_bountyAMonth);
    call(fun, args, 0, function(){});
}

function testAuthorize(_address, _newAuth){
    var fun = 'authorize';
    var args = [];
    args.push(_address);
    args.push(_newAuth);
    call(fun, args, 0, function(){});
}

function testPopularize(_address, _newPopular){
    var fun = 'popularize';
    var args = [];
    args.push(_address);
    args.push(_newPopular);
    call(fun, args, 0, function(){});
}

function testGetToken(_address){
    var fun = 'getToken';
    var args = [];
    args.push(_address);
    call(fun, args, 0, function(){});
}

function testGetTokensByIndexArray(_indexArray){
    var fun = 'getTokensByIndexArray';
    var args = [];
    args.push(_indexArray);
    call(fun, args, 0, function(){});
}

function testGetTokensByAddressArray(_addressArray){
    var fun = 'getTokensByAddressArray';
    var args = [];
    args.push(_addressArray);
    call(fun, args, 0, function(){});
}

function testGetTokenByIndex(_index){
    var fun = 'getTokenByIndex';
    var args = [];
    args.push(_index);
    call(fun, args, 0, function(){});
}


function testGetTokens(_offset, _limit){
    var fun = 'getTokens';
    var args = [];
    args.push(_offset);
    args.push(_limit);
    call(fun, args, 0, function(){});
}


function testGetHolder(_account){
    var fun = 'getHolder';
    var args = [];
    args.push(_account);
    call(fun, args, 0, function(){});
}

function testGetHolderByIndex(_index){
    var fun = 'getHolderByIndex';
    var args = [];
    args.push(_index);
    call(fun, args, 0, function(){});
}

function testGetHoldersByIndexArray(_indexArray){
    var fun = 'getHoldersByIndexArray';
    var args = [];
    args.push(_indexArray);
    call(fun, args, 0, function(){});
}

function testGetHoldersByAccountArray(_accountArray){
    var fun = 'getHoldersByAccountArray';
    var args = [];
    args.push(_accountArray);
    call(fun, args, 0, function(){});
}


function testGetHolders(_offset, _limit){
    var fun = 'getHolders';
    var args = [];
    args.push(_offset);
    args.push(_limit);
    call(fun, args, 0, function(){});
}

function tokenNum(){
    var fun = 'tokenNum';
    var args = [];
    call(fun, args, 0, function(){});
}

function holderNum(){
    var fun = 'holderNum';
    var args = [];
    call(fun, args, 0, function(){});
}

function popularTokenNum(){
    var fun = 'popularTokenNum';
    var args = [];
    call(fun, args, 0, function(){});
}

function vipHolderNum(){
    var fun = 'vipHolderNum';
    var args = [];
    call(fun, args, 0, function(){});
}

function call(fun, args, value, callback){
    innerCall(fun, args, value, function (params) {
        var address = params.from.getAddressString();
        console.log(address + ' call ' + contract + ' @ ' + fun + ": " +JSON.stringify(args) + ' with value: ' + value);
        neb.api.call({
            from: address,
            to: params.to,
            value: params.value,
            nonce: params.nonce,
            gasPrice: params.gasPrice,
            gasLimit: params.gasLimit,
            contract: params.contract
        }).then((resp) => {
            console.log(resp);
            if(batch){
                players.push(params.from.getPrivateKeyString());
                callback();
            }
            if(resp.execute_err !== '') return;
            var Transaction = Nebulas.Transaction;
            var tx = new Transaction({
                chainID: chainID,
                from: params.from,
                to: params.to,
                value: params.value,
                nonce: params.nonce,
                gasPrice: params.gasPrice,
                gasLimit: params.gasLimit,
                contract: params.contract
            });
            tx.signTransaction();
            //send a transfer request to the NAS node
            neb.api.sendRawTransaction({
                data: tx.toProtoString()
            }).then((result) => {
                let txhash = result.txhash;
                let trigger = setInterval(() => {
                    try{
                        neb.api.getTransactionReceipt({hash: txhash}).then((receipt) => {
                            console.log('Pending transaction ...');
                            if (receipt.status != 2) //not in pending
                            {
                                console.log(JSON.stringify(receipt));
                                clearInterval(trigger);
                                callback()
                            }
                        });
                    } catch(err){
                        console.log(err);
                        clearInterval(trigger);
                    }
                }, 5000);
            });

        }).catch((err) => {
            console.log('here');
            console.log(err);
        });
    });

}


function innerCall(fun, args, value, callback) {
    let params = {};

    if (!globalParams.account) {
        return;
    }

    params.from = globalParams.account;

    params.to = contract;
    params.gasPrice = Utils.toBigNumber(1000000);
    params.gasLimit = Utils.toBigNumber(2000000);
    params.value = Utils.toBigNumber(value * Math.pow(10, 18));

    // prepare contract
    params.contract = {
        "function": fun,
        "args": JSON.stringify(args)
    };

    neb.api.getAccountState(params.from.getAddressString()).then(function (resp) {
        params.nonce = parseInt(resp.nonce) + 1;
        callback(params);
    }).catch(function (err) {
        console.log(err);
    });
}

function deploy(){
    innerDeploy(function (params) {
        var gTx = new Nebulas.Transaction(chainID,
            params.from,
            params.to, params.value, params.nonce, params.gasPrice, params.gasLimit, params.contract);
        console.log(params.from.getAddressString() + ' deploy');
        gTx.signTransaction();

        neb.api
            .sendRawTransaction(gTx.toProtoString())
            .then(function (resp) {
                console.log(resp);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

}

function innerDeploy(callback){

    let params = {};

    if (!globalParams.account) {
        return;
    }
    params.from = globalParams.account;
    params.to = params.from.getAddressString();
    params.gasPrice = Utils.toBigNumber(1000000);
    params.gasLimit = Utils.toBigNumber(2000000);
    params.value = 0;

    const fs = require('fs');
    var source = fs.readFileSync('/Users/taofeng/Github/NASToken/contracts/nastoken.js', "utf-8");

    // prepare contract
    params.contract = {
        "source": source,
        "sourceType": 'js',
        "args": ''
    };

    neb.api.getAccountState(params.to).then(function (resp) {
        params.nonce = parseInt(resp.nonce) + 1;
        callback(params);
    }).catch(function (err) {
        console.log(err);
    });


}