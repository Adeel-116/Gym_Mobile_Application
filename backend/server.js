const express = require("express")
const app = express()
require('dotenv').config();
const {insertData} = require('./Controllers/controller')

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/Signup', async (req, res)=>{
  const {username, email, password} = req.body;
  console.log(username, email, password)
  if(!username || !email || !password){
    return res.status(400).json({message: 'All fields are required'})
  }
  try {
    await insertData({ username, email, password,});
    return res.status(200).json({ message: "Signup data successful!" });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Error inserting data", error: error.message});
  }

})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




