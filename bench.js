const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const hash = require('crypto').createHash;
const createHash = require('create-hash')
const mmh3= require('murmurhash3js');
const mmh3_r=require('murmurhash3js-revisited');
const mmh_native=require('murmurhash-native')
const forge = require('node-forge');

const bytes = str => Buffer.from(str);

const data = 'Delightful remarkably mr on announcing themselves entreaties favourable. About to in so terms voice at. Equal an would is found seems of. The particular friendship one sufficient terminated frequently themselves. It more shed went up is roof if loud case. Delay music in lived noise an. Beyond genius really enough passed is up.';
const scenarios = [
//   { alg: 'md5', digest: 'hex' },
//   { alg: 'md5', digest: 'base64' },
  { alg: 'sha1', digest: 'hex' },
//   { alg: 'sha1', digest: 'base64' },
  { alg: 'sha256', digest: 'hex' }
//   { alg: 'sha256', digest: 'base64' }
];

for (const { alg, digest } of scenarios) {
    suite.add(`${alg}-${digest}`, () => 
       hash(alg).update(data).digest(digest)
    );
  }

// suite.add(`murmurhash3js-x64-128`, ()=> 
//     mmh3.x64.hash128(data)
// )
// suite.add(`murmurhash3js-x86-128`, ()=> 
//     mmh3.x86.hash128(data)
// )

// suite.add(`murmurhash3js-revisted-x86-128`, ()=> 
//     mmh3_r.x86.hash128(bytes(data))
// )

// suite.add(`murmurhash3js-revisted-x64-128`, ()=> 
//     mmh3_r.x64.hash128(bytes(data))
// )

// suite.add(`murmurhash-native-x64-128`,()=>
//     mmh_native.murmurHash128x64(data)
// )

// suite.add(`murmurhash-native-x86-128`,()=>
//     mmh_native.murmurHash128x86(data)
// )

suite.add(`create-hash-sha1-hex`,()=>
    createHash("sha1").update(data).digest("hex")
)

suite.add(`create-hash-sha256-hex`,()=>
    createHash("sha256").update(data).digest("hex")
)

suite.add(`forge-hash-sha256-hex`,()=>
    forge.md.sha256.create().update(data).digest().toHex()
)

suite.add(`forge-hash-sha1-hex`,()=>
    forge.md.sha1.create().update(data).digest().toHex()
)

suite.on('cycle', function(event) {
    console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run();