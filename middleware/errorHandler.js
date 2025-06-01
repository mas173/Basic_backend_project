const { constants } = require("../constants");

constants;
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  case constants.UNAUTHORISED:
      res.json({
        title: "unauthorised",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

        case constants.NOT_FOUND:
      res.json({
        title: "page not found",
        message: err.message,
        stackTrace: err.stack,
      });
    break;

      case constants.FORBIDDEN:
      res.json({
        title: "validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

      case constants.SERVER_ERROR:
      res.json({
        title: "server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      
      default:
        console.log("no error all good ")
        break;

  }
};

module.exports = errorHandler;
