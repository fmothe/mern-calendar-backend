const mongoose = require("mongoose");


const dbConnection = async () => {


    try{
        await mongoose.connect(process.env.DB_CONNECTION, {
            usenewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB is connected')


    }catch(err){
        console.log(err)
        throw new Error('Error db connection initialize')
    }

}



module.exports= {
    dbConnection
}