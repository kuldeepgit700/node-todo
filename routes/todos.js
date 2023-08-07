const express = require('express');

const router = express.Router();


router.get('/gettodos', (req, res, next)=>{
   res.status(200).json({"todo":"first todos"});
});



module.exports = router;