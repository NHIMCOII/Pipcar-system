import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface RegisterAttrs {
  phone: string;
  name: string;
  code: string;
  status?: number;
  isAgency?: boolean;
  isTransportation?: boolean;
  isDriver?: boolean;
  refresh_token?: string;
}

interface RegisterDoc extends mongoose.Document {
  phone: string;
  name: string;
  code: string;
  status?: number;
  isAgency?: boolean;
  isTransportation?: boolean;
  isDriver?: boolean;
  refresh_token?: string;
}

interface RegisterModel extends mongoose.Model<RegisterDoc> {
  build(attrs: RegisterAttrs): RegisterDoc;
}

const registerSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      min: 6,
    },
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    isAgency: {
      type: Boolean,
      require: true,
      default: 1,
    },
    isTransportation: {
      type: Boolean,
      require: true,
      default: 0,
    },
    isDriver: {
      type: Boolean,
      require: true,
      default: 0,
    },
    refresh_token: {
      type: String,
      default: "EMPTY",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.refresh_token;
      },
    },
  }
);

registerSchema.set("versionKey", "version");
registerSchema.plugin(updateIfCurrentPlugin);

registerSchema.statics.build = (attrs: RegisterAttrs) => {
  return new Register(attrs);
};

const Register = mongoose.model<RegisterDoc, RegisterModel>(
  "Register",
  registerSchema
);

export { Register };
