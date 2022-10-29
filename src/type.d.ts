import { UserDTO } from './dtos/userDTO'

interface UserState { user: UserDTO }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

// type UserDispatch = (args: UserAction) => UserAction
