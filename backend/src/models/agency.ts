import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface AgencyAttrs {
  phone: string;
  name: string;
  isTransportation?: boolean;
  isDriver?: boolean;
  status?: number;
  hasCar?: number;
  address?: string;
  lat_address?: string;
  long_address?: string;
  rank?: number;
  point?: number;
  lat?: string;
  long?: string;
  updated_gps_time?: number;
  refresh_token?: string;
}

interface AgencyDoc extends mongoose.Document {
  phone: string;
  name: string;
  isTransportation?: boolean;
  isDriver?: boolean;
  status?: number;
  hasCar?: number;
  address?: string;
  lat_address?: string;
  long_address?: string;
  rank?: number;
  point?: number;
  lat?: string;
  long?: string;
  updated_gps_time?: number;
  refresh_token?: string;
}

interface AgencyModel extends mongoose.Model<AgencyDoc> {
  build(attrs: AgencyAttrs): AgencyDoc;
}

const agencySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    status: {
      type: Boolean,
      required: true,
      default: 0,
    },
    hasCar: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat_address: {
      type: String,
      required: true,
    },
    long_address: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    point: {
      type: Number,
      required: true,
      default: 1000,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    updated_gps_time: {
      type: Number,
      required: true,
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

agencySchema.set("versionKey", "version");
agencySchema.plugin(updateIfCurrentPlugin);

agencySchema.statics.build = (attrs: AgencyAttrs) => {
  return new Agency(attrs);
};

const Agency = mongoose.model<AgencyDoc, AgencyModel>("Agency", agencySchema);

export { Agency };
