const { signNewToken } = require("./src/services/jwt");
const { setKey, getKey } = require("./src/services/redis");
const { mongoConnection } = require("./src/services/mongo");

console.log("Hello world");

async function test(){
    let payload = {
        "gretting": "hello",
        "subject": "world"
    };

    let token = await signNewToken(payload);

    console.log(token);

    await setKey("testKey", "la cosa");
    console.log(await getKey("testKey"));

    const testCollectio  = mongoConnection.model('cosa', { name: String });

    const laCosa = new testCollectio({ name: 'la cosa' });
    laCosa.save().then(() => console.log('algo'));

}

test();