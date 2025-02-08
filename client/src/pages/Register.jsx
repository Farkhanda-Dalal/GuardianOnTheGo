import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    role: "",
    fname: "",
    lname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",  // Added state for OTP
  });
  const [otpSent, setOtpSent] = useState(false);  // To track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false);  // To track if OTP is verified

  const registerUser = async (event) => {
    event.preventDefault();
    const { role, fname, lname, phone, password } = data;
    try {
      const { data } = await axios.post("/register", {
        role,
        fname,
        lname,
        phone,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendOtp = async () => {
    const { phone } = data;
    try {
      const response = await axios.post("/send-otp", { phone });
      if (response.data.success) {
        setOtpSent(true);  // Show OTP input after sending OTP
        toast.success("OTP sent to your phone!");
      } else {
        toast.error("Error sending OTP.");
      }
    } catch (error) {
      toast.error("Error sending OTP.");
    }
  };

  const verifyOtp = async () => {
    const { phone, otp } = data;
    try {
      const response = await axios.post("/verify-otp", { phone, otp });
      if (response.data.success) {
        setOtpVerified(true);  // Mark OTP as verified
        toast.success("OTP verified!");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      toast.error("Error verifying OTP.");
    }
  };

  return (
    <form onSubmit={registerUser}>
      <div>
        <label>Register As</label>
        <label>
          <input
            type="radio"
            name="role"
            value="guardian"
            checked={data.role === "guardian"}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
          Guardian
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="co-guardian"
            checked={data.role === "co-guardian"}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
          Co-Guardian
        </label>
      </div>

      <div>
        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter..."
          value={data.fname}
          onChange={(e) => setData({ ...data, fname: e.target.value })}
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter..."
          value={data.lname}
          onChange={(e) => setData({ ...data, lname: e.target.value })}
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="Enter..."
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
      </div>

      {data.phone && !otpSent && (
        <div>
          <button type="button" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
      )}

      {otpSent && !otpVerified && (
        <div>
          <label>Enter OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={data.otp}
            onChange={(e) => setData({ ...data, otp: e.target.value })}
          />
          <button type="button" onClick={verifyOtp}>
            Verify OTP
          </button>
        </div>
      )}

      {otpVerified && (
        <>
          <div>
            <label>Set Password</label>
            <input
              type="password"
              placeholder="Enter..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter..."
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          </div>

          <div>
            <button type="submit" disabled={data.password !== data.confirmPassword}>
              REGISTER
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Register;
