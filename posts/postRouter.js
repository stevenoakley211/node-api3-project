const express = require('express');
const db = require("./postDb")
const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(post =>{
      res.status(200).json(post)
    })
    .catch(
      err => res.status(500).json(err)
    )
  // do your magic!
});

router.get('/:id',validatePostId, (req, res) => {
  db.getById(req.params.id)
    .then(
      post => res.status(200).json(post)
    )
    .catch(
      err => res.status(500).json(err)
    )
  // do your magic!
});

router.delete('/:id', validatePostId,
  (req, res) => {
  const {id} = req.params;
    db.remove(id)
      .then(post =>{
        if(post){
          res.status(200).json(post)
        }
        else{
          res.status(404).json({error:"could not find post"})
        }}
        
    )
    .catch(
      err => res.status(500).json(err)
    )
  // do your magic!
});

router.put('/:id', (req, res) => {
  db.update(req.params.id,req.body.text)
    .then(post =>{
      res.status(200).json({message:"post updated"})
    })
    .catch(
      err => res.status(500).json({message:"server error"})
    )
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const {id} = req.params
  db.getById(id)
  .then(post=>{
    if(post){
      req.post = post;
      return next()
    }
    res.status(400).json(
        { message:"invalid post id" }
      )
  })
  .catch(res=>{
    res.status(500).json(
        { message:"server error" }
      )
  }
    
  )
//   const Id = db.getById(req.params.id)
//   if(Id){
    
//     return next()
//   }
//   else {
//     return res.status(404).json({message:"Post not found"})
//   }
 }

module.exports = router;
