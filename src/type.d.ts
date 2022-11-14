import { UserDTO } from './dtos/userDTO'
import { TableListDTO } from './dtos/tableListDTO'

interface UserState { user: UserDTO }
interface TableState { user: TableDTO }

type tableListStatus = 'available' | 'booked' | 'unavailable' | ''

interface TableListState { tableList?: TableListDTO[] }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

interface LoginProps {
  username: string
  password: string
}
