import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: true,
    },
    shortidURL: {
      type: String,
      required: true,
    },
    visithistory: [
      {
        timeStamp: {
          type: Number,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

const URL = mongoose.model('url', UserSchema);

export default URL;
