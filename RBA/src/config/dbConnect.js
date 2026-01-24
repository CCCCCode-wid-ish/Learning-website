//
const mongoose = require("mongoose");



const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        //the connection with connection string
        console.log(`Database connected : ${connect.connection.host} ,${connect.connection.name}`)

    } catch (err) {
        console.log(err);
        process.exit(1);//if their is error exit the program
        
    }
}



module.exports = dbConnect;