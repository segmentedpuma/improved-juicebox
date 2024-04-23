
const requireUser = (req, res, next) => {
  if (req.user) {
    console.log("user has been authorized!");
    next();
  }
  else {
    res.sendStatus(401)
  }
}
module.exports = { requireUser} ;