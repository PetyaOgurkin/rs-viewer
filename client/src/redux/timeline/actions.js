import { SET_TIME, UPDATE_LAYERS } from "./types";

export function setTime(time) {
    return {
        type: SET_TIME,
        payload: { time }
    }
}


export function updateLayers(time, map) {

    map.getLayers().forEach(l => {

        const props = l.getProperties()
        if (props.type === 'IMAGE') {

            const source = l.getSource();

            const params = source.getParams();

            const f1 = timeFormatParser(props.timeFormat[0][1], time);
            const f2 = timeFormatParser(props.timeFormat[1][1], time);


            if (params[props.timeFormat[0][0]] !== f1 || params[props.timeFormat[1][0]] !== f2) {
                source.updateParams({
                    ...params,
                    [props.timeFormat[0][0]]: timeFormatParser(props.timeFormat[0][1], time),
                    [props.timeFormat[1][0]]: timeFormatParser(props.timeFormat[1][1], time)
                })
            }
        }
    })

    return {
        type: UPDATE_LAYERS
    }
}


function timeFormatParser(format, time) {

    return format.split('').map(s => {
        switch (s) {
            case 'Y': return time.year
            case 'm': return time.mouth
            case 'd': return time.day
            case 'h': return time.hour
            case '-': return '-'

            default: return ''
        }
    }).join('');
}