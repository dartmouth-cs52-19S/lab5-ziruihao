import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: {
    first: String,
    last: String,
  },
  imageURL: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

const UserModel = mongoose.model('Post', UserSchema);

export default UserModel;
