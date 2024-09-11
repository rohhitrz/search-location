import React, {useState,useEffect} from 'react'

export default function LocationSelector () {
    const[countries,setCountries]=useState([]);
    const[satte,setState]=useState([]);
    const[cities,setCities]=useState([]);
    const[selectedCountry,setSelectedCountry]=useState('');
    const[selectedState,setSelectedState]=useState('');
    const[selectedCity,setSelectedCity]=useState('');


    const fetchCountries= async()=>{
       try{
        const response=await fetch("https://crio-location-selector.onrender.com/countries");
        const data=await response.json();
        setCountries(data);
       }
       catch(error){
         console.error('Error fetching countries:', error);
 }
}

  const fetchStates=async (country)=>{
    try{
    const response= await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
    const data=await response.json();
    setState(data);
    }
    catch(error){
        console.error('Error fetching countries:', error);
}
 }

 const fetchCities= async(country,state)=>{
    try{
        const response=await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        const data=await response.json();
    }
    catch(error){
        console.error('Error fetching countries:', error);

    
    }
 }






  return (
    <div>location</div>
  )
}
