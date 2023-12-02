var express = require("express");
var passport = require("passport");
var router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", async (req, res, next) => {
  res.json({ message: "oke anh zai!!" });
});

router.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    var { email } = req.body; //config Nodemailer
    console.log("to email: ", email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    console.log("here!!!!!!!!!!!!!!!");
    // send mail with defined transport object
    await transporter.sendMail(
      {
        from: '"Hello, welcom to TiemAnh 👻. I am " pct2711@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Welcom to TiemAnh, the world of photorgraphy art!", // plain text body
        html: `<div><h3>Hi ${email}, welcome to TiemAnh</h3><span>I'm Cao Thang Pham, CEO of TiemAnh. I'm so happy that you chose TiemAnh and I just want to say thank you! I hope you have beautiful photo albums to preserve wonderful memories!</span>></div>`, // html body
      },
      (err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        return res.json({ message: "Gui mail thanh cong!!" });
      }
    );
  }
);

router.post(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    var { email, package, timeBooking, place } = req.body; //config Nodemailer
    console.log("to email: ", email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.PASSWORD_EMAIL,
      },
    });
    console.log("here!!!!!!!!!!!!!!!");
    // send mail with defined transport object
    await transporter.sendMail(
      {
        from: '"Hello, welcom to TiemAnh 👻. I am " pct2711@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Welcom to TiemAnh, the world of photorgraphy art!", // plain text body
        html: `<div><h3>Hi ${email}, you just booking!!</h3><span>Your order:${package} at ${timeBooking} in ${place}</span><p>Thanks for your order!!</p></div>`, // html body
      },
      (err) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        return res.json({ message: "Gui mail thanh cong!!" });
      }
    );
  }
);

module.exports = router;
