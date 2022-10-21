import React, {useEffect, useState} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, MapConsumer } from "react-leaflet";
import L from "leaflet";
import icon from "./constant";

import parkData from "./data/tesla-parks.json";
import './App.css';


function App() {
  const [coord, setPosition] = useState([]);
  
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map);
      }
    });
    return null;
  }
  const removeMarker = (pos) => {
    setPosition((prevCoord) =>
      prevCoord.filter(
(prevCoord) => prevCoord.filter((coord) => coord.lat !== pos.lat && coord.lng !== pos.lng)
        // or (coord) => coord.lat !== pos.lat && coord.lng !== pos.lng 
      )
    );
};
  const [activePark, setActivePark] = React.useState(null);
  
  return (
    <MapContainer center={[47.2186371, -1.5541362]} zoom={12}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    
    
    {parkData.map(park => (
      
      <Marker
        key={park.id}
        position={[park.gps.latitude, park.gps.longitude]}
        onClick={() => {
          setActivePark(park);
        }}
        
      >
      <Popup
        position={[
          park.gps.latitude,
          park.gps.longitude
        ]}
        onClose={() => {
          setActivePark(null);
        }}
      >
        <div>
          <h2>{park.name}</h2>
        </div>
        <div><button onClick={() => removeMarker(park.id)}>Supprimer</button></div>
      </Popup>
      <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng], { icon }).addTo(map);
          });
          return null;
        }}
      </MapConsumer>
      </Marker>
    ))}
    
  </MapContainer>
  );
}

export default App;
