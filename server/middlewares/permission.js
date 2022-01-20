const { user, route, rbac, role } = require("../models");

exports.accessAuth = async (req, res, next) => {
  const id = req.user.id;
  const path = req.path.split("/");
  const method = req.method;
  try {
    // find into table rbac
    let userData = await user.findOne({
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
          include: [
            {
              model: rbac,
              as: "route",
              include: [
                {
                  model: route,
                  as: "permission",
                  attributes: {
                    exclude: ["createdAt", "updatedAt"],
                  },
                },
              ],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    // filtering route == path
    let data = userData.role.route;
    const isAuth = data.filter((item) => {
      return (
        item.permission.route_name == path[1] &&
        item.permission.method == method
      );
    });

    if (isAuth.length !== 0) {
      next();
    } else {
      return res.status(401).send({
        status: "failed",
        message: "Access Denied",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
