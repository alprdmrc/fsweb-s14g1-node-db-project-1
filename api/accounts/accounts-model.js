const db = require("../../data/db-config");

const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
};

const getById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).first();
};

const getByName = (name) => {
  return db("accounts").where("name", name).first();
};

const create = (account) => {
  // KODLAR BURAYA
  return db("accounts").insert(account);
};

//update ettigini geri gondermiyor ?
const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).update(account);
};

const deleteById = (id) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
