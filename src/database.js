const mongoose = require('mongoose')

let CONNECTION_STRING = 'mongodb+srv://Eirond:ClGYBfpCA6eDd1wX@jopipedia.u33ht.mongodb.net/bolsa-empleo?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('DB Connected!'))
    .catch(error => console.log(error))
