import { api } from "../config/api";

const pathUrl = "/products"

export const getAll = () => api
    .get(pathUrl)
    .then(({ data }) => data)

export const updateList = (id, name) => api
    .patch(`${pathUrl}/${id}`, { name })
    .then(({ data }) => data)

export const create = (name) => api
    .post(pathUrl, { name })
    .then(({ data }) => data)

export const deleteItem = (id) => api
.delete(`${pathUrl}/${id}`)
.then(({ data }) => data)
