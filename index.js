const { signNewToken } = require("./src/services/jwt");

console.log("Hello world");

async function test(){
    let payload = {
        "gretting": "hello",
        "subject": "world"
    };

    let token = await signNewToken(payload);

    console.log(token);
}

test();