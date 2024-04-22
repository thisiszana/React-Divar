import { useState } from "react";
import SendOtpForm from "Components/Templates/SendOtpForm";
import CheckOtpForm from "Components/Templates/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm mobile={mobile} setMobile={setMobile} setStep={setStep} />
      )}
      {step === 2 && (
        <CheckOtpForm
          code={code}
          setCode={setCode}
          setStep={setStep}
          mobile={mobile}
        />
      )}
    </div>
  );
}

export default AuthPage;
