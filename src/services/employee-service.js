const axios = require('axios');

const  baseUrl = 'http://localhost:8089/';
export const addEmployee = (data) => {
    return axios.post(`${baseUrl}emp/add` ,data);
}

export const getEmployees = () => {
    return axios.get(`${baseUrl}emp/list`)
}

export const getEmployeeById = (id) => {
    return axios.get(`${baseUrl}emp/find${id}`)
}

export const deleteEmployee = (id) => {
    return axios.delete(`${baseUrl}emp/delete${id}`)
}

export const putEmployee = (id, data) => {
    return axios.put(`${baseUrl}emp/update${id}` , data)
}
 