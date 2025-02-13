import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("personal");

  // State for placeholders that turn into labels
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    // Send data to API (replace URL with your actual API endpoint)
    fetch("https://your-api-endpoint.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Sign in successful!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sign in failed!");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white">
        {/* <div className="w-full max-w-md text-center"> */}
        <div className="w-full max-w-sm text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="https://www.three.co.uk/content/experience-fragments/threedigital/uk/en/site/header/master/_jcr_content/root/header/top/logo.coreimg.svg/1668177162294/three-logo.svg"
              alt="Logo"
              className="w-[30%] h-auto"
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold">My3 account</h2>

          {/* Tabs */}

          <div className="flex justify-center mt-4 border-b border-gray-900">
            <button
              className={`w-1/2 pb-2 font-medium text-center ${
                !isRegister ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setIsRegister(false)}
            >
              Log in
            </button>
            <button
              className={`w-1/2 pb-2 font-medium text-center ${
                isRegister ? "border-b-2 border-black" : "text-gray-500"
              }`}
              onClick={() => setIsRegister(true)}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form className="mt-6 text-left" onSubmit={handleSignIn}>
            {isRegister && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Select account type:
                </label>

                <div className="mt-2">
                  <label className="flex items-center text-black text-lg">
                    <input
                      type="radio"
                      name="accountType"
                      value="personal"
                      checked={accountType === "personal"}
                      onChange={() => setAccountType("personal")}
                      className="mr-2 w-8 h-8 accent-black"
                    />
                    Personal account or business employee
                  </label>
                  <label className="flex items-center mt-2 text-black text-lg">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={accountType === "business"}
                      onChange={() => setAccountType("business")}
                      className="mr-2 w-8 h-8 accent-black"
                    />
                    Business account owner
                  </label>
                </div>
              </div>
            )}

            {isRegister && (
              <div className="relative mb-4">
                <label
                  className={`absolute left-2 transition-all ${
                    phoneFocused
                      ? "text-gray-700 text-xs top-1"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Phone number
                </label>
                <input
                  type="text"
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={(e) => setPhoneFocused(e.target.value !== "")}
                  className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
                />
              </div>
            )}

            <div className="relative">
              <label
                className={`absolute left-2 transition-all ${
                  emailFocused
                    ? "text-black text-xs top-1"
                    : "top-3 text-gray-400"
                }`}
              >
                Email address*
              </label>
              {/* <input
                // type="email"
                onFocus={() => setEmailFocused(true)}
                onBlur={(e) => setEmailFocused(e.target.value !== "")}
                className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              /> */}
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
              />
            </div>

            <div className="relative mt-4">
              <label
                className={`absolute left-2 transition-all ${
                  passwordFocused
                    ? "text-black text-xs top-1"
                    : "top-3 text-gray-400"
                }`}
              >
                Password*
              </label>
              {/* <input
                type={showPassword ? "text" : "password"}
                name="message"
                value={formData.message}
                onChange={handleChange}
                // type="password"
                id="password"
                onFocus={() => setPasswordFocused(true)}
                onBlur={(e) => setPasswordFocused(e.target.value !== "")}
                className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
              /> */}
              <input
                type={showPassword ? "text" : "password"}
                name="message"
                value={formData.message} // Corrected this line
                onChange={handleChange}
                id="password"
                onFocus={() => setPasswordFocused(true)}
                onBlur={(e) => setPasswordFocused(e.target.value !== "")}
                className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
              />
              {/* <span
              className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
              //Malik Waqas
            </span> */}
              <span
                className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} */}
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {isRegister && (
              <div className="mt-2 text-black text-base">
                <p>
                  • Your password must contain 12 characters or more, and can
                  include special characters.
                </p>
                <p>
                  • Make sure it's hard to guess - try forming one with 3 random
                  words.
                </p>
              </div>
            )}

            {isRegister && (
              <div className="relative mt-4">
                <label
                  className={`absolute left-2 transition-all ${
                    confirmPasswordFocused
                      ? "text-gray-700 text-xs top-1"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Confirm password*
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={(e) =>
                    setConfirmPasswordFocused(e.target.value !== "")
                  }
                  className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
                />
                <span
                  className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
            )}

            {!isRegister && (
              <div className="text-left underline mt-2">
                <a href="#" className="text-blue-600 text-sm">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            {/* <button className="w-full bg-black text-white py-2.5 font-bold rounded-2xl mt-6">
              {isRegister ? "Register" : "Log in"}
            </button> */}
            <button className="w-full bg-black text-white py-2.5 font-bold rounded-2xl mt-6">
              {isRegister ? "Register" : "Log in"}
            </button>
          </form>

          {isRegister ? (
            <p className="mt-4 text-sm text-left">
              {/* Already registered?{" "} */}
              <a
                href="#"
                onClick={() => setIsRegister(false)}
                className="text-blue-600 underline"
              >
                Already registered? Log in
              </a>
              <br />
              <br />
              Three uses hCAPTCHA to keep our forms and users safe from fraud.
              hCAPTCHA may collect some personal or analytical data. To learn
              more, please visit:{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                hCAPTCHA
              </a>{" "}
              website.
            </p>
          ) : (
            <p className="text-gray-500 text-xs mt-4 ">
              Three uses hCAPTCHA to keep our forms and users safe from fraud.
              hCAPTCHA may collect some personal or analytical data. To learn
              more, please visit:{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                hCAPTCHA
              </a>{" "}
              website.
            </p>
          )}

          {/* Back to Home */}
          <div className="mt-4 border-t border-gray-400">
            <a href="#" className="text-blue-600 underline text-sm">
              &lt; Back to home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
