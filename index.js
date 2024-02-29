const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const authRoute = require('./routes/authRoute')

// Configure env
dotenv.config()

//db connection
connectDB()

// Port
const PORT = process.env.PORT || 5000

// App config
const app = express()

// Body Parser
app.use(express.json())

/*--------------------API Calls----------------*/
app.get('/', (req,res) => {
    res.send({message : 'API Testing'})
})

// Routes
app.use('/api/v1/auth',authRoute)
/*--------------------API Calls //----------------*/

app.listen(PORT, () => console.log(`Server running on port${PORT}`.bgBlack.white))