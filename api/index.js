const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const Post = require('./models/Post')
const app = express()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')


const salt = bcrypt.genSaltSync(10)
const secret = 'uhfvjhdciuwvkwuidviwdjcvk'

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect('mongodb+srv://blog:bwrEyieiKZXtDVYU@cluster0.8qdtanr.mongodb.net/?retryWrites=true&w=majority')

//endpoint for registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    }
    catch (e) {
        res.status(400).json(e)
    }

})

//endpoint for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username })
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        //user logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json('ok')
        })
    }
    else {
        //user not logged in
        res.status(400).json('Wrong Credentials')
    }
})


// endpoint for verify if user is logged in
// app.get('/profile', (req, res) => {
//     const { token } = req.cookies
//     jwt.verify(token, secret, {}, (err, info) => {
//         if (err) throw err
//         res.json(info)
//     })
// })

//endpoint for posts
app.post('/post', uploadMiddleware.single('files'), async (req, res) => {
    //saving the file in uploads directory
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    //saving post to db
    const { title, summary, content } = req.body
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
    })

    res.json({ postDoc })


})


//endpoint for fetching posts from db

app.get('/post', async (req, res) => {
    res.json(await Post.find()
    .sort({createdAt:-1}))
    
})


app.listen(4000)
