import mongoose, { Schema } from "mongoose";
import { GenderEnum, RoleEnum, ProviderEnum } from "../../Utils/enums/user.enum.js";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === ProviderEnum.SYSTEM;
      },
    },
    phone: {
      type: String,
      required: function () {
        return this.provider === ProviderEnum.SYSTEM;
      },
    },
    DOB: Date,
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.MALE,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
    provider: {
      type: Number,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.SYSTEM,
    },
    confirmedEmail: Date,
    profilePic: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("userName").set(function(values){
const [firstName, lastName] = values.split(" ")||[];
this.set({firstName, lastName});
}).get(function(){
  return `${this.firstName} ${this.lastName}`;
});



const UserModel = mongoose.model("User", userSchema);
export default UserModel;

