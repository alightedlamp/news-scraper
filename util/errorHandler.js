const error = {
  401: 'Unauthorized!',
  404: 'Resource not found',
  500: 'Could not fetch articles! Try again later or contact the website administrator.'
};
const errorHandler = function(res, err, type) {
  res.status(type).send(error[type]);
};

module.exports = errorHandler;
