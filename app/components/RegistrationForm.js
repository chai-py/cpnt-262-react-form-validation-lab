'use client';

import { useState, useEffect } from 'react';

export default function RegistrationForm() {
  // Add state for username and usernameErrorText
  const [username, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  // Add state for password and passwordErrortext
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Add state for confirmPassword and confirmPasswordErrorText
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmedPassword] = useState("");
  // Extra - add state for email and emailErrorText
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  // Add state for isFormValid
  const [isFormValid, setIsFormValid] = useState("");

  // Add state to set formData
  const [formData, setFormData] = useState(null); // For storing and displaying results

  // Add function to validateForm
  const validateForm = () => {
    const isUsernameValid = username.length >= 3;
    const isPasswordValid = password.length >= 8;
    const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length >= 8;
    setIsFormValid(isUsernameValid && isPasswordValid && isConfirmPasswordValid);
  };

  // Revalidate form on input changes
  useEffect(() => {
    validateForm();
  }, [username, password, confirmPassword]);

  // Create a handleSubmitFunction
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      alert(`Form submitted successfully! Welcome, ${username}.`);
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-wrap lg:flex-nowrap gap-8 w-full justify-center">
        {/* Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">
            Registration Form
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block font-semibold mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {                                  // Add function to handle username change
                  const value = event.target.value                     // Add function to validate username
                  setUserName(value)
                  if (value.length === 0) {
                    setUserNameError("Name is required");
                  } else if (value.length > 0 && value.length < 3) {
                    setUserNameError(
                      "Name must be at least 3 characters"
                    );
                  } else {
                    setUserNameError("");
                  }
                }}
              />
              {userNameError && (
                <small className='text-red-600'>{userNameError}</small>
              )}
              <p className="text-red-500 text-sm mt-2"></p>
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {                  // Add function to handle password change
                  const value = event.target.value      // Add function to validate password
                  setPassword(value)
                  if (value.length === 0) {
                    setPasswordError("Password is required");
                  } else if (value.length < 8) {
                    setPasswordError(
                      "Password Must be at least 8 characters."
                    );
                  } else {
                    setPasswordError("");
                  }
                }}
              />
               {passwordError && (
                <small className='text-red-600'>{passwordError}</small>
              )}
              <p className="text-red-500 text-sm mt-2"></p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-semibold mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {                      // Add function to handle confirm password change
                  const value = event.target.value         // Add function to validate confirm password
                  setConfirmedPassword(value)
                  console.log(password)
                  if (value !== password) {
                    setErrorConfirmedPassword("Password must Match");
                  } else if (value.length < 8) {
                    setErrorConfirmedPassword(
                      "Password Must be at least 8 characters."
                    );
                  } else {
                    setErrorConfirmedPassword("");
                  }
                }}
              />
              {errorConfirmPassword && (
                <small className='text-red-600'>{errorConfirmPassword}</small>
              )}

              <p className="text-red-500 text-sm mt-2"></p>
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email (Optional):
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(event) => {                    // Extra - Add function to handle email value change
                  const value = event.target.value       // Extra add function to validate email
                  setEmail(value)
                  console.log(value)
                  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setErrorEmail("Invalid email format");
                  } else {
                    setErrorEmail("");
                  }
                }}
              />
              <p className="text-red-500 text-sm mt-2"></p>
            </div>
            
            
            <button
              type="submit"
              className={`w-full py-2 rounded ${
                isFormValid ? "bg-blue-600 text-white cursor-pointer" : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Register
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-blue-500 mb-4">
            Registration Results
          </h2>
          {formData ? (
            <div>
              <p className="mb-2">
                <span className="font-semibold">Username:</span>
                {formData.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                {formData.email || 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-gray-400">No registration details to show.</p>
          )}
          
        </div>
      </div>
    </div>
  );
}
