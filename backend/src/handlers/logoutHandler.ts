import catchError from "../utils/catchError";

const logoutHandler = catchError(async(req, res) => {
    req.session.destroy(err => {
    res.clearCookie("connect.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    })

    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    return res.sendStatus(204);
  });
})

export default logoutHandler