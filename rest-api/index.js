const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet');
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messeges");
const multer  = require('multer');
const path = require('path');
var cors = require('cors');
const {storage,cloudinary} = require('./cloudinary/index')
const upload = multer({ storage });

const PORT = process.env.PORT || 8800;

dotenv.config()
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{
    console.log("Connected to Database");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,"public/images")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now().toPrecision(9).concat(file.originalname));
//     }
// })

// const upload = multer({storage:storage});
// app.post('/api/upload',upload.single('file'),(req,res)=>{
//     try {
//         return res.status(200).json("file Uploaded Successfully");
//     } catch (error) {
//         console.log(error)
//     }
// })
app.post('/api/upload',upload.single('file'),(req,res)=>{
        try {
            return res.status(200).json(req.file);
        } catch (error) {
            console.log(error)
        }
    })


app.use('/api/users/',userRoutes);
app.use('/api/auth/',authRoutes);
app.use('/api/posts/',postRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.listen(PORT,()=>{
    console.log("BackEnd server is running on port 8800")
})