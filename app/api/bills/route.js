import mongo from "@/Lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request){
    const body=await request.json();
    console.log(body)
    try{
        const client=await mongo();
        const db=client.db('inventory')
        const bills=db.collection('bills')

        const data=bills.insertOne(body)
        if (data){
            return new NextResponse(JSON.stringify({status:true}))
        }
    }
    catch(error){
        console.log(error.message)
        return new NextResponse(JSON.stringify({status:false}))
    }
}