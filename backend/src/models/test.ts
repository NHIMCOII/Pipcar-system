import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
//An interface that describes the properties
// that are required to create new Test
interface TestAttrs {
  title: string;
  content: string;
}

//An interface that describes the properties
// that a Test Model has
interface TestModel extends mongoose.Model<TestDoc> {
  build(attrs: TestAttrs): TestDoc;
}

//An interface that descirbes the properties that a Test Document has
interface TestDoc extends mongoose.Document {
  title: string;
  content: string;
}

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
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

testSchema.set('versionKey', 'version');
testSchema.plugin(updateIfCurrentPlugin);
// TestSchema.pre('save', async function (done) {
//   if (this.isModified('password')) {
//     const hashed = await Password.toHash(this.get('password'));
//     this.set('password', hashed);
//   }
//   done();
// }); // cannot use arrow function because the value of this inside the function would be overridden and would be actually instead equal to the context of this entire file as opposed to our Test document (not what we want)

testSchema.statics.build = (attrs: TestAttrs) => {
  return new Test(attrs);
};

const Test = mongoose.model<TestDoc, TestModel>('Test', testSchema);

export { Test };
