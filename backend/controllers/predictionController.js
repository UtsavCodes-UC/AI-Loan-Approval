const axios = require('axios');
const Prediction = require('../models/Prediction.js')

exports.predictLoan = async (req, res) => {
    try {
        const inputData = req.body;

        const response = await axios.post(
            process.env.FASTAPI_URL,
            inputData
        );

        const result = response.data;

        const savedPrediction = await Prediction.create({
            user_id: req.user.id,
            input_data: inputData,
            prediction: result.prediction,
            probability: result.approval_probability,
            risk_level: result.risk_level,
            model_used: result.model_used
        });

        res.json(result);
    }
    catch(error) {
        res.status(500).json({message: "Prediction FAILED!"});
    }
};

exports.getPredictions = async (req, res) => {
  try {

    const predictions = await Prediction.find({
      user_id: req.user.id
    }).sort({ created_at: -1 });

    res.json(predictions);

  } catch (error) {

    res.status(500).json({ message: "Failed to fetch predictions" });

  }
};

exports.deletePrediction = async (req, res) => {
  try {
    const { id } = req.params;

    await Prediction.findOneAndDelete({
      _id: id,
      user_id: req.user.id
    });

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.deleteAllPredictions = async (req, res) => {
  try {

    await Prediction.deleteMany({
      user_id: req.user.id
    });

    res.json({ message: "All history deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete history" });
    console.log(error);
  }
};