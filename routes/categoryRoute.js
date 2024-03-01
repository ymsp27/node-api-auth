const express = require('express')
const { createCategoryController } = require('../controllers/categoryController')

const router = express.Router()

// Routes
//Create category route
router.post('/create-category', createCategoryController)

module.exports = router