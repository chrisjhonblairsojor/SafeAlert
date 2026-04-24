
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
     owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
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
    windSpeed:{
        type: Number,
        required: true,
        default: 0
    },
    windLevel:{
        type: Number,
        required: true,
        default: 0
    },
    waveHeight:{
        type: Number,
        required: true,
        default: 0
    },
    humidity:{
        type: Number,
        required: true,
        default: 0
    },
    temperature:{
        type: Number,
        required: true,
        default: 0
    },
    location:{
        type: String,
        default: ""
    }
});

const Device = mongoose.model('Device', DeviceSchema);

export default Device;