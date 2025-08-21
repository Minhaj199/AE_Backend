const validateBook = require("../validator")

const books=[]
module.exports={
    createBook:(req,res,next)=>{
        try {
        const bookData=validateBook(req.body)
        console.log(bookData)
        books.push(bookData)
        res.json({success:true,bookData})
        } catch (error) {
          next(error)
        }
    },
    getBooks: (req, res, next) => {
        try {
            let { genre, author, minYear, available, limit, offset } = req.query;

            let result = [...books]
            if (genre) {
                result = result.filter(b => b.genre?.toLowerCase() === genre.toLowerCase())
            }
            if (author) {
                result = result.filter(b => b.author?.toLowerCase() === author.toLowerCase())
            }
            if (minYear) {
                result = result.filter(b => b.publishedYear >= parseInt(minYear))
            }
            if (available === "true") {
                result = result.filter(b => b.stock > 0)
            }
            limit = parseInt(limit) || 10
            offset = parseInt(offset) || 0

            const paginated = result.slice(offset, offset + limit)

            res.json({
                success: true,
                total: result.length,
                limit,
                offset,
                data: paginated
            })
        } catch (error) {
            next(error)
        }
    },
    checkoutBook: (req, res, next) => {
        try {
            const { id } = req.params
            const book = books.find(b => b.id == id)

            if (!book) {
                return res.status(404).json({ success: false, message: "Book not found" })
            }

            if (book.stock <= 0) {
                return res.status(400).json({ success: false, message: "No stock available" })
            }

            book.stock -= 1

            res.json({ success: true, data: book })
        } catch (error) {
            next(error)
        }
    }
}