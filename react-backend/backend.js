const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined){
        let resultN = findUserByName(name);
        resultN = {users_list: resultN}
        if (job != undefined){
            let resultJ = findUserByJob(job);
            resultJ = {users_list: resultJ};
            let result = resultN['users_list'].filter( (user) => resultJ['users_list'].includes(user));
            result = {users_list: result};
            res.send(result);
        }
        else{
            res.send(resultN);
        }
        
    }
    else if (job != undefined) {
        result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});



const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => {
    return users['users_list'].filter( ((user) => user['job'] === job));
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.').end();
    else {
        result = {users_list: result};
        res.send(result).end();
    }
});


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => { 
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});


function addUser(user){
    if (user['id'] == undefined){
       let temp_id = String(users["users_list"].length);
           
          let check_id = findUserById(temp_id);
           if (check_id == undefined || check_id.length == 0)
               user.id = temp_id;
    }
    users['users_list'].push(user);
}

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