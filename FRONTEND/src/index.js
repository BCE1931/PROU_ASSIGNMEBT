export const typeData = {
  questionid: "",
  type: "",
  alreadyhas: false,
  lookawaytime: 0,
  selectedAnswer: "", // ✅ added to store user’s chosen option
};

export const initTypeData = () => {
  if (!localStorage.getItem("typeData")) {
    localStorage.setItem("typeData", JSON.stringify({}));
    console.log("✅ typeData created in localStorage");
  } else {
    console.log("ℹ️ typeData already exists in localStorage");
  }
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const saveusername = (username) => {
  localStorage.setItem("username", username);
};

export const getusername = () => {
  return localStorage.getItem("username");
};

export const saveemail = (email) => {
  localStorage.setItem("email", email);
};

export const getemail = () => {
  return localStorage.getItem("email");
};

export const saverefershtoken = (refreshtoken) => {
  localStorage.setItem("refreshtoken", refreshtoken);
};

export const getrefershtoken = () => {
  return localStorage.getItem("refreshtoken");
};

export const getadmin = () => {
  return localStorage.getItem("admin");
};

export const saveadmin = (admin) => {
  localStorage.setItem("admin", admin);
};
