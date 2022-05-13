import React, {useEffect, useState} from 'react';
import Map from "./components/Map";


function App() {

  const [markers, setMarkers] = useState()

  useEffect( () => {
    fetch("/locations/", { method: 'GET' })
    .then(response => response.json())
    .then(data => setMarkers(data.response))
  }, [])

  return (
      <Map markers={markers} />
  );
}

export default App;
