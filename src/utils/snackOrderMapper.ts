import {SnackOrderDTO} from "../dtos/snackOrderDTO";

const SnackOrderMapper = (order: {[key: number]: number}, userId: number): SnackOrderDTO[] => {
    const orderArr: SnackOrderDTO[] = []

    for (const key in order) {
        if(order[key] !== 0) {
            orderArr.push({
                itemId: Number(key),
                ownerId: userId,
                quantity: order[key]
            })
        }
    }

    return orderArr
}

export default SnackOrderMapper