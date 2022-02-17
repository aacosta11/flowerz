const mongoose = require("mongoose");
module.exports = DB => {
    mongoose.connect(`mongodb://localhost/${DB}`,{useNewUrlParser: true,useUnifiedTopology: true}) 
        .then(()=>console.log(`connected to ${DB}`))
        .catch(err=>console.log(`error while connecting to ${DB}`, err))
}