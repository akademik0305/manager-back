import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: 'Ro`yhatdan o`tmagansiz'
      })
    }
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(403).json({
        message: 'Ro`yhatdan o`tmagansiz'
      })
    }

    const decodedData = jwt.verify(token, 'secret')
    req.user = decodedData
    next()

  } catch (e) {
    console.log(e)
    return res.status(403).json({
      message: 'Ro`yhatdan o`tmagansiz'
    })
  }
}

export default authMiddleware