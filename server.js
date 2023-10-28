 const express = require('express');
 const cors = require('cors');
 const  connectDB  = require('./config/db');
 const authRoutes = require('./routes/authRoute')
 const categoryRoutes = require('./routes/CategoryRoutes')
const productRoutes = require("./routes/ProductRoutes")
 const productTypeRoutes = require("./routes/productTypesRoute")
 const MailRoutes = require("./routes/MailRoutes")
 const path = require('path');

const app = express();

// env config
const dotenv = require('dotenv');



dotenv.config();

// connect db
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/product-type", productTypeRoutes );
app.use('/api/v1/mails', MailRoutes)

// rest api
app.use('*',function(req,res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})


// port
const port = process.env.Port;
// running server
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})
 
