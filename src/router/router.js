const {Router}=require('express')
const controller = require('../controller/controller')

const router=Router()

router.post('/books',controller.createBook)
router.get('/books',controller.getBooks)
router.post('/books/checkout/:id',controller.checkoutBook)

module.exports={router}