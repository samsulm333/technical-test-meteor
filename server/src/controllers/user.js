const { user, role } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");

// view user detail by admin
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const userData = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
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

    res.status(200).send({
      status: "success",
      data: {
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role.role_name,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// create user function by admin
exports.createUser = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().min(3).required().messages({
      "string.base": `Name must be text`,
      "string.empty": `Name field cannot be empty`,
      "string.min": `"Name" should have a minimum length of `,
      "any.required": `"Name" is required`,
    }),
    role: joi.number(),
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
      message: "email is already registered",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role_id: req.body.role,
    };

    await user.create(data);

    res.status(200).send({
      status: "success",
      message: "Create user success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// update user by Admin
exports.updateUserByAdmin = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).messages({
      "string.base": `fullname must be text`,
      "string.min": `fullname minimal 3 character`,
    }),
    email: joi
      .string()
      .email({
        tlds: {
          allow: ["com", "co", "net", "id"],
        },
      })
      .message("please insert valid email"),
    role: joi.number(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const id = req.params.id;

    const data = {
      email: req.body.email,
      name: req.body.name,
      role_id: req.body.role,
    };

    const updatedData = await user.update(data, {
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `update user id ${id} succeed`,
      rowAffected: updatedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// Delete User function
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await user.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "success",
      message: "Delete User success",
      data: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

// View profile function
exports.getUserProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const userData = await user.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
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

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: userData.email,
          name: userData.name,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// Update profile function
exports.updateUserProfile = async (req, res) => {
  const schema = joi.object({
    name: joi.string().min(3).messages({
      "string.base": `fullname must be text`,
      "string.min": `fullname minimal 3 character`,
    }),
    email: joi
      .string()
      .email({
        tlds: {
          allow: ["com", "co", "net", "id"],
        },
      })
      .message("please insert valid email"),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const id = req.user.id;

    const data = {
      email: req.body.email,
      name: req.body.name,
    };

    const updatedData = await user.update(data, {
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `update user id ${id} succeed`,
      rowAffected: updatedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// change password
exports.changePassword = async (req, res) => {
  const schema = joi.object({
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }
  try {
    const id = req.user.id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      password: hashedPassword,
    };

    const updatedData = await user.update(data, {
      where: {
        id: id,
      },
    });

    res.status(200).send({
      status: "success",
      message: `update Password succeed`,
      rowAffected: updatedData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
