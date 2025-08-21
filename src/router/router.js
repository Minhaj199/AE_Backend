const {Router}=require('express')
const controller = require('../controller/controller')
const auth = require('../middlware/auth')

const router=Router()

router.post('/books',controller.createBook)
router.get('/books',auth,controller.getBooks)
router.post('/books/checkout/:id',auth,controller.checkoutBook)

module.exports={router}