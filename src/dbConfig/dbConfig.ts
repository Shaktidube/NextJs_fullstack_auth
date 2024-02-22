import mongoose from "mongoose";
export  async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connction = mongoose.connection;
        connction.on('connected',()=>{
            console.log("mongoDb connected Successfully");
        });
        connction.on('error',(error)=>{
            console.log("mongoDb connection failed");
            console.log(error);
            process.exit();
        });
    } catch (error) {
        console.log('something goes wrong');
        console.log(error);
        
    }
}