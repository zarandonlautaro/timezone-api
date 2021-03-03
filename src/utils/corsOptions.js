const whitelist = ['http://localhost:8000', 'http://localhost:3000'];
const corsOptions = (req, callback) => {
  let opt;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    opt = {
      origin: true,
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    opt = {
      origin: false,
    }; // disable CORS for this request
  }
  callback(null, opt); // callback expects two parameters: error and options
};

module.exports = corsOptions;
