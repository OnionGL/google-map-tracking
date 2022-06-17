const GET_ORDER = "GET_CINEMA"
const CLEAR_ORDER = "CLEAR_ORDER"
const CHANGE_ORDER_SHIPMENT = "CHANGE_ORDER_SHIPMENT"
const CHANGE_ORDER_DISCHARGE = "CHANGE_ORDER_DISCHARGE"


const initialState = {
   order: [
      {
         id: 1,
         label: 'Item1',
         product: ["Info about items"],
         shipment: 'Центральный, Санкт-Петербург',
         discharge: 'Петроградский р-н, Санкт-Петербург',
      }, {
         id: 2,
         label: 'Item2',
         product: ["Info about items"],
         shipment: 'Центральный, Санкт-Петербург',
         discharge: 'Планерная ул., 15Б, Санкт-Петербург, 197374',
      }, {
         id: 3,
         label: 'Item3',
         product: ["Info about items"],
         shipment: 'Центральный, Санкт-Петербург',
         discharge: 'Васильевский остров, Санкт-Петербург',

      }, {
         id: 4,
         label: 'Item4',
         product: ["Info about items"],
         shipment: 'Центральный, Санкт-Петербург',
         discharge: 'Адмиралтейский р-н',

      }, {
         id: 5,
         label: 'Item5',
         product: ["Info about items"],
         shipment: 'Центральный, Санкт-Петербург',
         discharge: 'Волковское, Санкт-Петербург',
      },
   ],
}

const OrderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ORDER:
         return {
            ...state,
            order: action.order
         }
      case CLEAR_ORDER:
         return {
            ...state,
            order: state.order.filter(order => {
               return order.id !== action.id
            })
         }
      case CHANGE_ORDER_SHIPMENT:
         return {
            ...state,
            order: state.order.map(item => item.id === action.id ? {
               ...item,
               shipment: action.shipment
            } : item)
         }
      case CHANGE_ORDER_DISCHARGE:
         return {
            ...state,
            order: state.order.map(item => item.id === action.id ? {
               ...item,
               discharge: action.discharge
            } : item)
         }
      default:
         return state;
   }
}
export const getOrder = (order) => ({ type: GET_ORDER, order })
export const clearOrder = (id) => ({ type: CLEAR_ORDER, id })
export const changeOrderShipment = (shipment, id) => ({ type: CHANGE_ORDER_SHIPMENT, shipment, id })
export const changeOrderDischarge = (discharge, id) => ({ type: CHANGE_ORDER_DISCHARGE, discharge, id })

export default OrderReducer;