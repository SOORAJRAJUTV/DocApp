const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};


// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"];
//     if (!token) {
//       return res.status(401).json({
//         message: "Authorization header missing",
//         success: false,
//       });
//     }

//     const tokenParts = token.split(" ");
//     if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//       return res.status(401).json({
//         message: "Invalid token format",
//         success: false,
//       });
//     }

//     const tokenValue = tokenParts[1];
//     JWT.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//           message: "Invalid token",
//           success: false,
//         });
//       }
//       req.body.userId = decoded.id;
//       next();
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };
