const Minio = require('minio');

minioClient = new Minio.Client({
    endPoint: process.env.BLOB_STORAGE_HOST,
    port: parseInt(process.env.BLOB_STORAGE_PORT),
    useSSL: false,
    accessKey: process.env.BLOB_STORAGE_ACCESS_KEY,
    secretKey: process.env.BLOB_STORAGE_SECRET_KEY
});

async function presignedPost() {
    minioClient.presignedPutObject('sloth', 'hello.txt', 24*60*60, function(err, presignedUrl) {
        if (err) return console.log(err);
        console.log(presignedUrl)
        return presignedUrl;
    })
}

module.exports.presignedPost = presignedPost;