const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url).then(()=>console.log(`connected sucesssfully`)
)
}

module.exports = connectDB
