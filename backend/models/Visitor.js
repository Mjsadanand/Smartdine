import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  subscriberId: String, // <-- Add this
  createdAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;