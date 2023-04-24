const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');
const userServices = require('./models/user-services');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const job = req.query['job'];
    try {
        const result = await userServices.getUsers(name, job);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }
});



app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

//use Mongo db to replace below :

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id)
    if (result == undefined || result.length == 0)
        res.status(404).send('Resource not found.').end();
    else{
        let result = deleteUser(id);
        result = {users_list : result};
        res.status(204).end();
        
    }

});

function deleteUser(id){
    users['users_list'] = users['users_list'].filter( (user) => user.id != id );
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   