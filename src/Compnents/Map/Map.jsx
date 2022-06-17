import React, { useState } from 'react'
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
const center = { lat: 59.7584, lng: 30.2945 }
export default function Map({ directionsResponse }) {
   const [map, setMap] = useState(null)
   return <>
      <div style={{ height: '90vh', width: '100%' }}>
         <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
               zoomControl: false,
               streetViewControl: false,
               mapTypeControl: false,
               fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
         >
            {directionsResponse && (
               <DirectionsRenderer directions={directionsResponse} />
            )}
         </GoogleMap>
      </div>

   </>
}