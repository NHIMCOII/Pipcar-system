import { User } from "../models/user";
import { hashPassword } from "../utils/security";
import config from "config";

export const UserSeeder = async function () {
  await User.deleteMany()
    .then(function () {
      console.log("User is Cleared");
    })
    .catch(function (error) {
      console.log(error);
    });
  var data = [
    {
      phone: "0965670347",
      name: "Trần Hiếu",
      password: config.get("default.password"),
      role: "ADMIN",
      status: 1,
    },
  ];

  for (var i = 0; i < data.length; i++) {
    const encryptedPassword = await hashPassword(data[i].password as string);
    await User.create({
      phone: data[i].phone,
      name: data[i].name,
      password: encryptedPassword,
      role: data[i].role,
      status: data[i].status,
    }).catch((error) => {
      console.log(error);
    });
  }

  console.log("User is Seeded");
};
