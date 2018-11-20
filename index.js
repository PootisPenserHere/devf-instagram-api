const { signNewToken } = require("./src/services/jwt");
const { setKey, getKey } = require("./src/services/redis");

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
}

test();