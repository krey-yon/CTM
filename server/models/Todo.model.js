import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  task: { type: String },
  isDone: { type: Boolean, default: false },
  owner : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roomId: String,
}, { timestamps: true }
);

export default mongoose.model('Todo', userSchema);