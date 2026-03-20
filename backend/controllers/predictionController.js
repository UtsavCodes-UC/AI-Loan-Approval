const axios = require('axios');
const Prediction = require('../models/Prediction.js')

const callFastAPI = async (data) => {
  const MAX_RETRIES = 3;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      console.log(`Attempt ${i + 1} to call FastAPI`);

      const response = await axios.post(
        process.env.FASTAPI_URL,
        data,
        { timeout: 15000 }
      );

      return response;

    } catch (err) {
      console.log(`Attempt ${i + 1} failed`);

      if (i === MAX_RETRIES - 1) {
        throw err;
      }

      const delay = (i + 1) * 5000;
      console.log(`Waiting ${delay / 1000}s before retry...`);

      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

exports.predictLoan = async (req, res) => {
    try {
        const inputData = req.body;
        const response = await callFastAPI(inputData);
        const result = response.data;

        const savedPrediction = await Prediction.create({
            user_id: req.user.id,
            input_data: inputData,
            prediction: result.prediction,
            probability: result.approval_probability,
            risk_level: result.risk_level,
            model_used: result.model_used
        });

        res.json(savedPrediction);
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