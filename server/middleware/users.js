import jwt from "jsonwebtoken"

const authentification = (req, res, next) => {
  // console.log("auth------------")
  // console.log(req.session.token)
  // console.log("---------------")

  // console.log(req.headers)
  // const bearerToken = req.headers["accept"]
  // if (bearerToken) {
  //   const token = bearerToken
  //   const { user } = jwt.verify(token, "MA_PHRASE_SECRETE")
  //   if (user) {
  //     next()
  //     return
  //   }
  // } else {
  //   const token = req.session.token
  //   const { user } = jwt.verify(token, "MA_PHRASE_SECRETE")
  //   if (user) {
  //     next()
  //     return
  //   }
  // }

  res.redirect("auth/login")
}

export default authentification
