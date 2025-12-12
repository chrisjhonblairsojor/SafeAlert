import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    deviceID:{
        type: String,
        required: true,
    },
    isonline: {
        type: Boolean,
        default: false,
    },
    lastUpdate:{
        type: Number,
        required: true,
        default: 0
      },
    FloodWarning:{
        type:Number,
        required: true,
        default: 0

    },
    RainfallIntensity:{
        type:Number,
        required:true,
        default: 0
    },
    Evacuate:{
        type:Number,
        required:true,
        default:0
    }
});

const Device = mongoose.model('Device', DeviceSchema);

export default Device;