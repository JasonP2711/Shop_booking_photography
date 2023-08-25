const express = require("express");
const router = express.Router();
const { Employee } = require("../models/index");
var passport = require("passport");
var jwt = require("jsonwebtoken");
const jwtSettings = require("../constant/jwtSetting");
const {
  employeeIdSchema,
  employeeBodySchema,
  validateSchema,
} = require("../validation/employee");

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let data = await Employee.find();
      res.send({ ok: true, result: data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/:id", validateSchema(employeeIdSchema), async (req, res, next) => {
  try {
    const id = req.params.id;
    let data = await Employee.findById(id).then((data) => {
      res.send({ ok: true, result: data });
    });
  } catch {
    (err) => {
      res.status({ error: error.message });
    };
  }
});

router.post("/", validateSchema(employeeBodySchema), async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    let newEmployee = new Employee(data);
    let result = await newEmployee.save();
    res.send({ ok: true, result: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/:id",
  validateSchema(employeeIdSchema),
  async (req, res, next) => {
    try {
      const removeData = req.params.id;
      let found = await Employee.findByIdAndDelete(removeData);
      res.send({ ok: true });
    } catch {
      (err) => {
        return res.status(500).json({ error: error.message });
      };
    }
  }
);

router.patch(
  "/:id",
  validateSchema(employeeBodySchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const itemsBody = req.body;
      console.log(itemsBody);
      let data = await Employee.findByIdAndUpdate(id, itemsBody);
      res.send({ ok: true, message: "update" });
    } catch {
      (err) => {
        return res.status(500).json({ error: error.message });
      };
    }
  }
);

module.exports = router;
