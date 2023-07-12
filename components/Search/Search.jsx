'use client';

import React,{useEffect, useState} from 'react'
import './Search.scss'
import {GrSearch} from 'react-icons/gr'
import Result from './Result';
const Search = () => {
    let [data,setData]=useState({query:"",category:'all'})
    let [searchResult,setSearchResult]=useState([])

    let getSearchResult=async ()=>{
        let response=await fetch('http://localhost:3000/api/search',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const jresponse=await response.json();
        setSearchResult(jresponse.data);
    }

    useEffect(()=>{
        if (data.query.length>=3){
            getSearchResult();
        } 
        else{
            setSearchResult([])
        }
    },[data])

  return (
    <div className='search'>
    <form name='myform' className='searchForm'>
        <div className='searchForm__input'>
            <input type="text" placeholder='Search' onChange={(e)=>{setData({...data,query:e.target.value})}}/>
            <button className='searchForm__btn'><GrSearch size={30}></GrSearch></button>
        </div>
    </form>
    <div className="searchResult">
        {searchResult.map((result)=>{
            return <Result key={result._id} element={result}></Result>
        })}
    </div>
    </div>
  )
}

export default Search