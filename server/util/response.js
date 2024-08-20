const handleResponse = (res, code, data = null, message = "", error = "") => {
    const response = { message, error };
  
    if (data) {
      response.data = data;
    }
  
    return res.status(code).json(response);
};


module.exports = handleResponse;