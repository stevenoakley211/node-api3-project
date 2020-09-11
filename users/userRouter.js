const express = require('express');
const user = require('./userDb')
const router = express.Router();

router.post('/',validateUser, (req, res) => {
  user.insert(req.body)
    .then(post => {
      res.status(200).json({post})
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  let post = {
    text : req.body.text,
    user_id: req.params.id
  }
  user.insert(post)
    .then(userPost =>{
      res.status(200).json(userPost)
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

router.get('/', (req, res) => {
  user.get()
  .then(users =>{
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(
        { error: err, message: err.message }
      )
  })
});

router.get('/:id',validateUserId, (req, res) => {
  user.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  user.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  user.remove(req.params.id)
    .then(usersList =>{
      res.status(200).json(usersList)
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

router.put('/:id', (req, res) => {
  user.update(req.params.id , req.body)
    .then(updatedUser =>{
      res.status(200).json(updatedUser)
    })
    .catch(err => {
      res.status(500).json(
          { error: err, message: err.message }
        )
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const user = user.getById(req.params.id)
  if(!user){
    res.status(404).json({message: "Invalid user Id"})
  }
  else{
    next();
  }
}

function validateUser(req, res, next) {
  if(!req.body.name){
    res.status(404).json({message:"Missing user data"})
  }
  else {
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body.text || !req.body.user_id){
    res.status(404).json({message: "Missing post data"})
  }
}

module.exports = router;
