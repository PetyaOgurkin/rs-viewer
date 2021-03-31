import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setTime, updateLayers } from '../../redux/timeline/actions';

export default function Timeline() {

    const dispatch = useDispatch();


    const time = useSelector(state => state.timeLine.time)

    const map = useSelector(state => state.map.map)

    const changeTimeHandler = (e) => {

        const currentVal = 100 - e.target.value

        const STEP = 21600000;

        const date = new Date(Date.now() - STEP * 4);

        const stepsFrom0 = Math.floor(date.getHours() / 6)

        const lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), stepsFrom0 * 6, 0, 0, 0)

        const currentDate = new Date(Date.parse(lastDate) - STEP * currentVal);

        const hour = currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours();
        const day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
        const mouth = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();

        dispatch(setTime({ hour, day, mouth, year, position: e.target.value }))

        dispatch(updateLayers({ hour, day, mouth, year, position: e.target.value }, map));
    }


    return (
        <div className="timeline">
            <Form.Control type="range" onInput={changeTimeHandler} value={time.position} />
        </div>
    )
}
