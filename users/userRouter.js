const express = require('express');
const db = require("./userDb")
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
  // do your magic!
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
