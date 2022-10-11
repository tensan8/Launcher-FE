import { UserDTO } from './dtos/userDTO';

type UserState = { user: UserDTO }

type ActionTemplate<TData> = {
    type: string
    data: TData
}

// type UserDispatch = (args: UserAction) => UserAction