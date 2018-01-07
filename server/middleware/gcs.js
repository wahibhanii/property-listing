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
  if (!req.files) {
    next()
  }
 
  
  arrPromiseUpload = req.files.map(element => {
    return new Promise ((resolve, reject) => {
      let gcsname = `${Date.now()}-${req.headers.decoded._id}-${element.originalname}`
      let file = bucket.file(`/assets/posts/images/${gcsname}`)
      let stream = file.createWriteStream({
        metadata: {
          contentType: element.mimetype
        }
      })
      stream.on('error', (err) => {
        console.log(err)
        element.cloudStorageError = err
        reject(err)
      })
      stream.on('finish', () => {
        element.cloudStorageObject = gcsname
        file.makePublic()
        .then(() => {
          let filename = getimagePostUrl(gcsname)
          resolve(filename)
        })
        .catch(err => {
          reject(err)
        })
      })
      stream.end(element.buffer)
    })
  })
  Promise.all(arrPromiseUpload)
  .then(result => {
    req.files.imagePostUrls = result
    next()
  })
  .catch(err => {
    next(err)
  })
  // let gcsname = `${Date.now()}-${req.headers.decoded._id}-${req.file.originalname}`
  // let file = bucket.file(`/assets/posts/images/${gcsname}`)
  // let stream = file.createWriteStream({
  //   metadata: {
  //     contentType: req.file.mimetype
  //   }
  // })
  // stream.on('error', (err) => {
  //   console.log(err)
  //   req.file.cloudStorageError = err
  //   next(err)
  // })
  // stream.on('finish', () => {
  //   req.file.cloudStorageObject = gcsname
  //   file.makePublic()
  //     .then(() => {
  //       req.file.imagePostUrl = getimagePostUrl(gcsname)
  //       next()
  //     })
  // })
}