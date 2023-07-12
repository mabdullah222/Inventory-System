import mongo from "@/Lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function POST(request){
    const {query,category}=await request.json()
    try{
        const client=await mongo()
        const db=await client.db('inventory')
        const products=await db.collection('product')
        let data=[]
        if (category==1){
            data=await products.find({name:{$regex:`.*${query}.*`,$options:'i'},exp:{$gt:new Date()},quantity:{$gt:0}}).toArray()
        }
        else if(category==0){
            data=await products.find({name:{$regex:`.*${query}.*`,$options:'i'},exp:{$lt:new Date()}}).toArray()
        }
        else if(category=='*'){
            data=await products.find({name:{$regex:`.*${query}.*`,$options:'i'}}).toArray()
        }
        else{
            data=await products.find({name:{$regex:`.*${query}.*`,$options:'i'},quantity:{$lte:0}}).toArray()
        }
        return new NextResponse(JSON.stringify({status:true,data}))
    }
    catch(error){
        return new NextResponse(JSON.stringify({status:false,message:'Error Loading the Data',data:[]}))
    }
}


export async function PUT(request){
    try{
        const data=await request.json();
        // data cleaning
        data.quantity=parseInt(data.quantity)
        data.price=parseInt(data.price)
        data.mfg=new Date(data.mfg)
        data.exp=new Date(data.exp)

        // connecting to the database
        const client=mongo()
        const db=client.db('inventory')
        const products=db.collection('product')
        let product=await products.insertOne(data)
        return new NextResponse(JSON.stringify({status:true,message:'Product Added Succesfully','data':product}))
    }

    catch(error){
        return new NextResponse(JSON.stringify({status:false,message:'Error occured try Again','data':''}))
    }
}

export async function PATCH(request){
    const body=await request.json()
    const objectId=new ObjectId(body._id)
    try{
        const client=mongo()
        const db=client.db('inventory')
        const products=db.collection('product')
        delete body._id

        body.mfg=new Date(body.mfg)
        body.exp=new Date(body.exp)
        body.quantity=parseInt(body.quantity)
        body.price=parseInt(body.price)
        
        await products.updateOne({_id:objectId},{$set:body})
        return new NextResponse(JSON.stringify({status:true,message:'SuccessFully Updated the Value'}))
    }
    catch(error){
        console.log(error.message)
        return new NextResponse(JSON.stringify({status:false,message:error.message}))
    }
}

