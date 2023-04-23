import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';
import { ToastContainer, toast } from 'react-toastify'

function App() {

  const [data, setData] = useState("");
  const login = () =>{
    signInAnonymously(getAuth()).then(usuario=> console.log(usuario));
  }
  
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const [cities, setCities] = useState(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'])
  const [currentCity, setCurrentCity] = useState('');
  const activarMensajes = async () => {
    const token = await getToken(messaging, {
      vapidKey:"dkdk"
    }).catch(error => console.log("error al generar el token"));

    if(token) console.log("Este es tu token: "  + token);
    if(!token) console.log("No ay token ajsjdf");
  }

  useEffect(() => {
    getApiDataSecond()
    onMessage(messaging, message=>{
      console.log("Tu mensaje", message);
      toast(message.notification.title);
    });
  },[])


  const getApiData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cities},uk&APPID=d112fc29fcb288328f4922ed132f7e30`
    ).then((response) => response.json());
  
    // update the state
    setData(response);
    console.log(response)
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getApiDataSecond = async () => {
      // List of cities to choose from
      const allCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
      
      // Select 5 random cities from the list
      const randomCities = shuffle(allCities).slice(0, 5);
      const firstCity = randomCities.shift();
    
      // Set the first non-duplicate city in the array as the current city
      setCurrentCity(firstCity);
      
      Promise.all(randomCities.map(async city => {
        // Parameters for the API request
        const params = { q: city, appid: 'd112fc29fcb288328f4922ed132f7e30', units: 'metric' };
        
        // Send the API request using the built-in fetch method
        const response = await fetch(`${url}?${new URLSearchParams(params)}`);
        const data = await response.json();
        return ({
          city: data.name,
          description: data.weather[0].description,
          temperature: data.main.temp
        });
      }))
      .then(weatherData => {
        // Set the weather data and update the state
        setCities(weatherData);
      })
      .catch(error => {
        console.error('Error retrieving weather data:', error);
      });
  }

  return (
    <div>
      <h1>Weather for {currentCity}: {cities.length > 0 && cities[0].description}, {cities.length > 0 && cities[0].temperature}°C</h1>
      <ul>
        {cities.length > 0 && cities.map(city => (
          <li key={city.city}>
            {city.city}: {city.description}, {city.temperature}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
//  return (
//    <div className="app">
//      {data &&
//            <div>
//             {
//               data[0] ? (
//                 <div className="item-container">
//                   Id:{data.id} <div className="textTitle">Nombre:{" " + data.name}</div>
//                   <div className="textTitle">Humedad:{" " + data.main.humidity}</div>
//                   <div className="textTitle">Temperatura:{" " + data.main.temp}</div>
//                   <div className="textTitle">Temperatura máxima:{" " + data.main.temp_max}</div>
//                   <div className="textTitle">Temperatura minima:{" " + data.main.temp_min}</div>
//                 </div>
//               ):
//               <div className="item-containerRegular">
//                   Id:{data.id} <div className="textTitle">Nombre:{" " + data.name}</div>
//                   <div className="textTitle">Humedad:{" " + data.main.humidity}</div>
//                   <div className="textTitle">Temperatura:{" " + data.main.temp}</div>
//                   <div className="textTitle">Temperatura máxima:{" " + data.main.temp_max}</div>
//                   <div className="textTitle">Temperatura minima:{" " + data.main.temp_min}</div>
//                 </div>
//             }

//            </div>           
//           }
//    </div>
//  );
// }

//   return (
//     <div>
//       <h1>Hola mundo</h1>
//       <ToastContainer/>
//       <button onClick={login}>Logearse</button>
//       <button onClick={activarMensajes}>Generar Token</button>
//     </div>
//   )
// }


export default App;
