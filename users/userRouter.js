const express = require('express');
const db = require("./userDb")
const Posts = require("../posts/postDb.js")
const router = express.Router();



router.post('/',validateUser, (req, res) => {
  db.insert(req.body)
  .then(post =>{
    res.status(200).json({post})
  })
  .catch(err =>{
    res.status(500).json({error:"server error"})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
  .then(users =>{
    res.status(200).json(users)
  })
  .catch(err =>{
    res.status(500).json({error:"server error"})
  })
});

router.get('/:id',validateUserId, (req, res) => {
  db.getById(req.params.id)
    .then(user => {
        res.status(200).json(user)
      })
      .catch(err=>{
        res.status(500).json({error: err.message})
      })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const user = db.getById(req.params.id)
  if (!user){
    res.status(404).json({ message:"invalid user id" })
  }
    next()
}

function validateUser(req, res, next) {
  if(!isEmpty(req.body)){
    if(!req.body.name){
      res.status(400).json({message: "missing required name field"})
  }else{
    next()
  }
}else{
    res.status(400).json({message: "missing user data"})
  }
}

function validatePost(req, res, next) {
  if(!isEmpty(req.body)) {
    if(!req.body.text){
      res.status(400).json({message:"missing required text field"})
    }
  }else{
    res.status(400).json
  }
}

module.exports = router;
