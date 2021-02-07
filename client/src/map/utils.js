import { START_REOLUTION_EPSG3576 } from "./constans";

export const getResolution = (resolution_levels) => {
    const resolutions = [];
    for (let i = 0; i < resolution_levels; i++) {
        resolutions.push(START_REOLUTION_EPSG3576 / 2 ** i);
    }
    return resolutions
}
