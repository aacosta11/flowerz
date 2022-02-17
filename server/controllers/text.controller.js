const Text = require('../models/text.model');
module.exports = {
    getText: (req, res) => {
        Text.find({})
            .then(text => res.json(text))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    getTextById: (req, res) => {
        Text.findById(req.params.id)
            .then(text => res.json(text))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    createText: (req, res) => {
        Text.create(req.body)
            .then(text => res.json(text))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    deleteText: (req, res) => {
        Text.deleteOne({_id: req.params.id})
            .then(text => res.json(text))
            .catch(err=>res.status(400).json('Error: '+ err));
    }
}