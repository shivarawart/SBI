
import mongoose, { Schema, type Model } from "mongoose";

export interface IMessage {
  _id?: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;

  verifyCode?: string;
  verifyCodeExpiry?: Date;

  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: IMessage[];

  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 5000,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    verifyCode: {
      type: String,
      match: /^\d{6}$/,
      select: false,
    },

    verifyCodeExpiry: {
      type: Date,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },

    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel =
  (mongoose.models.User as Model<IUser> | undefined) ??
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;

