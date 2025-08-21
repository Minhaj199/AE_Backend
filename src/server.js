const express=require('express')
const { router } = require('./router/router')
const app=express()
const dotEnv=require('dotenv')
const ValidationError = require('./customError')
dotEnv.config()



app.use(express.json())
app.use('/api',router)



app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: "error",
      message: err.message,
      errors: err.errors, 
    });
  }
  res.status(500).json({
    status: "error",
    message: err.message||"Internal Server Error",
  });
});
