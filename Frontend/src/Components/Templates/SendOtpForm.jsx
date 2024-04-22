import { sendOtp } from "Services/auth";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 11) return;

    const { res, error } = await sendOtp(mobile);

    if (res) setStep(2);
    if (error) console.log(error.response.data.message);
    console.log({ res, error });
  };

  return (
    <form onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
