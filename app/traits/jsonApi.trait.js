function buildResourceObject(type, item) {
  const { id, ...attributes } = item;

  return {
    type,
    id: String(id),
    attributes,
  };
}

function successItem(type, item) {
  return {
    jsonapi: { version: "1.0" },
    data: buildResourceObject(type, item),
  };
}

function successCollection(type, items) {
  return {
    jsonapi: { version: "1.0" },
    data: items.map((item) => buildResourceObject(type, item)),
  };
}

function errorPayload(status, title, detail) {
  return {
    jsonapi: { version: "1.0" },
    errors: [
      {
        status: String(status),
        title,
        detail,
      },
    ],
  };
}

module.exports = {
  successItem,
  successCollection,
  errorPayload,
};
