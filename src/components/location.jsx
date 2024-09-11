import React, {useState,useEffect} from 'react'

export default function LocationSelector () {
    const[countries,setCountries]=useState([]);
    const[states,setState]=useState([]);
    const[cities,setCities]=useState([]);
    const[selectedCountry,setSelectedCountry]=useState('');
    const[selectedState,setSelectedState]=useState('');
    const[selectedCity,setSelectedCity]=useState('');

    useEffect(()=>{
        fetchCountries();
    },[]);
   
    useEffect(()=>{
       if(selectedCountry){
        fetchStates(selectedCountry)
       }
    },[selectedCountry]);
    
    useEffect(()=>{
        if(selectedCountry && selectedState){
        fetchCities(selectedCountry,selectedState);
        }
    },[selectedCountry,selectedState]);



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
        console.error('Error fetching States:', error);
}
 }

 const fetchCities= async(country,state)=>{
    try{
        const response=await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
        const data=await response.json();
        setCities(data);
    }
    catch(error){
        console.error('Error fetching Cities:', error);

    
    }
 }

 const handleCountryChange=(e)=>{
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);
    setState([]);

 }

 const handleStateChange=(e)=>{
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCities([]);
 }
 const handleCityChange=(e)=>{
    setSelectedCity(e.target.value);
 }






 return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Select Location</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <p style={{ marginTop: '20px' }}>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};
