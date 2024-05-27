const response = (res, statusCode, message, data) => {
  if (statusCode === 200) {
    return res.json({
      status: "Success",
      statusCode: 200,
      message,
      data,
    });
  } else if (statusCode === 400) {
    return res.json({
      status: "Failed",
      statusCode: 400,
      message,
      data,
    });
  } else if (statusCode === 401) {
    return res.json({
      status: "Unauthorized",
      statusCode: 401,
      message,
      data,
    });
  }
};

module.exports = response;
