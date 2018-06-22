"use strict";

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

const strict = true;
const tlds = ["aaa","aarp","abarth","abb","abbott","abbvie","abc","able","abogado","abudhabi","ac","academy","accenture","accountant","accountants","aco","active","actor","ad","adac","ads","adult","ae","aeg","aero","aetna","af","afamilycompany","afl","africa","ag","agakhan","agency","ai","aig","aigo","airbus","airforce","airtel","akdn","al","alfaromeo","alibaba","alipay","allfinanz","allstate","ally","alsace","alstom","am","americanexpress","americanfamily","amex","amfam","amica","amsterdam","analytics","android","anquan","anz","ao","aol","apartments","app","apple","aq","aquarelle","ar","arab","aramco","archi","army","arpa","art","arte","as","asda","asia","associates","at","athleta","attorney","au","auction","audi","audible","audio","auspost","author","auto","autos","avianca","aw","aws","ax","axa","az","azure","ba","baby","baidu","banamex","bananarepublic","band","bank","bar","barcelona","barclaycard","barclays","barefoot","bargains","baseball","basketball","bauhaus","bayern","bb","bbc","bbt","bbva","bcg","bcn","bd","be","beats","beauty","beer","bentley","berlin","best","bestbuy","bet","bf","bg","bh","bharti","bi","bible","bid","bike","bing","bingo","bio","biz","bj","black","blackfriday","blanco","blockbuster","blog","bloomberg","blue","bm","bms","bmw","bn","bnl","bnpparibas","bo","boats","boehringer","bofa","bom","bond","boo","book","booking","bosch","bostik","boston","bot","boutique","box","br","bradesco","bridgestone","broadway","broker","brother","brussels","bs","bt","budapest","bugatti","build","builders","business","buy","buzz","bv","bw","by","bz","bzh","ca","cab","cafe","cal","call","calvinklein","cam","camera","camp","cancerresearch","canon","capetown","capital","capitalone","car","caravan","cards","care","career","careers","cars","cartier","casa","case","caseih","cash","casino","cat","catering","catholic","cba","cbn","cbre","cbs","cc","cd","ceb","center","ceo","cern","cf","cfa","cfd","cg","ch","chanel","channel","chase","chat","cheap","chintai","christmas","chrome","chrysler","church","ci","cipriani","circle","cisco","citadel","citi","citic","city","cityeats","ck","cl","claims","cleaning","click","clinic","clinique","clothing","cloud","club","clubmed","cm","cn","co","coach","codes","coffee","college","cologne","com","comcast","commbank","community","company","compare","computer","comsec","condos","construction","consulting","contact","contractors","cooking","cookingchannel","cool","coop","corsica","country","coupon","coupons","courses","cr","credit","creditcard","creditunion","cricket","crown","crs","cruise","cruises","csc","cu","cuisinella","cv","cw","cx","cy","cymru","cyou","cz","dabur","dad","dance","data","date","dating","datsun","day","dclk","dds","de","deal","dealer","deals","degree","delivery","dell","deloitte","delta","democrat","dental","dentist","desi","design","dev","dhl","diamonds","diet","digital","direct","directory","discount","discover","dish","diy","dj","dk","dm","dnp","do","docs","doctor","dodge","dog","doha","domains","dot","download","drive","dtv","dubai","duck","dunlop","duns","dupont","durban","dvag","dvr","dz","earth","eat","ec","eco","edeka","edu","education","ee","eg","email","emerck","energy","engineer","engineering","enterprises","epost","epson","equipment","er","ericsson","erni","es","esq","estate","esurance","et","etisalat","eu","eurovision","eus","events","everbank","exchange","expert","exposed","express","extraspace","fage","fail","fairwinds","faith","family","fan","fans","farm","farmers","fashion","fast","fedex","feedback","ferrari","ferrero","fi","fiat","fidelity","fido","film","final","finance","financial","fire","firestone","firmdale","fish","fishing","fit","fitness","fj","fk","flickr","flights","flir","florist","flowers","fly","fm","fo","foo","food","foodnetwork","football","ford","forex","forsale","forum","foundation","fox","fr","free","fresenius","frl","frogans","frontdoor","frontier","ftr","fujitsu","fujixerox","fun","fund","furniture","futbol","fyi","ga","gal","gallery","gallo","gallup","game","games","gap","garden","gb","gbiz","gd","gdn","ge","gea","gent","genting","george","gf","gg","ggee","gh","gi","gift","gifts","gives","giving","gl","glade","glass","gle","global","globo","gm","gmail","gmbh","gmo","gmx","gn","godaddy","gold","goldpoint","golf","goo","goodhands","goodyear","goog","google","gop","got","gov","gp","gq","gr","grainger","graphics","gratis","green","gripe","grocery","group","gs","gt","gu","guardian","gucci","guge","guide","guitars","guru","gw","gy","hair","hamburg","hangout","haus","hbo","hdfc","hdfcbank","health","healthcare","help","helsinki","here","hermes","hgtv","hiphop","hisamitsu","hitachi","hiv","hk","hkt","hm","hn","hockey","holdings","holiday","homedepot","homegoods","homes","homesense","honda","honeywell","horse","hospital","host","hosting","hot","hoteles","hotels","hotmail","house","how","hr","hsbc","ht","hu","hughes","hyatt","hyundai","ibm","icbc","ice","icu","id","ie","ieee","ifm","ikano","il","im","imamat","imdb","immo","immobilien","in","industries","infiniti","info","ing","ink","institute","insurance","insure","int","intel","international","intuit","investments","io","ipiranga","iq","ir","irish","is","iselect","ismaili","ist","istanbul","it","itau","itv","iveco","iwc","jaguar","java","jcb","jcp","je","jeep","jetzt","jewelry","jio","jlc","jll","jm","jmp","jnj","jo","jobs","joburg","jot","joy","jp","jpmorgan","jprs","juegos","juniper","kaufen","kddi","ke","kerryhotels","kerrylogistics","kerryproperties","kfh","kg","kh","ki","kia","kim","kinder","kindle","kitchen","kiwi","km","kn","koeln","komatsu","kosher","kp","kpmg","kpn","kr","krd","kred","kuokgroup","kw","ky","kyoto","kz","la","lacaixa","ladbrokes","lamborghini","lamer","lancaster","lancia","lancome","land","landrover","lanxess","lasalle","lat","latino","latrobe","law","lawyer","lb","lc","lds","lease","leclerc","lefrak","legal","lego","lexus","lgbt","li","liaison","lidl","life","lifeinsurance","lifestyle","lighting","like","lilly","limited","limo","lincoln","linde","link","lipsy","live","living","lixil","lk","llc","loan","loans","locker","locus","loft","lol","london","lotte","lotto","love","lpl","lplfinancial","lr","ls","lt","ltd","ltda","lu","lundbeck","lupin","luxe","luxury","lv","ly","ma","macys","madrid","maif","maison","makeup","man","management","mango","map","market","marketing","markets","marriott","marshalls","maserati","mattel","mba","mc","mckinsey","md","me","med","media","meet","melbourne","meme","memorial","men","menu","meo","merckmsd","metlife","mg","mh","miami","microsoft","mil","mini","mint","mit","mitsubishi","mk","ml","mlb","mls","mm","mma","mn","mo","mobi","mobile","mobily","moda","moe","moi","mom","monash","money","monster","mopar","mormon","mortgage","moscow","moto","motorcycles","mov","movie","movistar","mp","mq","mr","ms","msd","mt","mtn","mtr","mu","museum","mutual","mv","mw","mx","my","mz","na","nab","nadex","nagoya","name","nationwide","natura","navy","nba","nc","ne","nec","net","netbank","netflix","network","neustar","new","newholland","news","next","nextdirect","nexus","nf","nfl","ng","ngo","nhk","ni","nico","nike","nikon","ninja","nissan","nissay","nl","no","nokia","northwesternmutual","norton","now","nowruz","nowtv","np","nr","nra","nrw","ntt","nu","nyc","nz","obi","observer","off","office","okinawa","olayan","olayangroup","oldnavy","ollo","om","omega","one","ong","onl","online","onyourside","ooo","open","oracle","orange","org","organic","origins","osaka","otsuka","ott","ovh","pa","page","panasonic","panerai","paris","pars","partners","parts","party","passagens","pay","pccw","pe","pet","pf","pfizer","pg","ph","pharmacy","phd","philips","phone","photo","photography","photos","physio","piaget","pics","pictet","pictures","pid","pin","ping","pink","pioneer","pizza","pk","pl","place","play","playstation","plumbing","plus","pm","pn","pnc","pohl","poker","politie","porn","post","pr","pramerica","praxi","press","prime","pro","prod","productions","prof","progressive","promo","properties","property","protection","pru","prudential","ps","pt","pub","pw","pwc","py","qa","qpon","quebec","quest","qvc","racing","radio","raid","re","read","realestate","realtor","realty","recipes","red","redstone","redumbrella","rehab","reise","reisen","reit","reliance","ren","rent","rentals","repair","report","republican","rest","restaurant","review","reviews","rexroth","rich","richardli","ricoh","rightathome","ril","rio","rip","rmit","ro","rocher","rocks","rodeo","rogers","room","rs","rsvp","ru","rugby","ruhr","run","rw","rwe","ryukyu","sa","saarland","safe","safety","sakura","sale","salon","samsclub","samsung","sandvik","sandvikcoromant","sanofi","sap","sapo","sarl","sas","save","saxo","sb","sbi","sbs","sc","sca","scb","schaeffler","schmidt","scholarships","school","schule","schwarz","science","scjohnson","scor","scot","sd","se","search","seat","secure","security","seek","select","sener","services","ses","seven","sew","sex","sexy","sfr","sg","sh","shangrila","sharp","shaw","shell","shia","shiksha","shoes","shop","shopping","shouji","show","showtime","shriram","si","silk","sina","singles","site","sj","sk","ski","skin","sky","skype","sl","sling","sm","smart","smile","sn","sncf","so","soccer","social","softbank","software","sohu","solar","solutions","song","sony","soy","space","spiegel","sport","spot","spreadbetting","sr","srl","srt","st","stada","staples","star","starhub","statebank","statefarm","statoil","stc","stcgroup","stockholm","storage","store","stream","studio","study","style","su","sucks","supplies","supply","support","surf","surgery","suzuki","sv","swatch","swiftcover","swiss","sx","sy","sydney","symantec","systems","sz","tab","taipei","talk","taobao","target","tatamotors","tatar","tattoo","tax","taxi","tc","tci","td","tdk","team","tech","technology","tel","telecity","telefonica","temasek","tennis","teva","tf","tg","th","thd","theater","theatre","tiaa","tickets","tienda","tiffany","tips","tires","tirol","tj","tjmaxx","tjx","tk","tkmaxx","tl","tm","tmall","tn","to","today","tokyo","tools","top","toray","toshiba","total","tours","town","toyota","toys","tr","trade","trading","training","travel","travelchannel","travelers","travelersinsurance","trust","trv","tt","tube","tui","tunes","tushu","tv","tvs","tw","tz","ua","ubank","ubs","uconnect","ug","uk","unicom","university","uno","uol","ups","us","uy","uz","va","vacations","vana","vanguard","vc","ve","vegas","ventures","verisign","versicherung","vet","vg","vi","viajes","video","vig","viking","villas","vin","vip","virgin","visa","vision","vista","vistaprint","viva","vivo","vlaanderen","vn","vodka","volkswagen","volvo","vote","voting","voto","voyage","vu","vuelos","wales","walmart","walter","wang","wanggou","warman","watch","watches","weather","weatherchannel","webcam","weber","website","wed","wedding","weibo","weir","wf","whoswho","wien","wiki","williamhill","win","windows","wine","winners","wme","wolterskluwer","woodside","work","works","world","wow","ws","wtc","wtf","xbox","xerox","xfinity","xihuan","xin","कॉम","セール","佛山","ಭಾರತ","慈善","集团","在线","한국","ଭାରତ","大众汽车","点看","คอม","ভাৰত","ভারত","八卦","موقع","বাংলা","公益","公司","香格里拉","网站","移动","我爱你","москва","қаз","католик","онлайн","сайт","联通","срб","бг","бел","קום","时尚","微博","淡马锡","ファッション","орг","नेट","ストア","삼성","சிங்கப்பூர்","商标","商店","商城","дети","мкд","ею","ポイント","新闻","工行","家電","كوم","中文网","中信","中国","中國","娱乐","谷歌","భారత్","ලංකා","電訊盈科","购物","クラウド","ભારત","通販","भारतम्","भारत","भारोत","网店","संगठन","餐厅","网络","ком","укр","香港","诺基亚","食品","飞利浦","台湾","台灣","手表","手机","мон","الجزائر","عمان","ارامكو","ایران","العليان","اتصالات","امارات","بازار","پاکستان","الاردن","موبايلي","بارت","بھارت","المغرب","ابوظبي","السعودية","ڀارت","كاثوليك","سودان","همراه","عراق","مليسيا","澳門","닷컴","政府","شبكة","بيتك","عرب","გე","机构","组织机构","健康","ไทย","سورية","招聘","рус","рф","珠宝","تونس","大拿","みんな","グーグル","ελ","世界","書籍","ഭാരതം","ਭਾਰਤ","网址","닷넷","コム","天主教","游戏","vermögensberater","vermögensberatung","企业","信息","嘉里大酒店","嘉里","مصر","قطر","广东","இலங்கை","இந்தியா","հայ","新加坡","فلسطين","政务","xperia","xxx","xyz","yachts","yahoo","yamaxun","yandex","ye","yodobashi","yoga","yokohama","you","youtube","yt","yun","za","zappos","zara","zero","zip","zippo","zm","zone","zuerich","zw"];
const protocol = `(?:(?:[a-z]+:)?//)${strict ? '' : '?'}`;
const auth = '(?:\\S+(?::\\S*)?@)?';
const ip = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}';
const host = '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)';
const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
const tld = `(?:\\.${strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`})\\.?`;
const port = '(?::\\d{2,5})?';
const path = '(?:[/?#][^\\s"]*)?';
const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;


const DIFF_AVG_NUM = 20;
const MAX_BOUNTY_BLOCK = new BigNumber(5760);
const BLOCK_A_MONTH = new BigNumber(175200);
const NRC20 = 20;
const UNSUBSCRIBE = 0;
const SUBSCRIBE = 1;
const DEFAULT = 2;
const CURRENCY = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "USD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH", "NAS", "EOS"];

var nrc20Interface = {
    name: function (){},
    symbol: function (){},
    decimals: function (){},
    totalSupply: function (){},
    balanceOf: function (_owner){}
};

var nrcInterface = {
    name: function (){}
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
            this.holderId = new BigNumber(data.holderId);   // read only
            this.vipId = new BigNumber(data.vipId);        // read only
            this.account = data.account;     // read only
            this.tokens = data.tokens;     // read and write
            this.lastBounty = new BigNumber(data.lastBounty);  // var bk_height = new BigNumber(Blockchain.block.height);
            this.bounty = new BigNumber(data.bounty);         // rw // set to vipHolder if bounty is not 0 // set to 0 when balance is less than bounty
            this.difficulty = new BigNumber(data.difficulty);  //rw
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray.push(new BigNumber(data.diffArray[i]));
            }
            this.isVip = data.isVip;       // rw
            this.avatar = data.avatar;     // rw
            this.other = data.other;       // rw
        } else {
            this.holderId = new BigNumber(-1);
            this.vipId = new BigNumber(-1);
            this.account = '0x0';
            this.tokens = {};
            this.lastBounty = new BigNumber(0);
            this.bounty = new BigNumber(0);
            this.difficulty = new BigNumber(0);
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray.push(new BigNumber(0));
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
            this.tokenId = new BigNumber(data.tokenId);    // read only
            this.popularId = new BigNumber(data.popularId);    // read only
            this.address = data.address;         // read only
            this.logo = data.logo;         // read and write (need auth)
            this.price = data.price;       // rw  //for worker
            this.lastBounty = new BigNumber(data.lastBounty);  // rw
            this.bounty = new BigNumber(data.bounty);   // rw  // for cashier
            this.cashier = data.cashier;          //rw  // for auth
            this.difficulty = new BigNumber(data.difficulty); // rw  // for worker
            this.diffArray = [];
            for(var i = 0; i < DIFF_AVG_NUM; i++){
                this.diffArray.push(new BigNumber(data.diffArray[i]));
            }
            this.name = data.name;         // rw
            this.type = data.type;         // ro
            this.symbol = data.symbol;     // rw
            this.decimals = data.decimals;     //ro
            this.totalSupply = data.totalSupply;    // rw
            this.auth = new BigNumber(data.auth);   // rw // deposit NTT to maintain auth and set up a revision threshold
            this.enabled = data.enabled;            // rw  only auth
            this.popular = data.popular;            // rw
            this.popularity = new BigNumber(data.popularity);  // rw //deposit NTT to support the Token
            this.community = data.community;        // rw  // website, email, twitter, facebook, telegram, youtube, github...
            this.other = data.other;                // rw
        } else {
            this.tokenId = new BigNumber(-1);
            this.popularId = new BigNumber(-1);
            this.address = '0x0';
            this.logo = '';
            this.price = {'NAS': 0};
            this.lastBounty = new BigNumber(0);
            this.bounty = new BigNumber(0);
            this.cashier = '0x0';
            this.difficulty = new BigNumber(0);
            this.diffArray = [];
            for(var i = 0; i< DIFF_AVG_NUM; i++){
                this.diffArray.push(new BigNumber(0));
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

var Allowed = function (obj) {
    this.allowed = {};
    this.parse(obj);
};

Allowed.prototype = {
    toString: function () {
        return JSON.stringify(this.allowed);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.allowed[key] = new BigNumber(data[key]);
            }
        }
    },

    get: function (key) {
        return this.allowed[key];
    },

    set: function (key, value) {
        this.allowed[key] = new BigNumber(value);
    }
};

var Auth = function (obj) {
    this.auth = {};
    this.parse(obj);
};

Auth.prototype = {
    toString: function () {
        return JSON.stringify(this.auth);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.auth[key] = new BigNumber(data[key]);
            }
        }
    },

    get: function (key) {
        return this.auth[key];
    },

    set: function (key, value) {
        this.auth[key] = new BigNumber(value);
    }
};

var Popularity = function (obj) {
    this.popularity = {};
    this.parse(obj);
};

Popularity.prototype = {
    toString: function () {
        return JSON.stringify(this.popularity);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.popularity[key] = new BigNumber(data[key]);
            }
        }
    },

    get: function (key) {
        return this.popularity[key];
    },

    set: function (key, value) {
        this.popularity[key] = new BigNumber(value);
    }
};

var NASTokenTicker = function () {
    LocalContractStorage.defineProperties(this, {
        _name: null,
        _symbol: null,
        _decimals: null,
        _admin: null,
        _newAdmin: null,
        _totalSupply: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _holderNum: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _vipHolderNum: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _tokenNum: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _popularTokenNum: {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        _contractCallEnabled:{
            parse: function (value) {
                if(value == 0 || value === 'false' || value == false){
                    return false;
                } else{
                    return true;
                }
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });

    LocalContractStorage.defineMapProperties(this, {
        "balances": {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        },
        "allowed": {
            parse: function (value) {
                return new Allowed(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "auth": {
            parse: function (value) {
                return new Auth(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "popular": {
            parse: function (value) {
                return new Popularity(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "holders": {
            parse: function (value) {
                return new Holder(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "tokens": {
            parse: function (value) {
                return new Token(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "holder": {
            parse: function (value) {
                return value;
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "token": {
            parse: function (value) {
                return value;
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "vipHolder": {
            parse: function (value) {
                return value;
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "popularToken": {
            parse: function (value) {
                return value;
            },
            stringify: function (o) {
                return o.toString();
            }
        },
        "tokenBalances": {
            parse: function (value) {
                return new BigNumber(value);
            },
            stringify: function (o) {
                return o.toString(10);
            }
        }
    });
};

NASTokenTicker.prototype = {
    init: function () {
        this._name = 'NRCTickerToken';
        this._symbol = "NTT";
        this._decimals = 18;
        this._totalSupply = new BigNumber(100000000).mul(new BigNumber(10).pow(this._decimals));

        var from = Blockchain.transaction.from;
        var to = Blockchain.transaction.to;
        this.balances.set(from, this._totalSupply);
        this.transferEvent(true, to, from, this._totalSupply);

        this._contractCallEnabled = false;
        this._admin = from;
        this._newAdmin = '';

        this._holderNum = new BigNumber(0);
        this._tokenNum = new BigNumber(0);
        this._vipHolderNum = new BigNumber(0);
        this._popularTokenNum = new BigNumber(0);
    },

    _min: function(_a, _b){
        return _a.gt(_b)?_b:_a;
    },

    _max: function(_a, _b){
        return _a.gt(_b)?_a:_b;
    },

    submitToken:function(_address, _type){
        var address = _address.trim();
        var type = parseInt(_type);
        if(!Blockchain.verifyAddress(address)){
            throw new Error('Invalid address.');
        }
        var height = new BigNumber(Blockchain.block.height);
        var token = this.tokens.get(address);
        var tokenNum = this._tokenNum;

        if(!(token instanceof Token)){
            token = new Token();
            token.address = address;
            if(type == NRC20) {
                var nrc20Token = new Blockchain.Contract(address, nrc20Interface);
                token.name = nrc20Token.name();
                token.symbol = nrc20Token.symbol();
                token.decimals = parseInt(nrc20Token.decimals());
                token.totalSupply = new BigNumber(nrc20Token.totalSupply());
            } else {
                var nrcToken = new Blockchain.Contract(address, nrcInterface);
                token.name = nrcToken.name();
            }
            token.type = type;
            token.lastBounty = height;
            token.tokenId = tokenNum;
            this.token.put(tokenNum, address);
            this.tokens.put(address, token);
            this._tokenNum = this._tokenNum.plus(new BigNumber(1));
        }
        return token;
    },

    submitTokens: function(_data){
        var data = _data;
        var tokens = [];
        if(typeof data === 'object'){
            for(var i in data){
                var token = this.submitToken(data[i].address, data[i].type);
                tokens.push(token);
            }
        }
        return tokens;
    },

    submitTokenRaw: function(_address, _type, _name, _symbol, _decimals, _totalSupply){
        if(this._contractCallEnabled){
            return this.submitBalance(_address, _type);
        }

        var from = Blockchain.transaction.from;
        if(from != this._admin){
            throw new Error("Permission denied.");
        }

        var address = _address.trim();
        var type = parseInt(_type);
        var name = _name.trim();
        var symbol = '';
        var decimals = 0;
        var totalSupply = 0;
        if(type == NRC20){
            symbol = _symbol.trim();
            decimals = parseInt(_decimals);
            totalSupply = new BigNumber(_totalSupply).mul(new BigNumber(10).pow(18));
        }

        if(!Blockchain.verifyAddress(address)){
            throw new Error('Invalid address.');
        }

        if(name.length > 128){
            throw new Error('Name length too long.')
        }

        if(symbol.length > 32){
            throw new Error('Symbol length too long.')
        }

        if(decimals < 0 || decimals > 20){
            throw new Error('Decimal out of range.')
        }

        var height = new BigNumber(Blockchain.block.height);
        var token = this.tokens.get(address);
        var tokenNum = this._tokenNum;

        if(!(token instanceof Token)){
            token = new Token();
            token.address = address;
            if(type == NRC20) {
                token.name = name;
                token.symbol = symbol;
                token.decimals = decimals;
                token.totalSupply = totalSupply;
            } else {
                token.name = name;
            }
            token.type = type;
            token.lastBounty = height;
            token.tokenId = tokenNum;
            this.token.put(tokenNum, address);
            this.tokens.put(address, token);
            this._tokenNum = this._tokenNum.plus(new BigNumber(1));
        }
        return token;
    },

    submitTokensRaw: function(_data){
        var data = _data;
        var from = Blockchain.transaction.from;
        if(from != this._admin){
            throw new Error("Permission denied.");
        }
        var tokens = [];
        if(typeof data === 'object'){
            for(var i in data){
                var token = this.submitTokenRaw(data[i].address, data[i].type, data[i].name, data[i].symbol, data[i].decimals, data[i].totalSupply);
                tokens.push(token);
            }
        }
        return tokens;
    },

    updateTokenInfo: function(_address){
        if(!this._contractCallEnabled){
            return this.getToken(address);
        }
        var address = _address.trim();
        var token = this.tokens.get(address);
        if(token instanceof Token && token.enabled){
            if(token.type == NRC20) {
                var nrc20Token = new Blockchain.Contract(address, nrc20Interface);
                token.name = nrc20Token.name();
                token.symbol = nrc20Token.symbol();
                token.decimals = parseInt(nrc20Token.decimals());
                token.totalSupply = new BigNumber(nrc20Token.totalSupply());
            } else {
                var nrcToken = new Blockchain.Contract(address, nrcInterface);
                token.name = nrcToken.name();
            }
            this.tokens.set(address, token);
        }
        return token;
    },

    updateTokensInfo: function(_data){
        var data = _data;
        var tokens = [];
        if(typeof data === 'object'){
            for(var i in data){
                var token = this.updateTokenInfo(data[i].address);
                tokens.push(token);
            }
        }
        return tokens;
    },

    updateTokenPrice: function(_address, _price){
        var address = _address.trim();
        var price = _price;

        if(typeof price !== 'object'){
            throw new Error('Invalid price.')
        }

        var height = new BigNumber(Blockchain.block.height);
        var token = this.tokens.get(address);
        if(token instanceof Token){
            var worker = Blockchain.transaction.from;
            var balanceWorker = this.balances.get(worker) || new BigNumber(0);
            var hashRate = balanceWorker.mul(Math.random().toFixed(15)).floor();
            var randomStr = SHA1(SHA1(new BigNumber(1).pow(15).mul(Math.random().toFixed(15)).floor().toString(10)) + SHA1(worker + address));
            Math.random.seed(randomStr);
            var hardness = token.difficulty.mul(1 + (99 * Math.random()).toFixed(15)).div(100).floor();
            if(hashRate.gte(hardness)){
                var sum = new BigNumber(0);
                for(var i = 0; i < DIFF_AVG_NUM; i++){
                    if(i == DIFF_AVG_NUM - 1){
                        token.diffArray[i] = hashRate;
                    } else {
                        token.diffArray[i] = token.diffArray[i + 1];
                    }
                    sum = sum.plus(token.diffArray[i]);
                }
                token.difficulty = sum.div(DIFF_AVG_NUM).floor();
                if(token.bounty.gt(new BigNumber(0))){
                    var blocks = this._min(this._max(height.minus(token.lastBounty), new BigNumber(0)), MAX_BOUNTY_BLOCK);
                    var bounty = this._max(blocks.mul(token.bounty).floor(), new BigNumber(0));
                    var account = token.cashier;
                    var balanceCashier = this.balances.get(account) || new BigNumber(0);
                    if(balanceCashier.gte(bounty)){
                        this.balances.set(account, balanceCashier.minus(bounty));
                        balanceWorker = this.balances.get(worker) || new BigNumber(0);
                        this.balances.set(worker, balanceWorker.plus(bounty));
                        this.transferEvent(true, account, worker, bounty);
                    } else{
                        token.bounty = new BigNumber(0);
                    }
                }
                token.lastBounty = height;
                for(var key in price){
                    if(CURRENCY.includes(key)){
                        var p = parseFloat(price[key]);
                        if(p == p){
                            token.price[key] = p;
                        }
                    }

                }
                this.tokens.put(address, token);
                this.updateTokenInfo(address);
            }
            return token;
        } else {
            if(this._contractCallEnabled){
                this.submitToken(_address, NRC20);
                return this.updateTokenPrice(_address, _price);
            } else {
                throw new Error('No such nrc20 token.')
            }
        }
    },

    updateTokensPrice: function(_data){
        var data = _data;
        var tokens = [];
        if(typeof data === 'object'){
            for(var i in data){
                var token = this.updateTokenPrice(data[i].address, data[i].price);
                tokens.push(token);
            }
        }
        return tokens;
    },

    updateBalance: function(_account){
        var account = _account.trim();
        if(!Blockchain.verifyAddress(account)){
            throw new Error('Invalid holder account.')
        }
        var holder = this.holders.get(account);
        if(!this._contractCallEnabled){
            return this.getHolder(_account);
        }

        if(holder instanceof Holder){
            var tokens = holder.tokens;
            for(var address in tokens){
                var token = this.tokens.get(address);
                if(token instanceof Token && token.enabled){
                    if(token.type == NRC20){
                        var nrc20Token = new Blockchain.Contract(address, nrc20Interface);
                        var balance = new BigNumber(nrc20Token.balanceOf(account));
                        if(balance.gt(new BigNumber(0))){
                            this.tokenBalances.put(SHA1(address + account), balance);
                        }
                    }
                }
            }
        }
        return holder;
    },

    updateBalances: function(_data){
        var data = _data;
        var holders = [];
        if(typeof data === 'object'){
            for(var i in data){
                var holder = this.updateBalance(data[i].account);
                holders.push(holder);
            }
        }
        return holders;
    },

    submitBalance: function(_account, _address){
        var account = _account.trim();
        var address = _address.trim();
        if(!Blockchain.verifyAddress(account) || !Blockchain.verifyAddress(address)){
            throw new Error('Invalid holder account or token address.')
        }

        var height = new BigNumber(Blockchain.block.height);
        var token = this.tokens.get(address);
        var holder = this.holders.get(account) || new Holder();
        if(!this._contractCallEnabled){
            return this.getHolder(account);
        }
        if(token instanceof Token){
            var worker = Blockchain.transaction.from;
            var balanceWorker = this.balances.get(worker) || new BigNumber(0);
            var hashRate = balanceWorker.mul(Math.random().toFixed(15)).floor();
            var randomStr = SHA1(SHA1(new BigNumber(1).pow(15).mul(Math.random().toFixed(15)).floor().toString(10)) + SHA1(worker + account + address));
            Math.random.seed(randomStr);
            var hardness = holder.difficulty.mul(1 + (99 * Math.random()).toFixed(15)).div(100).floor();
            if(hashRate.gte(hardness)){
                var nrc20Token = new Blockchain.Contract(address, nrc20Interface);
                if(holder.account === '0x0'){
                    holder.holderId = this._holderNum;
                    holder.account = account;
                    this.holder.put(this._holderNum, account);
                    this._holderNum = this._holderNum.plus(1);
                }
                if(typeof holder.tokens[address] === 'undefined'){
                    holder.tokens[address] = DEFAULT;
                }
                var sum = new BigNumber(0);
                for(var i = 0; i < DIFF_AVG_NUM; i++){
                    if(i == DIFF_AVG_NUM - 1){
                        holder.diffArray[i] = hashRate;
                    } else {
                        holder.diffArray[i] = holder.diffArray[i + 1];
                    }
                    sum = sum.plus(holder.diffArray[i]);
                }
                holder.difficulty = sum.div(DIFF_AVG_NUM).floor();
                if(holder.bounty.gt(new BigNumber(0)) && holder.isVip){
                    var blocks = this._min(this._max(height.minus(holder.lastBounty), new BigNumber(0)), MAX_BOUNTY_BLOCK);
                    var bounty = this._max(blocks.mul(holder.bounty).floor(), new BigNumber(0));
                    var balanceHolder = this.balances.get(account) || new BigNumber(0);
                    if(balanceHolder.gte(bounty)){
                        this.balances.set(account, balanceHolder.minus(bounty));
                        balanceWorker = this.balances.get(worker) || new BigNumber(0);
                        this.balances.set(worker, balanceWorker.plus(bounty));
                        this.transferEvent(true, account, worker, bounty);
                    } else{
                        holder.bounty = new BigNumber(0);
                        holder.isVip = false;
                    }
                }
                holder.lastBounty = height;
                this.holders.put(account, holder);
                this.updateBalance(account);
            }
            return holder;
        } else {
            if(this._contractCallEnabled){
                this.submitToken(_address, NRC20);
                return this.submitBalance(_account, _address);
            } else {
                throw new Error('No such nrc20 token.')
            }
        }
    },

    submitBalances: function(_data){
        var data = _data;
        var holders = [];
        if(typeof data === 'object'){
            for(var i in data){
                var holder = this.submitBalance(data[i].account, data[i].address);
                holders.push(holder);
            }
        }
        return holders;
    },

    submitBalanceRaw: function(_account, _address, _balance){
        if(this._contractCallEnabled){
            return this.submitBalance(_account, _address);
        }

        var account = _account.trim();
        var address = _address.trim();
        var balance = new BigNumber(_balance);

        if(!Blockchain.verifyAddress(account) || !Blockchain.verifyAddress(address)){
            throw new Error('Invalid holder account or token address.')
        }

        if(balance < 0){
            throw new Error('Invalid balance.')
        }

        var height = new BigNumber(Blockchain.block.height);
        var token = this.tokens.get(address);

        var holder = this.holders.get(account) || new Holder();

        if(token instanceof Token){
            var worker = Blockchain.transaction.from;
            var balanceWorker = this.balances.get(worker) || new BigNumber(0);
            var hashRate = balanceWorker.mul(Math.random().toFixed(15)).floor();
            var randomStr = SHA1(SHA1(new BigNumber(1).pow(15).mul(Math.random().toFixed(15)).floor().toString(10)) + SHA1(worker + account + address));
            Math.random.seed(randomStr);
            var hardness = holder.difficulty.mul((1 + 99 * Math.random()).toFixed(15)).div(100).floor();
            if(hashRate.gte(hardness)){
                if(holder.account === '0x0'){
                    holder.holderId = this._holderNum;
                    holder.account = account;
                    this.holder.put(this._holderNum, account);
                    this._holderNum = this._holderNum.plus(1);
                }
                if(typeof holder.tokens[address] === 'undefined'){
                    holder.tokens[address] = DEFAULT;
                }
                var sum = new BigNumber(0);
                for(var i = 0; i < DIFF_AVG_NUM; i++){
                    if(i == DIFF_AVG_NUM - 1){
                        holder.diffArray[i] = hashRate;
                    } else {
                        holder.diffArray[i] = holder.diffArray[i + 1];
                    }
                    sum = sum.plus(holder.diffArray[i]);
                }
                holder.difficulty = sum.div(DIFF_AVG_NUM).floor();
                if(holder.bounty.gt(new BigNumber(0)) && holder.isVip){
                    var blocks = this._min(this._max(height.minus(holder.lastBounty), new BigNumber(0)), MAX_BOUNTY_BLOCK);
                    var bounty = this._max(blocks.mul(holder.bounty).floor(), new BigNumber(0));
                    var balanceHolder = this.balances.get(account) || new BigNumber(0);
                    if(balanceHolder.gte(bounty)){
                        this.balances.set(account, balanceHolder.minus(bounty));
                        balanceWorker = this.balances.get(worker) || new BigNumber(0);
                        this.balances.set(worker, balanceWorker.plus(bounty));
                        this.transferEvent(true, account, worker, bounty);
                    } else{
                        holder.bounty = new BigNumber(0);
                        holder.isVip = false;
                    }
                }
                holder.lastBounty = height;
                this.holders.put(account, holder);
                this.tokenBalances.put(SHA1(address + account), balance);
            }
            return holder;
        } else {
            if(this._contractCallEnabled){
                this.submitToken(_address, NRC20);
                return this.submitBalance(_account, _address);
            } else {
                throw new Error('No such NRC20 token.')
            }
        }
    },

    submitBalancesRaw: function(_data){
        var data = _data;
        var holders = [];
        if(typeof data === 'object'){
            for(var i in data){
                var holder = this.submitBalanceRaw(data[i].account, data[i].address, data[i].balance);
                holders.push(holder);
            }
        }
        return holders;
    },

    setToken: function(_address, _logo, _enabled, _community, _other){
        var address = _address.trim();
        var logo = _logo.trim();
        var enabled = true;
        if(_enabled == 0 || _enabled === 'false'){
            enabled = false;
        }
        var community = _community;
        var other = _other;
        var from = Blockchain.transaction.from;

        var token = this.tokens.get(address);
        if(!(token instanceof Token)){
            if(this._contractCallEnabled){
                token = this.submitToken(address);
            } else {
                throw new Error("No such NRC token");
            }
        }

        var balanceFrom = this.balances.get(from) || new BigNumber(0);

        if(balanceFrom.gte(token.auth)){
            if(logo.match(regex)){
                token.logo = logo;
            }

            token.enabled = enabled;

            if(typeof community === 'object'){
                for(var key1 in community){
                    token.community[key1] = community[key1];
                }
            }

            if(typeof other === 'object'){
                for(var key2 in other){
                    token.other[key2] = other[key2];
                }
            }
            this.tokens.put(address, token);
            return token;
        } else {
            throw new Error('You are not authorized.')
        }
    },

    setTokenBounty:function(_address, _bountyAMonth){
        var address = _address.trim();
        var bountyAMonth = new BigNumber(_bountyAMonth).mul(new BigNumber(10).pow(18));
        if(bountyAMonth.lt(0)) bountyAMonth = new BigNumber(0);

        var cashier = Blockchain.transaction.from;
        var balanceCashier = this.balances.get(cashier) || new BigNumber(0);

        var token = this.tokens.get(address);
        if(!(token instanceof Token)){
            if(this._contractCallEnabled){
                token = this.submitToken(address);
            } else {
                throw new Error("No such NRC token");
            }
        }

        var holder = this.holders.get(cashier);
        if(!(holder instanceof Holder)){
            this.login();
        }

        if(balanceCashier.gte(token.auth) && balanceCashier.gte(bountyAMonth)){
            token.bounty = bountyAMonth.div(BLOCK_A_MONTH).floor();
            if(token.bounty.eq(new BigNumber(0))){
                token.cashier = '0x0';
            } else{
                token.cashier = cashier;
            }
            this.tokens.put(address, token);
            return token;
        } else {
            throw new Error('You are not authorized.')
        }
    },

    authorize:function(_address, _newAuth){
        var address = _address.trim();
        var newAuth = new BigNumber(_newAuth).mul(new BigNumber(10).pow(18));

        var token = this.tokens.get(address);
        if(!(token instanceof Token)){
            if(this._contractCallEnabled){
                token = this.submitToken(address);
            } else {
                throw new Error("No such NRC token");
            }
        }

        var from = Blockchain.transaction.from;
        var to = Blockchain.transaction.to;

        var oldAuth = new BigNumber(this.authority(from, address));

        if(new BigNumber(0).gt(oldAuth) || newAuth.lt(0)){
            throw new Error("Invalid auth.");
        }

        var balance = this.balances.get(from) || new BigNumber(0);
        if(newAuth.gte(oldAuth)){
            var deposit = newAuth.minus(oldAuth);
            if (deposit.lt(0) || balance.lt(deposit)) {
                throw new Error("Invalid auth.");
            }

            this.balances.set(from, balance.sub(deposit));
            var toBalance = this.balances.get(to) || new BigNumber(0);
            this.balances.set(to, toBalance.add(deposit));
            this.transferEvent(true, from, to, deposit);
            var auth = this.auth.get(from) || new Auth();

            auth.set(address, newAuth);
            this.auth.set(from, auth);
            token.auth = token.auth.plus(deposit);
            this.tokens.put(address, token);
            this.authorizeEvent(true, from, address, newAuth);
        } else {
            var withdraw = oldAuth.minus(newAuth);
            if (withdraw.lt(0) || oldAuth.lt(withdraw) || token.auth.lt(withdraw)) {
                throw new Error("Invalid auth.");
            }

            var auth = this.auth.get(from) || new Auth();
            auth.set(address, newAuth);
            this.auth.set(from, auth);
            token.auth = token.auth.minus(withdraw);
            this.tokens.put(address, token);
            this.authorizeEvent(true, from, address, newAuth);

            this.balances.set(to, balance.sub(withdraw));
            var toBalance = this.balances.get(from) || new BigNumber(0);
            this.balances.set(from, toBalance.add(withdraw));
            this.transferEvent(true, to, from, withdraw);
        }
        return token;
    },

    authority: function (_holder, _address) {
        var auth = this.auth.get(_holder);

        if (auth instanceof Auth) {
            var authToken = auth.get(_address);
            if (typeof authToken != "undefined") {
                return authToken.toString(10);
            }
        }
        return "0";
    },


    popularize:function(_address, _newPopular){
        var address = _address.trim();
        var newPopular = new BigNumber(_newPopular).mul(new BigNumber(10).pow(18));

        var token = this.tokens.get(address);
        if(!(token instanceof Token)){
            if(this._contractCallEnabled){
                token = this.submitToken(address);
            } else {
                throw new Error("No such NRC token");
            }
        }

        var from = Blockchain.transaction.from;
        var to = Blockchain.transaction.to;

        var oldPopular = new BigNumber(this.popularity(from, address));

        if(new BigNumber(0).gt(oldPopular) || newPopular.lt(0)){
            throw new Error("Invalid popular.");
        }

        var balance = this.balances.get(from) || new BigNumber(0);
        if(newPopular.gte(oldPopular)){
            var deposit = newPopular.minus(oldPopular);
            if (deposit.lt(0) || balance.lt(deposit)) {
                throw new Error("Invalid popular.");
            }

            this.balances.set(from, balance.sub(deposit));
            var toBalance = this.balances.get(to) || new BigNumber(0);
            this.balances.set(to, toBalance.add(deposit));
            this.transferEvent(true, from, to, deposit);

            var popular = this.popular.get(from) || new Popularity();
            popular.set(address, newPopular);
            this.popular.set(from, popular);

            token.popularity = token.popularity.plus(deposit);
            if(token.popularity.gte(token.auth) && token.auth.gte(new BigNumber(10).pow(22))){
                token.popular = true;
                if(token.popularId.lt(0)){
                    token.popularId = this._popularTokenNum;
                    this.popularToken.put(this._popularTokenNum, address);
                    this._popularTokenNum = this._popularTokenNum.plus(1);
                }
            } else {
                token.popular = false;
            }
            this.tokens.put(address, token);
            this.popularizeEvent(true, from, address, newPopular);
        } else {
            var withdraw = oldPopular.minus(newPopular);
            if (withdraw.lt(0) || oldPopular.lt(withdraw) || token.popularity.lt(withdraw)) {
                throw new Error("Invalid popular.");
            }

            var popular = this.popular.get(from) || new Popularity();
            popular.set(address, newPopular);
            this.popular.set(from, popular);
            token.popularity = token.popularity.minus(withdraw);
            if(token.popularity.gte(token.auth) && token.auth.gte(new BigNumber(10).pow(22))){
                token.popular = true;
                if(token.popularId.lt(0)){
                    token.popularId = this._popularTokenNum;
                    this.popularToken.put(this._popularTokenNum, address);
                    this._popularTokenNum = this._popularTokenNum.plus(1);
                }
            } else {
                token.popular = false;
            }
            this.tokens.put(address, token);
            this.popularizeEvent(true, from, address, newPopular);

            this.balances.set(to, balance.sub(withdraw));
            var toBalance = this.balances.get(from) || new BigNumber(0);
            this.balances.set(from, toBalance.add(withdraw));
            this.transferEvent(true, to, from, withdraw);
        }
        return token;
    },

    popularity: function (_holder, _address) {
        var popular = this.popular.get(_holder);

        if (popular instanceof Popularity) {
            var popularToken = popular.get(_address);
            if (typeof popularToken != "undefined") {
                return popularToken.toString(10);
            }
        }
        return "0";
    },

    login: function(){
        var from = Blockchain.transaction.from;
        var bkHeight = new BigNumber(Blockchain.block.height);
        var holder = this.holders.get(from);
        if(!(holder instanceof Holder)){
            holder = new Holder();
            holder.account =  from;
            holder.lastBounty = bkHeight;
            holder.holderId = this._holderNum;
            this.holder.set(this._holderNum, from);
            this.holders.set(from, holder);
            this._holderNum = this._holderNum.plus(1);
        }
        return holder;
    },

    setHolder: function(_subscribe, _avatar, _other){
        var subscribe = _subscribe;
        var avatar = _avatar.trim();
        var other = _other;
        var from = Blockchain.transaction.from;
        var holder = this.holders.get(from);

        if(!(holder instanceof Holder)){
            holder = this.login();
        }

        if(holder instanceof Holder){
            if(holder.account === from){
                if(typeof subscribe === 'object'){
                    for(var key1 in subscribe){
                        var token = this.tokens.get(key1);
                        if(token instanceof Token && token.enabled && (parseInt(subscribe[key1]) == UNSUBSCRIBE || parseInt(subscribe[key1]) == SUBSCRIBE || parseInt(subscribe[key1]) == DEFAULT) )
                        holder.tokens[key1] = parseInt(subscribe[key1]);
                    }
                }

                if(avatar.match(regex)){
                    holder.avatar = avatar;
                }
                if(typeof other === 'object'){
                    for(var key2 in other){
                        holder.other[key2] = other[key2];
                    }
                }
                this.holders.put(from, holder);
            }
        }
        return holder;
    },

    setBounty: function(_bountyAMonth){
        var bountyAMonth = new BigNumber(_bountyAMonth).mul(new BigNumber(10).pow(18));
        if(bountyAMonth.lt(0)) bountyAMonth = new BigNumber(0);
        var account = Blockchain.transaction.from;
        var balanceHolder = this.balances.get(account) || new BigNumber(0);
        var holder = this.holders.get(account);
        if(!(holder instanceof Holder)){
            holder = this.login();
        }
        if(balanceHolder.gte(bountyAMonth)){
            holder.bounty = bountyAMonth.div(BLOCK_A_MONTH).floor();
            if(holder.bounty.gt(0)){
                holder.isVip = true;
                if(holder.vipId.lt(0)){
                    holder.vipId = this._vipHolderNum;
                    this.vipHolder.put(this._vipHolderNum, account);
                    this._vipHolderNum = this._vipHolderNum.plus(1);
                }
            } else {
                holder.isVip = false;
            }

            this.holders.put(account, holder);
        }
        return holder;
    },

    // Returns the admin of the contract
    admin: function () {
        return this._admin;
    },

    // Returns the newAdmin of the contract
    newAdmin: function () {
        return this._newAdmin;
    },

    transferAdmin: function (_to) {
        var to = _to.trim();
        var from = Blockchain.transaction.from;
        if(from != this._admin){
            throw new Error("Permission denied.");
        }

        if(to === this._admin){
            throw new Error("Can not transfer to yourself.");
        }

        if(to === '' || Blockchain.verifyAddress(to)){
            if(from === this._admin){
                this._newAdmin = to;
            } else {
                throw new Error("Permission denied.");
            }
        } else {
            throw new Error("Invalid Address!");
        }
    },

    acceptAdmin: function () {
        var from = Blockchain.transaction.from;
        if(from !== this._newAdmin){
            throw new Error("Permission denied.");
        }
        if(this._newAdmin !== '' && from === this._newAdmin){
            this._admin = from;
            this._newAdmin = '';
        } else {
            throw new Error("Permission denied.");
        }
    },

    contractCallEnabled: function(){
        return this._contractCallEnabled;
    },

    setContractCallEnabled: function(_enabled){
        var from = Blockchain.transaction.from;
        if(from === this._admin){
            this._contractCallEnabled = _enabled;
        } else {
            throw new Error("Permission denied.");
        }
    },

    tokenNum: function(){
        return this._tokenNum.toString(10);
    },

    holderNum: function(){
        return this._holderNum.toString(10);
    },

    popularTokenNum: function(){
        return this._popularTokenNum.toString(10);
    },

    vipHolderNum: function(){
        return this._vipHolderNum.toString(10);
    },

    getToken: function(_address){
        var token = this.tokens.get(_address) || new Token();
        return token;
    },

    getTokenByIndex: function(_index){
        var address = this.token.get(_index) || '0x0';
        var token = this.getToken(address);
        return token;
    },

    getTokensByIndexArray: function(_indexArray){
        var indexArray = _indexArray;
        var tokens = [];
        if(typeof indexArray === 'object'){
            for(var i in indexArray){
                var token = this.getTokenByIndex(indexArray[i]);
                tokens.push(token);
            }
        }
        return tokens;
    },

    getTokensByAddressArray: function(_addressArray){
        var addressArray = _addressArray;
        var tokens = [];
        if(typeof addressArray === 'object'){
            for(var i in addressArray){
                var token = this.getToken(addressArray[i]);
                tokens.push(token);
            }
        }
        return tokens;
    },

    getTokens:function(_offset, _limit){
        var limit = parseInt(_limit);
        var offset = parseInt(_offset);
        if(offset < 0) offset = 0;
        var number = offset + limit;
        if(offset >= this._tokenNum || limit <= 0){
            return [];
        }
        if(number > this._tokenNum){
            number = this._tokenNum;
        }
        var result  = [];
        for(var i = offset; i < number; i++){
            var token = this.getTokenByIndex(i);
            result.push(token);
        }
        return result;
    },

    getHolder: function(_account){
        var account = _account.trim();
        var holder = this.holders.get(account) || new Holder();
        var _tokens = holder.tokens;
        var tokens = [];

        for(var address in _tokens){
            if(_tokens[address] === UNSUBSCRIBE){
                continue;
            }
            var token = this.getToken(address);
            var balance = new BigNumber(this.tokenBalances.get(SHA1(address + account)));
            if(_tokens[address] === SUBSCRIBE){
                tokens.push({subscribe: _tokens[address], token: token, balance: balance.toString(10)});
            } else {
                if(balance.gt(0)){
                    tokens.push({subscribe: _tokens[address], token: token, balance: balance.toString(10)});
                }
            }
        }
        holder.tokens = tokens;
        holder.balance = this.balanceOf(account);
        return holder;
    },

    getHolderByIndex: function(_index){
        var account = this.holder.get(_index) || '0x0';
        var holder = this.getHolder(account) || new Holder();
        return holder;
    },

    getHoldersByIndexArray: function(_indexArray){
        var indexArray = _indexArray;
        var holders = [];
        if(typeof indexArray === 'object'){
            for(var i in indexArray){
                var holder = this.getHolderByIndex(indexArray[i]);
                holders.push(holder)
            }
        }
        return holders;
    },

    getHoldersByAccountArray: function(_accountArray){
        var accountArray = _accountArray;
        var holders = [];
        if(typeof accountArray === 'object'){
            for(var i in accountArray){
                var holder = this.getHolder(accountArray[i]);
                holders.push(holder)
            }
        }
        return holders;
    },

    getHolders:function(_offset, _limit){
        var limit = parseInt(_limit);
        var offset = parseInt(_offset);
        if(offset < 0) offset = 0;
        var number = offset + limit;
        if(offset >= this._holderNum || limit <= 0){
            return [];
        }
        if(number > this._holderNum){
            number = this._holderNum;
        }
        var result  = [];
        for(var i = offset; i < number; i++){
            var holder = this.getHolderByIndex(i);
            result.push(holder);
        }
        return result;
    },

    getPopularTokenByIndex: function(_index){
        var address = this.popularToken.get(_index) || '0x0';
        var token = this.getToken(address);
        return token;
    },

    getPopularTokensByIndexArray: function(_indexArray){
        var indexArray = _indexArray;
        var tokens = [];
        if(typeof indexArray === 'object'){
            for(var i in indexArray){
                var token = this.getPopularTokenByIndex(indexArray[i]);
                tokens.push(token);
            }
        }
        return tokens;
    },

    getPopularTokens:function(_offset, _limit){
        var limit = parseInt(_limit);
        var offset = parseInt(_offset);
        if(offset < 0) offset = 0;
        var number = offset + limit;
        if(offset >= this._popularTokenNum || limit <= 0){
            return [];
        }
        if(number > this._popularTokenNum){
            number = this._popularTokenNum;
        }
        var result  = [];
        for(var i = offset; i < number; i++){
            var token = this.getPopularTokenByIndex(i);
            if(!token.popular) continue;
            result.push(token);
        }
        return result;
    },

    getVipHolderByIndex: function(_index){
        var account = this.vipHolder.get(_index) || '0x0';
        var holder = this.getHolder(account);
        return holder;
    },

    getVipHoldersByIndexArray: function(_indexArray){
        var indexArray = _indexArray;
        var holders = [];
        if(typeof indexArray === 'object'){
            for(var i in indexArray){
                var holder = this.getVipHolderByIndex(indexArray[i]);
                holders.push(holder)
            }
        }
        return holders;
    },

    getVipHolders:function(_offset, _limit){
        var limit = parseInt(_limit);
        var offset = parseInt(_offset);
        if(offset < 0) offset = 0;
        var number = offset + limit;
        if(offset >= this._vipHolderNum || limit <= 0){
            return [];
        }
        if(number > this._vipHolderNum){
            number = this._vipHolderNum;
        }
        var result  = [];
        for(var i = offset; i < number; i++){
            var holder = this.getVipHolderByIndex(i);
            if(!holder.isVip) continue;
            result.push(holder);
        }
        return result;
    },

    // Returns the name of the token
    name: function () {
        return this._name;
    },

    // Returns the symbol of the token
    symbol: function () {
        return this._symbol;
    },

    // Returns the number of decimals the token uses
    decimals: function () {
        return this._decimals;
    },

    totalSupply: function () {
        return this._totalSupply.toString(10);
    },

    balanceOf: function (owner) {
        var balance = this.balances.get(owner);

        if (balance instanceof BigNumber) {
            return balance.toString(10);
        } else {
            return "0";
        }
    },

    transfer: function (to, value) {
        value = new BigNumber(value);
        if (value.lt(0)) {
            throw new Error("invalid value.");
        }

        var from = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        if (balance.lt(value)) {
            throw new Error("transfer failed.");
        }

        this.balances.set(from, balance.sub(value));
        var toBalance = this.balances.get(to) || new BigNumber(0);
        this.balances.set(to, toBalance.add(value));

        this.transferEvent(true, from, to, value);
    },

    transferFrom: function (from, to, value) {
        var spender = Blockchain.transaction.from;
        var balance = this.balances.get(from) || new BigNumber(0);

        var allowed = this.allowed.get(from) || new Allowed();
        var allowedValue = allowed.get(spender) || new BigNumber(0);
        value = new BigNumber(value);

        if (value.gte(0) && balance.gte(value) && allowedValue.gte(value)) {

            this.balances.set(from, balance.sub(value));

            // update allowed value
            allowed.set(spender, allowedValue.sub(value));
            this.allowed.set(from, allowed);

            var toBalance = this.balances.get(to) || new BigNumber(0);
            this.balances.set(to, toBalance.add(value));

            this.transferEvent(true, from, to, value);
        } else {
            throw new Error("transfer failed.");
        }
    },

    popularizeEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Popularize: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    authorizeEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Authorize: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    transferEvent: function (status, from, to, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Transfer: {
                from: from,
                to: to,
                value: value
            }
        });
    },

    approve: function (spender, currentValue, value) {
        var from = Blockchain.transaction.from;

        var oldValue = this.allowance(from, spender);
        if (oldValue != currentValue.toString()) {
            throw new Error("current approve value mistake.");
        }

        var balance = new BigNumber(this.balanceOf(from));
        var value = new BigNumber(value);

        if (value.lt(0) || balance.lt(value)) {
            throw new Error("invalid value.");
        }

        var owned = this.allowed.get(from) || new Allowed();
        owned.set(spender, value);

        this.allowed.set(from, owned);

        this.approveEvent(true, from, spender, value);
    },

    approveEvent: function (status, from, spender, value) {
        Event.Trigger(this.name(), {
            Status: status,
            Approve: {
                owner: from,
                spender: spender,
                value: value
            }
        });
    },

    allowance: function (owner, spender) {
        var owned = this.allowed.get(owner);

        if (owned instanceof Allowed) {
            var spender = owned.get(spender);
            if (typeof spender != "undefined") {
                return spender.toString(10);
            }
        }
        return "0";
    }
};

module.exports = NASTokenTicker;