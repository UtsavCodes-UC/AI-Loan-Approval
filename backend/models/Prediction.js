const mongoose = require('mongoose');

const predictionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    input_data: Object,

    prediction: String,
    probability: Number,
    risk_level: String,
    model_used: String,

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Prediction", predictionSchema);