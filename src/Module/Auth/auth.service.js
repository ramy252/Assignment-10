import { response } from "../../Utils/response/response.js";

export const getUser = async (req, res) => {
  return response(res, 200, "the auth api");
};
