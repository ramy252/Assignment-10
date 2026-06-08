// import { UserModel } from "../../DB/models/user.model.js";
// import {
//   comparePassword,
//   hashPassword,
// } from "../../utils/encryption.plaintext.js";
// import jwt from "jsonwebtoken";

// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, age, phone } = req.body;
//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const exixtingUser = await UserModel.findOne({ email });
//     if (exixtingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const data = await UserModel.create({
//       name,
//       email,
//       password: hashPassword(password),
//       age,
//       phone,
//     });

//     return res.status(201).json({ message: "User created successfully", data });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     if (!comparePassword(password, user.password)) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     const token = jwt.sign({ id: user._id }, "secret");
//     return res.status(200).json({
//       message: "User logged in successfully",
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getProfile = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({ message: "User found", user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// /**
//  * 3. Updatelogged-inuserinformation(ExceptPassword).(Ifuserwanttoupdatetheemail,checkthenewemail
//  * doesn’t exist before. (Gettheid forthe logged-inuser(userId)fromthetokennot thebody)(sendthetokeninthe
//  * headers) (0.5 Grade)
//  * • URL:PATCH/users
//  */

// export const updateUser = async (req, res) => {
//   try {
//     const { name, email, age, phone } = req.body;

//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = await UserModel.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (email && email !== user.email) {
//       const emailExists = await UserModel.findOne({ email });
//       if (emailExists) {
//         return res.status(409).json({ message: "Email already in use" });
//       }
//       user.email = email;
//     }

//     if (name) user.name = name;
//     if (age) user.age = age;
//     if (phone) user.phone = phone;

//     await user.save();
//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await UserModel.findByIdAndDelete(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
