const User = require('../models/user.model');
module.exports = {
    // GET /api/users
    getUsers: (req, res) => {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },
    // GET /api/users/:id
    getUser: (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // GET /api/users/:name
    getUserByName: (req, res) => {
        User.findOne({ username: req.params.name })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // POST /api/users
    createUser: (req, res) => {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // PUT /api/users/:id
    updateUser: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    // DELETE /api/users/:id
    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    }
}