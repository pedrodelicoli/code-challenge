const errorHandler = (status, message) => ({
    erro: {
      status,
      message,
    },  
  }  
);

module.exports = { errorHandler };