"use client";

import Image from "next/image";
import { Post } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { IoEye, IoEyeOff, IoLogInOutline } from "react-icons/io5";

const Login: React.FC = () => {
  const router = useRouter();
  const { token, login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response: any = await Post("/api/admin/login", {
      email,
      password,
    });
    if (response?.success) {
      const token = response?.token;
      const adminDetails = response?.user;
      login(token, adminDetails);
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/dashboard/support");
  }, [router]);

  return (
    <>
      {!token && (
        <div className="bg-[url('/assets/bg/bg.jpg')] bg-cover min-h-screen flex justify-center items-center">
          <div className="w-full bg-white backdrop-blur-2xl bg-opacity-30 p-6 mx-4 rounded-2xl md:max-w-sm md:mx-auto">
            <Image
              src="/assets/logo/logo.png"
              alt="Icon"
              width={200}
              height={100}
              className="w-40 mb-5 mx-auto object-contain"
            />
            <h2 className="text-xl md:text-2xl font-bold text-center text-black mb-2">
              Login to your account
            </h2>
            <p className="text-center text-xs w-3/4 mx-auto text-black/80 lg:text-black mb-4">
              Enter your email and password below to access your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  autoComplete="off"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 text-black placeholder-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    autoComplete="off"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-10 text-black placeholder-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 cursor-pointer text-primary hover:text-primary"
                  >
                    {showPassword ? (
                      <IoEye size={22} />
                    ) : (
                      <IoEyeOff size={22} />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-3 flex text-base justify-center items-center gap-2 bg-black text-white rounded-lg transition duration-200`}
              >
                <IoLogInOutline size={24} />
                Sign In to Your Account
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
