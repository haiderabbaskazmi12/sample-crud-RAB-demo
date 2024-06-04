const express = require('express');
const basicAuth = require('basic-auth');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [
    { name: 'user1', pass: 'password1' },
    { name: 'user2', pass: 'password2' }
];

const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !users.find(u => u.name === user.name && u.pass === user.pass)) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }
    next();
};

app.use(auth);

const items = [
    { id: '1', name: 'Item 1', description: 'This is item 1' },
    { id: '2', name: 'Item 2', description: 'This is item 2' },
    { id: '3', name: 'Item 3', description: 'This is item 3' },
    { id: '4', name: 'Item 4', description: 'This is item 4' },
    { id: '5', name: 'Item 5', description: 'This is item 5' },
    { id: '6', name: 'Item 6', description: 'This is item 6' },
    { id: '7', name: 'Item 7', description: 'This is item 7' },
    { id: '8', name: 'Item 8', description: 'This is item 8' },
    { id: '9', name: 'Item 9', description: 'This is item 9' },
    { id: '10', name: 'Item 10', description: 'This is item 10' }
];

// Create
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send(item);
});

// Read all
app.get('/items', (req, res) => {
    res.send(items);
});

// Read by id
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// Update
app.put('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        items[index] = req.body;
        res.send(items[index]);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// Delete
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.send(deletedItem[0]);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
