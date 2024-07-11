require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {verifyToken} = require('./utils/verifyToken')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')

const Users = require('./schemas/usersSchema')
const Houses = require('./schemas/houseSchema')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, req.user + '__' + uuid.v4() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.post('/signup', async (req, res) => {
    const {username, password} = req.body
 
    try{
        if(!username || !password){
            return res.status(400).json({message: "Provide all required data"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await Users.create({
            username,
            password: hashedPassword
        })

        const age = 1000 * 60 * 60 * 24 * 7 

        function date(){
            return Date.now() + age
        }
        const expiresIn = date()
        const token = await jwt.sign({userId: createdUser._id}, process.env.JWT_SECRET, {
            expiresIn: age
        })
        res.cookie('token', token, {
            expiresIn,
            httpOnly: true
        })
    

        return res.status(200).json({message: "Successfully registration", ok: true, token, user: {id: createdUser._id, username: createdUser.username}})
    }catch(e){
        console.log(e)
        return res.status(500).json({message: "ERROR", ok: false})
    }
})


router.post('/create-sell-house-offer',  verifyToken, upload.array('images', 5), async (req, res) => {
    const { title, price, address, description, city, totalSize, linkImage, bathroom, bedroom, petPolicy, propertyPolicy } = req.body;
    let arrDest;
  
    try{
        if(req.files.length === 0 && !linkImage){
            return res.status(500).json({message: "SET IMAGE", ok: false})
        }
        if(req.files.length > 0){
            arrDest = req.files.map((v, i) => {
                return `http://localhost:5000/server/uploads/${v.filename}`
            })
        }
        let arrLinks;
        if(linkImage){
            arrLinks = linkImage.split(' ')
        }
        console.log(arrLinks)
        console.log(arrDest)
        const createdHouse = await Houses.create({
            title, price, address, description, bathroom, bedroom, city: city.toLowerCase(), totalSize, petPolicy: petPolicy[0], propertyPolicy: propertyPolicy[0],
            images: arrDest ? arrDest : arrLinks,
            user_id: req.user
        })
    
        res.json({ok: true, createdHouse, message: "Successfully created!"})
    }catch(e){
        console.log(e)
        return res.status(500).json({message: "ERROR", ok: false})
    }
});

router.get('/all-offers?', async (req, res) => {
    const {propertyPolicy, city, minprice, maxprice, petPolicy} = req.query
    try{

        const houses = await Houses.find({
            ...(propertyPolicy && {propertyPolicy}),
            ...(petPolicy && {petPolicy}),
            ...(city && {city}),
            price: {
                $lte: parseInt(maxprice ? maxprice === 'undefined' || undefined ?  '999999999' : maxprice : '999999999'),
                $gte: parseInt(minprice ? minprice === 'undefined' || undefined ?  '0' : minprice : '0')
            }
        }).lean()

        return res.json({ok: true, houses})
    }catch(e){
        console.log(e.message)
        return res.status(500).json({message: "ERROR", ok: false})
    }
})

router.get('/house/:id', async (req, res) => {
    try{
        const house = await Houses.findOne({
            _id: req.params.id
        }).lean()
    
        return res.json({ok: true, house})
    }catch(e){
        console.log(e.message)
        return res.status(500).json({message: "ERROR", ok: false})
    }
})


router.get('/set-favorite/:id', verifyToken, async (req, res) => {
    const id = req.params.id
 
    try{
        if(id){
            const house = await Houses.findOne({
                _id: id
            })
            if(house){

                await Houses.updateOne({_id: id}, {
                    isFavorite: !house.isFavorite
                })
           
                return res.status(201).json({ok: true})
            }
        }

        return res.status(500).json({message: "Provide all necessary data", ok: false})
    }catch(e){
        return res.status(500).json({message: "ERROR", ok: false})
    }
})


module.exports = router