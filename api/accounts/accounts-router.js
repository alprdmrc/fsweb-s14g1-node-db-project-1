const router = require("express").Router();
const accountModel = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const accounts = await accountModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  // KODLAR BURAYA
  try {
    res.json(req.currentAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { name, budget } = req.body;
      const insertedId = await accountModel.create({
        name: name.trim(),
        budget: budget,
      });
      const insertedAccount = await accountModel.getById(insertedId);
      res.status(201).json(insertedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { name, budget } = req.body;
      await accountModel.updateById(req.params.id, {
        name: name.trim(),
        budget: budget,
      });
      const updatedAccount = await accountModel.getById(req.params.id);
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountModel.deleteById(req.params.id);
    res.json(req.currentAccount);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    customMessage: "Bir hata olustu, custom error handler uzerinden geldi",
    message: err.message,
  });
});

module.exports = router;
