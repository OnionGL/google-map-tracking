import React, { useRef } from 'react'
import { getOrderSelector } from '../../Redux/order-selector';
import { changeOrderShipment, changeOrderDischarge } from '../../Redux/order-reducer';
import {
   Input,
} from '@chakra-ui/react'
import 'antd/dist/antd.css';
import './Order.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Space } from 'antd';
import { Autocomplete } from '@react-google-maps/api'

export default function OrderList({ setDirectionsResponse, setDistance, setDuration, libraries }) {
   const originRef = useRef()
   const destiantionRef = useRef()
   const order = useSelector(getOrderSelector)
   const dispatch = useDispatch()
   function changeShipment(id) {
      const shipment = document.getElementById(`shipment${id}`).value
      dispatch(changeOrderShipment(shipment, id))
   }
   function changeDischarge(id) {
      const discharge = document.getElementById(`discharge${id}`).value
      dispatch(changeOrderDischarge(discharge, id))
   }
   async function calculateRoute(id) {
      changeShipment(id)
      changeDischarge(id)
      if (order[id - 1].shipment === '' || order[id - 1].discharge === '') {
         return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
         origin: order[id - 1].shipment,
         destination: order[id - 1].discharge,
         // eslint-disable-next-line no-undef
         travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
   }

   function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
   }
   return <>
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         margin: '10px',
      }}>
         {order?.map(orders => (
            <>
               {orders.label}
               <Space direction="vertical" style={{ margin: '5px' }}>
                  <Autocomplete onSelect={(e) => console.log(e)}>
                     <Input
                        type='text'
                        id={`shipment${orders.id}`}
                        defaultValue={orders.shipment}
                     />
                  </Autocomplete>
                  <Autocomplete>
                     <Input
                        type='text'
                        defaultValue={orders.discharge}
                        id={`discharge${orders.id}`}
                     />
                  </Autocomplete>
                  <div>
                     <Button onClick={clearRoute} type="primary">Очистить</Button>
                     <Button style={{ marginLeft: '5px' }} onClick={() => calculateRoute(orders.id)} type="primary">Поиск</Button>
                  </div>
               </Space>
            </>
         ))}
      </div>
   </>
}
