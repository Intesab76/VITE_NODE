const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    return res.json({
      success: "Cookie cleared. Signed out",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = logout;
