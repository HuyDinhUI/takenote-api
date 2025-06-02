import 'dotenv/config'
import mongoose from 'mongoose'
 
export const CONNECT_DB = async () =>{
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
}

