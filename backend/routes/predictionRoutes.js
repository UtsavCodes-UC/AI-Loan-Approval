const express = require('express');
const router = express.Router();

const { predictLoan, getPredictions, deletePrediction, deleteAllPredictions } = require('../controllers/predictionController.js')

const auth = require('../middlewares/authMiddleware.js');

router.post('/', auth, predictLoan);
router.get("/history", auth, getPredictions);
router.delete('/all', auth, deleteAllPredictions);
router.delete('/:id', auth, deletePrediction);
module.exports = router;