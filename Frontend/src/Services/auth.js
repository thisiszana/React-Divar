import api from "Configs/api.js";

const sendOtp = async (mobile) => {
  try {
    const res = await api.post("auth/send-otp", { mobile });
    return { res };
  } catch (error) {
    return { error };
  }
};

const checkOtp = async (mobile, code) => {
  try {
    const res = await api.post("auth/check-otp", { mobile, code });
    return { res };
  } catch (error) {
    return { error };
  }
};

export { sendOtp, checkOtp };
