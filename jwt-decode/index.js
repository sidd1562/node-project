const { jwtDecode } = require("jwt-decode");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDEiLCJuYW1lIjoic2lkZCBEb2UiLCJpYXQiOjE1MTYxNTU0NTM5MDIyfQ.s7oopBV5nE3jD0TXJtYfMmrarP-B81GalcOZ1dAVHAg";
const decoded = jwtDecode(token);
console.log(decoded);

const decodedHeader = jwtDecode(token, { header: true });
console.log(decodedHeader);
