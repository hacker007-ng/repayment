const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String]
});

const User = mongoose.model('test', UserSchema, 'test');

mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(err);
});

app.get('/api/display', (req, res) => {
    res.send('Welcome to MongoDb');
});

app.get('/api/display/:id', async(req, res) => {
    try{
        const id  = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({
            message: "recieve",
            Data: user
        });
    } catch(err) {
        console.log(err);
    }
});

app.post('/api/display/add', async (req, res) => {
    try {
        const user = await new User(req.body);
        user.save();
        res.status(201).json({
            message: user
        });
    } catch (err) {
        console.log(err);
    }
});


app.put('/api/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, {new: true,});
        if (user){
            return res.status(201).json({
                message: 'success',
                Data : user
            })
        }
    } catch(err) {
        console.log(err);
    }
});

app.delete('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(201).json({
                message: user
            })
        }
    } catch (err) {
        console.log(err);
    }
 
    return res.status(200).json({
        message: 'success '
    })
});

app.listen(4000, () => {
    console.log("Connected to Server");
});