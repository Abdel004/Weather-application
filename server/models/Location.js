const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    latitude: { type: Schema.Types.Decimal128, required: true, unique: true, get: getDecimal },
    longitude: { type: Schema.Types.Decimal128, required: true, unique: true, get: getDecimal },
    name: { type: String, required: true, unique: true },
    comments: [{
        userName: { type: String, required: true },
        comment: { type: String, required: true }
    }],
    last_updated: { type: String },
    temp_c: { type: Schema.Types.Decimal128, get: getDecimal },
    wind_kph: { type: Schema.Types.Decimal128, get: getDecimal },
    wind_dir: { type: String },
    humidity: { type: Number },
    precip_mm: { type: Schema.Types.Decimal128, get: getDecimal },
    vis_km: { type: Schema.Types.Decimal128, get: getDecimal }
}, { toJSON: { getters: true } });

function getDecimal(value) {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};


module.exports = mongoose.model("Location", LocationSchema);