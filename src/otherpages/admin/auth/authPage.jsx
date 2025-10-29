import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import { pb } from "@/utils/pb";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(authSchema) });

  // Check if user is already logged in
  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      setAuthError(null);
      console.log("Form Data:", data);

      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);

      // Store auth data in localStorage (PocketBase does this automatically)
      // but you can also manually store additional data if needed
      localStorage.setItem("userEmail", authData.record.email);
      localStorage.setItem("userName", authData.record.name);

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthError(
        error.message ||
          "Failed to authenticate. Please check your credentials."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: illustration / branding */}
          <div className="hidden md:flex flex-col items-start justify-center p-8 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/20">
            <div className="flex items-center gap-3 mb-6">
              {/* EDC Logo */}
              <div className="w-14 h-14 bg-black/10 rounded-lg flex items-center justify-center p-2">
                <img
                  src={EDCLogo.src}
                  alt="EDC Logo"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">EDC - BITM</h3>
                <p className="text-sm opacity-90">
                  Events · Speakers · Community
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold leading-tight">Welcome back</h2>
            <p className="mt-3 text-black/80 max-w-sm">
              Sign in to manage events, speakers, and track registrations. Fast,
              secure, and simple.
            </p>

            <div className="mt-6 text-sm bg-black/10 p-3 rounded-md">
              Tip: Use your organizational email to sign in.
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-zinc-900 border border-yellow-500/20 rounded-xl shadow-md shadow-yellow-500/10 p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-yellow-500/10 rounded-md flex items-center justify-center">
                  <img
                    src={EDCLogo.src}
                    alt="EDC Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Sign in to your account
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Enter your details to continue
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {authError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                  {authError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@organization.com"
                  {...register("email")}
                  className={`mt-2 w-full rounded-lg border bg-zinc-800 text-white placeholder-zinc-500 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                    errors.email ? "border-red-400" : "border-zinc-700"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`w-full rounded-lg border bg-zinc-800 text-white placeholder-zinc-500 px-3 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                      errors.password ? "border-red-400" : "border-zinc-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-zinc-400 px-2 py-1 rounded-md hover:bg-zinc-700 transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 text-black px-4 py-2 font-medium shadow hover:bg-yellow-400 disabled:opacity-70 transition-all"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Request access
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
