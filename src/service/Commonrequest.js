import axios from "axios";

export const commonRequest = async (method, url, header, body) => {
    let config = {
        method,
        url,
        headers: header ? header : { "Content-Type": "application/json" },
        data: body
    };

    try {
        const response = await axios(config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err.response || err.message);
        throw err.response || err; // Better to throw error, so that catch block in handlesubmit works
    }
};
