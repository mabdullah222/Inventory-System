import mongo from "@/Lib/mongodb";
import { NextResponse } from "next/server";
const ObjectId = require('mongodb').ObjectId;


export async function DELETE(request,{params:{id}}){
    try{
        const objectId = new ObjectId(id);
        const client=mongo()
        const db=client.db('inventory')
        const products=db.collection('product')
        await products.deleteOne({_id:objectId})
        return new NextResponse(JSON.stringify({status:true,message:'SuccessFully Updated the Value'}))
    }
    catch(error){
        console.log(error.message)
        return new NextResponse(JSON.stringify({status:false,message:error.message}))
    }
}