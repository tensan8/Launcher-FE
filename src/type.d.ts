import { UserDTO } from './dtos/userDTO'
import { TableListDTO } from './dtos/tableListDTO'
import {SnackDTO} from "./dtos/snackDTO";
import {BookingDTO} from "./dtos/bookingDTO";
import {OrderListDTO} from './dtos/orderListDTO';
import {BookingDayDTO} from './dtos/bookingdataDTO';

interface UserState { user: UserDTO | null }

type tableListStatus = 'available' | 'booked' | 'occupied' | 'warning' | ''

interface TableListState { tableList?: TableListDTO[] }

interface TableState { user: TableDTO }

interface SnackState { snackList?: SnackDTO[] }

interface BookingListState {bookingList?: BookingDayDTO[]}

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



