export default async function saveBill(data){
    let response=await fetch('http://localhost:3000/api/bills',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const jresponse=await response.json()
    if (response.ok && jresponse.status){
        alert('Thanks for Shopping');
    }
    else{
        alert('Error creating the Bill');
        throw new Error('Error Creating the Bill')
    }
} 