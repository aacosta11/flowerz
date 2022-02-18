const Secret = require('../models/secretText.model');
module.exports = {
    getSecret: (req, res) => {
        Secret.find({})
            .then(secret => res.json(secret))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    getSecretById: (req, res) => {
        Secret.findById(req.params.id)
            .then(secret => res.json(secret))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    createSecret: (req, res) => {
        Secret.create(req.body)
            .then(secret => res.json(secret))
            .catch(err=>res.status(400).json('Error: '+ err));
    },
    deleteSecret: (req, res) => {
        Secret.deleteOne({_id: req.params.id})
            .then(secret => res.json(secret))
            .catch(err=>res.status(400).json('Error: '+ err));
    }
}