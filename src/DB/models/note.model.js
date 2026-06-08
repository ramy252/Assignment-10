// import mongoose, { Schema } from "mongoose";

// const noteSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       validate: {
//         validator: function (v) {
//           return v.toLowerCase();
//         },
//         message: "Title cannot be empty",
//       },
//     },
//     content: {
//       type: String,
//       required: [true, "Content is required"],
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );


// export const NoteModel = mongoose.model("Note", noteSchema);
