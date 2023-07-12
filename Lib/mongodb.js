import {MongoClient} from "mongodb"

export default function mongo(){
    const uri=process.env.MONGO_URI
    const client=new MongoClient(uri)
    client.connect().then((response)=>{
    }).catch(()=>{
        console.log("Error Connecting to db")
        return false;
    })
    return client;
}