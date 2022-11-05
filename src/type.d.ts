import { UserDTO } from './dtos/userDTO'

interface UserState { user: UserDTO }

interface ActionTemplate<TData> {
  type: string
  data: TData
}

interface LoginProps {
  username: string
  password: string
}

// type UserDispatch = (args: UserAction) => UserAction
