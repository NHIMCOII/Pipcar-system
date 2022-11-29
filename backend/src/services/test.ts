import { Test } from '../models/test';

const getAllTest = async () => {
  const result = await Test.find();
  return result;
};

const postTest = async (title: string, content: string) => {
  // const testA = Test.build({ title, content });
  // await testA.save();
  const testA = Test.duyanh(21);
  console.log(testA);
};
export default { getAllTest, postTest };
