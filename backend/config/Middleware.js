let jwt = require('jsonwebtoken');
let SECRET_KEY = process.env.APP_SECRET;

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token){
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token_sliced = token.slice(7, token.length);
      jwt.verify(token_sliced, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }else {
      return res.status(401).json({
        error: 'Auth token is not supplied'
      });
    }
  }else {
    return res.status(401).json({
      error: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}