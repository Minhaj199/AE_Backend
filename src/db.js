const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017').then(()=>{
    console.log('connected')
})

const schema=new mongoose.Schema({
    title: {type:String ,required:true,unique:true},
  author: {type:String, required:true},
  publishedYear: Number,
  genre: String,
  stock: {type:Number, required:true}

})
const model=mongoose.model('books',schema)
module.exports=model