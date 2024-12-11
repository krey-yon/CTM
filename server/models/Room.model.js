import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true, required: true },
  name: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Room', roomSchema);
