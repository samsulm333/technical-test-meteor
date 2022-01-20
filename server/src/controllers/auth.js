const { user, role } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).required().messages({
      "string.base": `Name must be text`,
      "string.empty": `Name field cannot be empty`,
      "string.min": `"Name" should have a minimum length of `,
      "any.required": `"Name" is required`,
    }),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  const userExist = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userExist) {
    return res.status(400).send({
      status: "failed",
      message: "email is already registered, Please login!",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role_id: 2,
    };

    const newUser = await user.create(data);

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: "success",
      message: "Register success, Please login !",
      data: {
        user: {
          email: newUser.email,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// login function
exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;

    const userExist = await user.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: role,
          as: "role",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (userExist === null) {
      return res.status(400).send({
        status: "failed",
        message: "Email or Password not match",
      });
    }

    const isValid = await bcrypt.compare(password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email & Password not match",
      });
    }

    const data = {
      id: userExist.id,
    };

    const token = jwt.sign(data, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: userExist.email,
          role: userExist.role.role_name,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
