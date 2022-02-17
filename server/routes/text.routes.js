const Text = require('../controllers/text.controller');
module.exports = app =>{
    app.get('/api/text',Text.getText);
    app.get('/api/text/:id',Text.getTextById);
    app.post('/api/text',Text.createText);
    app.delete('/api/text/:id',Text.deleteText);
};