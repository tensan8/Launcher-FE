import { UserDTO } from './dtos/userDTO'
import {TableDTO} from './dtos/tableDTO'

interface UserState { user: UserDTO }
interface TableState { user: TableDTO }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

interface LoginProps {
  username: string
  password: string
}


// type UserDispatch = (args: UserAction) => UserAction
