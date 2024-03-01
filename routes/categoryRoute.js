const express = require('express')

const router = express.Router()

// Routes
//Create category route
router.post('/create-category', createCategoryController)

module.exports = router