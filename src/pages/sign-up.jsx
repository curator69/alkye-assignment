import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [stepCounter, setStepCounter] = useState("step1");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailSubmit = () => {
    setStepCounter("step2");
  };

  const handleEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const handlePasswordSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URI}/login/`, {
        username: userData.email,
        password: userData.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePasswordChange = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  return (
    <div className="bg-[#f4f4f4] text-black p-12">
      <div className="[box-shadow:rgba(0,_0,_0,_0.16)_0px_1px_4px] bg-white rounded-[20px] p-10 xl:p-20 flex flex-col gap-20 h-[750px] overflow-scroll">
        <Image
          src="./dark-logo.svg"
          alt="Logo"
          width={136}
          height={59}
          className="cursor-pointer w-[70px] h-[30px] md:w-[136px] md:h-[59px]"
        />

        {stepCounter === "step1" ? (
          <Step1
            handleEmailSubmit={handleEmailSubmit}
            onEmailChange={handleEmailChange}
          />
        ) : (
          <Step2
            handlePasswordSubmit={() => {
              setLoading(true);
              handlePasswordSubmit();
            }}
            handlePasswordChange={handlePasswordChange}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

const Step1 = ({ handleEmailSubmit, onEmailChange }) => {
  return (
    <div className="flex flex-col items-start xl:flex-row xl:items-center justify-between gap-10 xl:gap-20 w-full">
      <div className="flex flex-col w-full xl:w-[30%]">
        <p className="text-xs leading-6 font-normal md:text-2xl md:leading-custom-50">
          STEP 1
        </p>
        <p className="text-2xl leading-6 font-medium md:text-5xl md:leading-custom-50">
          Enter your email address to continue
        </p>
        <p className="text-xs leading-6 font-normal md:text-2xl md:leading-custom-50 xl:mt-8">
          Log in to your account. If you don't have one, you will be prompted to
          create one.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full xl:w-[70%]">
        <input
          type="email"
          placeholder="Email"
          className="p-4 px-10 border-[1px] border-solid border-[#939393] rounded-md text-[#636363] placeholder:text-[#636363] w-full h-[50px] md:h-[80px]"
          onChange={onEmailChange}
        />
        <button
          className="text-xs leading-6 font-extrabold md:text-2xl md:leading-custom-50 bg-black py-2 px-12 rounded-lg text-white w-fit xl:ml-auto"
          onClick={handleEmailSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const Step2 = ({ handlePasswordSubmit, handlePasswordChange, loading }) => {
  return (
    <div className="flex flex-col gap-10 xl:gap-20">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 xl:gap-20 w-full">
        <div className="flex flex-col w-full xl:w-[30%]">
          <p className="text-xs leading-6 font-normal md:text-2xl md:leading-custom-50">
            STEP 2
          </p>
          <p className="text-2xl leading-6 font-medium md:text-5xl md:leading-custom-50">
            Create an account to continue
          </p>
          <p className="text-xs leading-6 font-normal md:text-2xl md:leading-custom-50 xl:mt-8">
            You'll be able to log in to Dingoo with this email address and
            password.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full xl:w-[70%]">
          <p className="text-xs leading-6 font-normal md:text-2xl md:leading-custom-50">
            Enter a password to create your account with
          </p>
          <input
            type="password"
            placeholder="Choose a password"
            className="p-4 px-4 sm:px-10 border-[1px] border-solid border-[#939393] rounded-md text-[#636363] placeholder:text-[#636363] w-full h-[50px] sm:h-[80px]"
            onChange={handlePasswordChange}
            disabled={loading}
          />
          <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[10px] leading-[15px] font-normal md:text-xl md:leading-[30px] sm:text-balance">
              Use a minimum of 6 characters (case sensitive) with at least one
              number or special character.
            </p>
            <button
              className="text-xs leading-6 font-extrabold md:text-2xl md:leading-custom-50 bg-black py-2 px-12 rounded-lg text-white w-fit whitespace-nowrap sm:ml-auto"
              onClick={handlePasswordSubmit}
              disabled={loading}
            >
              {!loading ? <p>Agree & Continue</p> : <p>Submitting...</p>}
            </button>
          </div>
        </div>
      </div>

      <p className="text-[7px] leading-[15px] font-light md:text-sm md:leading-[30px]">
        Dingoo will use your data to personalise and improve your Dingoo
        experience and to send you information about Dingoo. You can change your
        communication preferences anytime. We may use your data as described in
        our Privacy Policy, including sharing it with The Test of Companies. By
        clicking "Agree & Continue", you agree to our Subscriber Agreement and
        acknowledge that you have read our Privacy Policy and Collection
        Statement.
      </p>
    </div>
  );
};
