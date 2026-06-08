// import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     const decoded = jwt.verify(authorization, "secret", { expiresIn: "1h" });
//     req.user = decoded;
//     console.log(req.user);
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

