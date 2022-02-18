const Text = require('../controllers/text.controller');
const Secret = require('../controllers/secretText.controller');
const User = require('../controllers/user.controller');
module.exports = app =>{
    app.get('/api/text',Text.getText);
    app.get('/api/text/:id',Text.getTextById);
    app.post('/api/text',Text.createText);
    app.delete('/api/text/:id',Text.deleteText);

    app.get('/api/secret',Secret.getSecret);
    app.get('/api/secret/:id',Secret.getSecretById);
    app.post('/api/secret',Secret.createSecret);
    app.delete('/api/secret/:id',Secret.deleteSecret);

    app.get('/api/users',User.getUsers);
    app.get('/api/users/:id',User.getUser);
    app.post('/api/users',User.createUser);
    app.put('/api/users/:id',User.updateUser);
    app.delete('/api/users/:id',User.deleteUser);
};