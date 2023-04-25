const accountModel = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else {
      if (name.trim().length > 100 || name.trim().length < 3) {
        res
          .status(400)
          .json({ message: "name of account must be between 3 and 100" });
      } else if (typeof budget !== "number") {
        res.status(400).json({ message: "budget of account must be a number" });
      } else if (budget < 0 || budget > 1000000) {
        res
          .status(400)
          .json({ message: "budget of account is too large or too small" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const name = req.body.name.trim();
    const account = await accountModel.getByName(name);
    if (account) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let id = req.params.id;
    const account = await accountModel.getById(id);
    if (account) {
      req.currentAccount = account;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (error) {
    next(error);
  }
};
