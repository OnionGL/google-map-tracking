import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './Order.css';
import { Layout } from 'antd';
import OrderList from './OrderList';
import Split from 'react-split'
import Map from '../Map/Map';
import { useJsApiLoader } from '@react-google-maps/api';

const { Header, Content } = Layout;
const SideBar = ({ duration, distance, directionResponse, setDirectionsResponse, setDistance, setDuration, libraries }) => {
   return <>
      <Layout>
         <div
            style={{
               background: 'rgba(215, 215, 215)',
               color: 'rgba(1 , 1 , 1 , 0.5)',
               fontSize: '19px',
               borderRight: '3px solid rgba(1 , 1 , 1 , 0.5)',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               textAlign: 'center',
               height: '100vh'
            }}
         >
            Shipment / Discharge
            <OrderList
               duration={duration}
               distance={distance}
               directionResponse={directionResponse}
               setDirectionsResponse={setDirectionsResponse}
               setDistance={setDistance}
               setDuration={setDuration}
               libraries={libraries}
            />
         </div>
      </Layout>
   </>
}
const RightLayout = ({ directionsResponse }) => {
   return (
      <Layout>
         <Header style={{
            height: '100px',
            background: 'rgba(215, 215, 215)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'rgba(1 , 1 , 1 , 0.5)',
            borderBottom: '1px solid rgba(1 , 1 , 1 , 0.5)'
         }}>Order-Tracking</Header>
         <Content style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
         }}>
            <Map directionsResponse={directionsResponse} />
         </Content>
      </Layout>
   )
}
const libraries = ['places'];
export default function Order() {
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyAGUnyiLdneqWhX0SIvB1uDHEqC3NyxUPU",
      libraries
   })
   const [directionsResponse, setDirectionsResponse] = useState(null)
   const [distance, setDistance] = useState('')
   const [duration, setDuration] = useState('')
   return <>
      {isLoaded ?
         <Split minSize={200} gutterSize={5} style={{ display: "flex", height: "100vh", background: 'rgba(1 , 1 , 1 , 0.5)' }} direction="horizontal" className="wrap" sizes={[20, 80]}>
            <div className="split" >
               <SideBar
                  duration={duration}
                  distance={distance}
                  directionResponse={directionsResponse}
                  setDirectionsResponse={setDirectionsResponse}
                  setDistance={setDistance}
                  setDuration={setDuration}
                  libraries={libraries}
               />
            </div>
            <div className="split" >
               <RightLayout directionsResponse={directionsResponse} />
            </div>
         </Split> : null}
   </>
}
