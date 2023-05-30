
const handleResponse = (res, statusCode, payload) =>{

    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
    });


    res.end(payload);
};

module.exports = handleResponse;