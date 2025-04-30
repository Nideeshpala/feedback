import BASE_URL from "./Baseurl";
import { commonRequest } from "./Commonrequest";


export const loginapi = async (body) => {
    return await commonRequest('POST', `${BASE_URL}/user/login`, "", body)
}

export const registerapi = async (body) => {
    return await commonRequest('POST', `${BASE_URL}/user/register`, "", body)
}

export const feedbackapi = async (body, header) => {
    return await commonRequest('POST', `${BASE_URL}/user/feedback`, header, body);
}

export const getallfeeds = async (header) => {
    return await commonRequest('GET', `${BASE_URL}/admin/feeds`, header, "")
}

export const admincom = async (body,header) => {
    return await commonRequest('POST', `${BASE_URL}/admin/replay`,header, body)
}

export const commentdelet = async (body,header) => {
    return await commonRequest('DELETE', `${BASE_URL}/admin/delete`, header, body)
}

export const getuserfeeds = async (header) => {
    return await commonRequest('GET', `${BASE_URL}/user/feeds`, header, "")
}
