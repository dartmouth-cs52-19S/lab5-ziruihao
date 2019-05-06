import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  content: String,
  tags: [String],
  cover_url: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
