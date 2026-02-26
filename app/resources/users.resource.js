const jsonApiTrait = require("../traits/jsonApi.trait");

const RESOURCE_TYPE = "users";

function item(user) {
  return jsonApiTrait.successItem(RESOURCE_TYPE, user);
}

function collection(users) {
  return jsonApiTrait.successCollection(RESOURCE_TYPE, users);
}

module.exports = {
  item,
  collection,
};
