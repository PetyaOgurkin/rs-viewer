import { SET_TIME, UPDATE_LAYERS } from "./types"

const STEP = 21600000;

const date = new Date(Date.now() - STEP * 4);

const stepsFrom0 = Math.floor(date.getHours() / 6)

const lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), stepsFrom0 * 6, 0, 0, 0)


const initialState = {
    time: {
        hour: lastDate.getHours() < 10 ? "0" + lastDate.getHours() : lastDate.getHours(),
        day: lastDate.getDate() < 10 ? "0" + lastDate.getDate() : lastDate.getDate(),
        mouth: (lastDate.getMonth() + 1) < 10 ? "0" + (lastDate.getMonth() + 1) : (lastDate.getMonth() + 1),
        year: lastDate.getFullYear(),
        position: 100
    }
}

export const timeLineReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_TIME:
            return { ...state, ...payload }

        case UPDATE_LAYERS:
            return { ...state }

        default:
            return state
    }
}
