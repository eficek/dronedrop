const router = require("express").Router();
const { User } = require("../db");

router.get("/", function (req, res) {
  try {
    User.findAll({ attributes: ["id", "name", "email", "address"] }).then(
      (users) => res.json(users)
    );
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", (req, res, next) => {
  User.findByPk(req.params.userId, {
    attributes: ["id", "name", "email", "address"],
  })
    .then((user) => res.json(user))
    .catch(next);
});

router.post("/signup", async (req, res, next) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

router.post("/login", async (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) res.json({ id: null });
      else {
        if (user.password == req.body.password) {
          res.json(user);
        } else {
          res.json({ id: null });
        }
      }
    })
    .catch(next);
});

module.exports = router;
