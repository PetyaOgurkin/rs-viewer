const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const Tiles = require('../models/Tiles');
const Products = require('../models/Products');
const calculateResolutions = require('../utils/calculateResolutions');
const MapSettings = require('../models/MapSettings');

const router = Router();

router.post('/add_tile',
    [
        check('title', 'invalid title').trim().isLength({ min: 3, max: 50 }).exists(),
        check('url', 'invalid url').trim().isURL().exists(),
        check('extents', 'invalid extents').isArray({ min: 4, max: 4 }).exists().custom(arr => {
            for (const e of arr) {
                if (isNaN(+e) || e === null) {
                    console.log('here');
                    return false
                }
            }
            return true
        }),
        check('projection', 'invalid projection').trim().isNumeric().isLength({ min: 4, max: 4 }).exists(),
        check('startResolution', 'invalid startResolution').isNumeric().trim(),
        check('countOfResolutions', 'invalid countOfResolutions').isNumeric().trim()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'invalid data'
                })
            }

            const resolutions = calculateResolutions(+req.body.startResolution, +req.body.countOfResolutions);
            const projection = 'EPSG:' + req.body.projection;
            const { title, url, extents, startResolution, countOfResolutions } = req.body;


            console.log({ title, url, extents, startResolution, countOfResolutions, resolutions });

            const tile = new Tiles({ title, url, startResolution, countOfResolutions, resolutions, projection, extents })
            await tile.save()
            res.json({ message: 'added', data: tile })
        } catch (e) {

        }
    })

router.post('/add_product', async (req, res) => {
    try {

        const { title, description, url, k1, k2, f1, f2 } = req.body;
        const projection = 'EPSG:' + req.body.projection;

        const timeFormat = [[k1, f1], [k2, f2]];
        const product = new Products({ title, description, url, projection, timeFormat })

        await product.save()
        res.json({ message: 'added', product })
    } catch (e) {

    }
})

router.put('/set_map', async (req, res) => {
    try {

        const { tile, zoom, center } = req.body;
        const map = await MapSettings.find();

        if (map.length) {
            await MapSettings.findOneAndUpdate({ tile, zoom, center })
        }
        else {
            const settings = new MapSettings({ tile, zoom, center })
            await settings.save()
        }

        res.json({ message: 'good' })
    } catch (e) {

    }
})

router.put('/edit_product/:id', async (req, res) => {
    try {

        const filter = { _id: req.params.id }
        const projection = 'EPSG:' + req.body.projection;
        const { k1, k2, f1, f2 } = req.body;
        const timeFormat = [[k1, f1], [k2, f2]];

        await Products.findOneAndUpdate(filter, { ...req.body, projection, timeFormat })

        res.json({ message: 'good' })
    } catch (e) {

    }
})

router.put('/edit_tile/:id', async (req, res) => {
    try {

        const filter = { _id: req.params.id }


        const resolutions = calculateResolutions(+req.body.startResolution, +req.body.countOfResolutions);
        const projection = 'EPSG:' + req.body.projection;

        await Tiles.findOneAndUpdate(filter, { ...req.body, resolutions, projection })

        res.json({ message: 'good' })
    } catch (e) {

    }
})

router.delete('/delete_product/:id', async (req, res) => {

    try {
        await Products.findByIdAndRemove(req.params.id)
        res.json({ message: 'good' })
    } catch (e) {

    }
})

router.delete('/delete_tile/:id', async (req, res) => {
    try {
        await Tiles.findByIdAndRemove(req.params.id)
        res.json({ message: 'good' })
    } catch (e) {

    }
})


router.get('/tiles', async (req, res) => {
    const tiles = await Tiles.find();
    res.json(tiles)
})

router.get('/products', async (req, res) => {
    const products = await Products.find();
    res.json(products)
})

router.get('/map', async (req, res) => {
    const map = await MapSettings.find();
    const tiles = await Tiles.find();
    res.json({ map, tiles })
})

module.exports = router;