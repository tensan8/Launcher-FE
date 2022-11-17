import { UserDTO } from './dtos/userDTO'
import { TableListDTO } from './dtos/tableListDTO'
import {SnackDTO} from "./dtos/snackDTO";
import {TableDTO} from "./dtos/tableDTO";
import {BookingDTO} from "./dtos/bookingDTO";

interface UserState { user: UserDTO | null }

type tableListStatus = 'available' | 'booked' | 'unavailable' | ''

interface TableListState { tableList?: TableListDTO[] }

interface TableState { user: TableDTO }

interface SnackState { snackList?: SnackDTO[] }

interface SnackOrderState { snackOrder?: SnackOrderResponse[] }

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
