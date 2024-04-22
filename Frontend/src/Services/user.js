import api from "Configs/api";

const getProfile = () =>
  api.get("user/whoami").then(res => res || false);

export { getProfile };
