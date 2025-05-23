import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed
  scannedMenus: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      scannedAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model('Customer', customerSchema);