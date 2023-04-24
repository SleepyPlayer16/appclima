import React, { useState, useEffect } from 'react';
import './App.css';
import { getAuth, signInAnonymously } from 'firebase/auth';
import messaging from './firebase';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import addNotification from "react-push-notification";

function App() {
  const login = () =>{
    signInAnonymously(getAuth()).then(usuario=> console.log(usuario));
  }
  
  const [data, setData] = useState("");
  const url = 'https://api.openweathermap.org/data/2.5/weather';
  const [cities, setCities] = useState(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'])
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    getApiDataSecond()
  },[])

  const ButtonPush = () => {
    const notificacion = () => {

      const firebaseConfig = {
        apiKey: "AIzaSyAqLGlFXo8ZDULfryB7cCP2TwQsdrdjaN4",
        authDomain: "notifipush-7d34b.firebaseapp.com",
        projectId: "notifipush-7d34b",
        storageBucket: "notifipush-7d34b.appspot.com",
        messagingSenderId: "360603901999",
        appId: "1:360603901999:web:600bf6cb0c43a6814ba6da"
      };

      const fapp = initializeApp(firebaseConfig);
      const messaging = getMessaging(fapp);
        getToken(messaging, {
          vapidKey:
            "BMUrUWVVwwzGZo6np3r3YJcmRW0EqYt6XWLL-SiXmXySPqFtwEP54b0yygnZ314kICOwNeXDHpCFC_gvjxIFgks",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Firebase Token", currentToken);
              onMessage(messaging, (payload) => {
                console.log('Received foreground message', payload);

                const { notification } = payload;
                const notificationTitle = "adsadasdasd"
                const notificationOptions = {
                  title: notificationTitle,
                  body: notification.body,
                  icon: '/firebase-logo.png'
                };
              
                new Notification(notificationTitle, notificationOptions);
              });
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
          });
        

      }
    return(
      <div className="col-12 d-grid gap-1">
          <button onClick={login} type="button" className="btn btn-lg btn-success fw-bold fs-3">Login</button>
          <button onClick={notificacion} type="button" className="btn btn-lg btn-success fw-bold fs-3">Notificacion Push</button>
      </div>
  );
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const getApiDataSecond = async () => {
      const allCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

      const randomCities = shuffle(allCities).slice(0, 5);
      const firstCity = randomCities.shift();

      setCurrentCity(firstCity);
      
      Promise.all(randomCities.map(async city => {
 
        const params = { q: city, appid: 'd112fc29fcb288328f4922ed132f7e30', units: 'metric' };

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
      <div className="container">
        <div className="mainContainer">
          <h1 className="title">Clima en {currentCity}: {cities.length > 0 && cities[0].description}, {cities.length > 0 && cities[0].temperature}°C</h1>
          <ul>
            {cities.length > 0 && cities.map(city => (
              <li className = "item" key={city.city}>
                {city.city}: {city.description}, {city.temperature}°C
              </li>
            ))}
          </ul>
        </div>
        <div className="notifContainer">
          <h1 className="title">Notificaciones Push</h1>
          <ButtonPush/>
        </div>
      </div>
    </div>
  )
}
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
