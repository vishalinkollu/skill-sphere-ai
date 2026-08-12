const {
  getUsers,
  getUserById,
  searchUsers
} = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

const getSingleUser = async (
  req,
  res
) => {
  try {
    const user = await getUserById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const users = await searchUsers(
      req.query.q || ""
    );

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to search users",
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  searchUser
};