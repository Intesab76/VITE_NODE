const getPrivateRoute = (req, res, next) => {
  const user = req.user;
  console.log("FROM PVT", user);
  // const imageBase64 = user.image?.data
  //   ? `data:${user.image.contentType};base64,${user.image.data.toString(
  //       "base64"
  //     )}`
  //   : null;
  const imageUrl = user.imageUrl;
  // console.log("From PVT ROUTE ---- Image URL:", imageUrl);

  if (!user) {
    return res.json({
      error: "User Not found",
    });
  }
  return res.json({
    name: user.name,
    gender: user.gender,
    imageUrl: imageUrl,
    // image: imageBase64,
  });
};

module.exports = getPrivateRoute;
