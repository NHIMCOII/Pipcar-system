import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import config from 'config'

interface UserAttrs {
  phone: string;
  name: string;
  password: string;
  role: string;
  status?: number;
  refresh_token?: string;
}

interface UserDoc extends mongoose.Document {
  phone: string;
  name: string;
  password: string;
  role: string;
  status: number;
  refresh_token: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  duyanh(age: number): string;
}

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "Partner Manager", "Analyst"],
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    refresh_token: String
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.statics.duyanh = (age: number) => {
  const message = "Duy Anh năm nay " + age + " tuổi.";
  return message;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
