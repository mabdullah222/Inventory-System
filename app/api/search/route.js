import mongo from "@/Lib/mongodb";
const ObjectId = require('mongodb').ObjectId;
import { NextResponse } from "next/server";

export async function POST(request){
    const body=await request.json()
    try{
        const query=body.query
        const category=body.category
        const client=await mongo();
        const db=await client.db('inventory')
        const products=await db.collection('product')
        let data=[]
        data=await products.find({name:{$regex:`.*${query}.*`,$options:'i'}}).toArray()
        return new NextResponse(JSON.stringify({status:true,message:'Success Searching the Data',data}))
    }
    catch(error){
        return new NextResponse(JSON.stringify({status:false,message:'Error Searching the data! Try Again',data:[]}))
    }
}

export async function PUT(request){
    const body=await request.json()
    const objectId = new ObjectId(body.id);
    try{
        const client=await mongo();
        const db=await client.db('inventory')
        const products=await db.collection('product')
        let response=[]
        if (body.inc==1){
            response=await products.updateOne({_id:objectId,quantity:{$gt:0}},{$inc:{quantity:-1}})
        }
        if (body.dec==1){
            response=await products.updateOne({_id:objectId},{$inc:{quantity:1}})
        } 
        if (response.modifiedCount==0){
            throw new Error('No product Found');
        }
        return new NextResponse(JSON.stringify({status:200,message:true}))
    }
    catch(error){
        return new NextResponse(JSON.stringify({status:200,message:false}))
    }
}