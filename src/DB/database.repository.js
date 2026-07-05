export const findOne = async ({
  model,
  filter = {},
  select = "",
  options = {},
} = {}) => {
  const doc = model.findOne(filter);
  if (select)  doc.select(select);
  if (options.lean) doc.lean();
  if (options.populate) doc.populate(options.populate);
  return await doc.exec();
};
export const findAll = async ({
  model,
  filter = {},
  select = "",
  options = {},
} = {}) => {
  const doc = model.find(filter);
  if (select) doc.select(select);
  if (options.lean) doc.lean();
  if (options.populate) doc.populate(options.populate);
  return await doc.exec();
};
export const findById = async ({
  model,
  id,
  select = "",
  options = {},
} = {}) => {
  const doc = model.findById(id);
  if (select) doc.select(select);
  if (options.lean) doc.lean();
  if (options.populate) doc.populate(options.populate);
  return await doc.exec();
};
export const find = async ({
  model,
  filter = {},
  select = "",
  options = {},
} = {}) => {
  const doc = model.find(filter);
  if (select.length) doc.select(select);
  if (options.lean) doc.lean();
  if (options.populate) doc.populate(options.populate);
  if (options.sort) doc.sort(options.sort);
  if (options.skip) doc.skip(options.skip);
  if (options.limit) doc.limit(options.limit);
  return await doc.exec();
};
export const create = async ({
  model,
  data,
  options = { validateBeforeSave: true },
} = {}) => {
  const doc = model.create(data);
  if (options.lean) doc.lean();
  if (options.populate) doc.populate(options.populate);
  return await doc.exec();
};
export const insertMany = async ({ model, data } = {}) => {
  return await model.insertMany(data);
};
export const updateOne = async ({
  model,
  filter = {},
  update = {},
  options = { validateBeforeSave: true },
} = {}) => {
  return await model.updateOne(filter, { ...update, $inc: { __v: 1 } }, options);
};
export const findOneAndUpdate = async ({
  model,
  filter = {},
  update = {},
  options = { },
} = {}) => {
  return await model.findOneAndUpdate(
    filter,
    { ...update, $inc: { __v: 1 } },
    { ...options, new: true, runValidators: true }
  );
};
export const findByIdAndUpdate = async ({
  model,
  id,
  update = {},
  options = { },
} = {}) => {
  return await model.findByIdAndUpdate(
    id,
    { ...update, $inc: { __v: 1 } },
    { ...options, new: true, runValidators: true }
  );
};
export const deleteOne = async ({ model, filter } = {}) => {
  return await model.deleteOne(filter);
};
export const deleteMany = async ({ model, filter } = {}) => {
  return await model.deleteMany(filter);
};
export const findOneAndDelete = async ({ model, filter } = {}) => {
  return await model.findOneAndDelete(filter);
};
