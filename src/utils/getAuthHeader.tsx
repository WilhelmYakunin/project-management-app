// develop token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODdjM2Q2NTM1NTE4YTM4ZjNkMGVmZCIsImxvZ2luIjoiVml0YWxpaSIsImlhdCI6MTY2OTg0MTk2NiwiZXhwIjoxNjY5ODg1MTY2fQ.CwbNnLu3r-naLbSPHRwQmevIOu_6ZysLErdiXF6MXZU'
export const getAuthHeader = () => { return { Authorization: 'Bearer '.concat(token) } }