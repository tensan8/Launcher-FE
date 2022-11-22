import { UserDTO } from './dtos/userDTO'
import { TableListDTO } from './dtos/tableListDTO'
import {SnackDTO} from "./dtos/snackDTO";
import {BookingDTO} from "./dtos/bookingDTO";
import {OrderListDTO} from './dtos/orderListDTO';

interface UserState { user: UserDTO | null }

type tableListStatus = 'available' | 'booked' | 'unavailable' | ''

interface TableListState { tableList?: TableListDTO[] }

interface SnackState { snackList?: SnackDTO[] }

interface GetSnackOrderState{orderList?:OrderListDTO[]}

interface SnackOrderState { snackOrder?: SnackOrderResponse[]}

interface BookingState { booking?: BookingDTO }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

interface LoginProps {
  username: string
  password: string
}

interface SnackOrderResponse {
  itemId?: SnackDTO
  ownerId?: UserDTO
  quantity?: number
  totalAmount?: number
  snackOrderId?: number
}



