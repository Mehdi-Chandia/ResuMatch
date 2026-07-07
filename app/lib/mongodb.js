
import mongoose from 'mongoose';

let isConnected=false;

const uri=process.env.MONGODB_URI;

const dbConnection =async ()=>{

    console.log("uri ",uri)
    if (isConnected){
        console.log('MongoDB is connected already');
        return;
    }
  try {
      await mongoose.connect(uri)
      console.log('MongoDB Connected');

      isConnected=true;
  }catch(e){
      console.error(e);
      throw e;
  }
}

export default dbConnection;