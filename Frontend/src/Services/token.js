import api from "Configs/api";

import { getCookie } from "Utils/cookies";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken,
    });

    return { response };
  } catch (error) {
    return { error };
  }
};

export { getNewToken };
