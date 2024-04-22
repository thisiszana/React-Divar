import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { checkOtp } from "Services/auth";
import { setCookie } from "Utils/cookies";
import { getProfile } from "Services/user";

import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.length !== 5) return;

    const { res, error } = await checkOtp(mobile, code);

    if (res) {
      setCookie(res.data);
      navigate("/");
      refetch(["profile"]);
    }

    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید. </span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backBtn}>
        تغیر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
