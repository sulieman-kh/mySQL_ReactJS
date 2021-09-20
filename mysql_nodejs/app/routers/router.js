let express = require('express');
let router = express.Router();
 
const suls = require('../controllers/controller.js');

router.post('/api/sul', suls.createSul);
router.get('/api/sul/:id', suls.getSul);
router.get('/api/suls', suls.suls);
router.put('/api/sul', suls.updateSul);
router.delete('/api/sul/:id', suls.deleteSul);

module.exports = router;