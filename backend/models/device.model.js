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
    isRaining:{
        type:Boolean,
        required: true,
        default: false
    },
    rainfallIntensity:{
        type:Number,
        required:true,
        default: 0
    },
    floodLevel:{
        type:Number,
        required:true,
        default:0
    },
    location:{
        type: String,
        required: true,
        default: ""
    }
});

const Device = mongoose.model('Device', DeviceSchema);

export default Device;