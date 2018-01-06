const Storage = require('@google-cloud/storage')
const bucketName = process.env.CLOUD_BUCKET_NAME
const storage = Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: 'keyFile.json'
})
const bucket = storage.bucket(bucketName)
const getimagePostUrl = (filename) => {
  return `https://storage.googleapis.com/${bucketName}/assets/posts/images/${filename}`
}

module.exports = (req, res, next) => {
  console.log('GCS WITH FILE-----------------')
  if (!req.file) {
    next()
  }
  console.log('GCS WITH FILE...............')
  const gcsname = `${Date.now()}-${req.headers.decoded._id}-${req.file.originalname}`
  const file = bucket.file(`/assets/posts/images/${gcsname}`)
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })
  
  stream.on('error', (err) => {
    console.log(err)
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic()
      .then(() => {
        
        req.file.imagePostUrl = getimagePostUrl(gcsname)
        next()
      })
  })

  stream.end(req.file.buffer)
}