import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
    filename : {"type": String, default:'../images/pp.jpg'},
    lastUpdateTime : {"type": Date, default: Date.now} 
})
const Image = mongoose.model('Image', uploadSchema);

export default Image;