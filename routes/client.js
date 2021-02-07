const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const Tiles = require('../models/Tiles');
const Products = require('../models/Products');
const calculateResolutions = require('../utils/calculateResolutions');
const MapSettings = require('../models/MapSettings');

const router = Router();


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
    res.json(map)
})

router.get('/init', async (req, res) => {
    const map = await MapSettings.find();
    const tiles = await Tiles.find();
    res.json({ mapSettings: map[0], tiles })
})

module.exports = router;