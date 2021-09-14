import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    task: {
        type: String,
        require: true,
        trim: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});

export default mongoose.model('Tasks', TaskSchema)