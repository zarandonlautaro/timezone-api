const handleError = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = handleError;
