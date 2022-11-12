import { UserDTO } from './dtos/userDTO'
import { TableListDTO } from './dtos/tableListDTO'
import {SnackDTO} from "./dtos/snackDTO";

interface UserState { user: UserDTO }

type tableListStatus = 'available' | 'booked' | 'unavailable' | ''

interface TableListState { tableList?: TableListDTO[] }

interface SnackState { snackList?: SnackDTO[] }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

interface LoginProps {
  username: string
  password: string
}
