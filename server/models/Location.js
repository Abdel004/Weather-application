const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    latitude: { type: Schema.Types.Decimal128, required: true, unique: true },
    longitude: { type: Schema.Types.Decimal128, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    comments: [{
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        comment: { type: String, required: true }
    }],
    last_updated: {type: String},
    temp_c: { type: Schema.Types.Decimal128 },
    wind_kph: { type: Schema.Types.Decimal128 },
    wind_dir: { type: String },
    humidity: { type: Number },
    precip_mm: { type: Schema.Types.Decimal128 },
    vis_km: { type: Schema.Types.Decimal128 }
});


module.exports = mongoose.model("Location", LocationSchema);