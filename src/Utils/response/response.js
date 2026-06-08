// return res.status().json()
export const response = (res, status = 200, message = "", data = null) => {
  return res.status(status).json({ message:message, data });
};
