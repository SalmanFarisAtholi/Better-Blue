const mongoose = require('mongoose');


const connectDb = async (DATABASE_URL) => {
    
mongoose.set("strictQuery", false);
    try{
        const DB_OPTIONS ={dbName:'betterbluefc'}
        await mongoose.connect(DATABASE_URL,DB_OPTIONS )
        console.log('Database Connected..');
    }catch(error){

        console.log(error);
    }
}
module.exports = connectDb; 