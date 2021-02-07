const calculateResolutions = (startResolutions, resolution_levels) => {
    const resolutions = [];
    for (let i = 0; i < resolution_levels; i++) {
        resolutions.push(startResolutions / 2 ** i);
    }


    return resolutions
}

module.exports = calculateResolutions;