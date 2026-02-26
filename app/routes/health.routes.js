const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "prueba-api",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
