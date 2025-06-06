import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      signup(formData);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[28rem] mx-auto p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
