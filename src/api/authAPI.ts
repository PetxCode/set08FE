import axios from "axios";

const URL: string = "http://localhost:1133";

export const registerAccount = async (data: {}) => {
  return await axios.post(`${URL}/api/user/register-user`, data);
};

export const signInAccount = async (data: {}) => {
  return await axios.post(`${URL}/api/user/sign-in-user`, data).then((res) => {
    return res.data;
  });
};

export const verifyAccount = async (data: {}) => {
  return await axios
    .patch(`${URL}/api/user/verify-user`, { token: data })
    .then((res) => {
      return res.data;
    });
};
