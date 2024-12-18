const express = require("express")
const app = express()
require('dotenv').config();
const {insertData} = require('./Controllers/controller')

const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

app.post('/Signup', async (req, res)=>{
  const {username, email, password, profilePicture} = req.body;
  console.log( profilePicture, username, email, password)
  if(!username || !email || !password || !profilePicture){
    return res.status(400).json({message: 'All fields are required'})
  }
  try {
    await insertData({ username, email, password, profilePicture});
    return res.status(200).json({ message: "Signup data successful!" });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Error inserting data", error: error.message});
  }

})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




