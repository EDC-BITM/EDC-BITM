import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import { adminLogin } from "./adminApi.js";

export default function RecruitmentAdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await adminLogin(username.trim(), password);
      navigate("/recruitment/admin", { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-[#FED853] selection:text-black">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#FED853]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Link */}
      <div className="w-full max-w-md mb-6 z-10">
        <Link
          to="/recruitment"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#FED853] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Recruitment Form</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-3">
            <img
              src={EDCLogo?.src || EDCLogo}
              alt="EDC BIT Mesra"
              className="w-16 h-16 object-contain drop-shadow-md"
            />
          </div>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#FED853] bg-[#FED853]/10 border border-[#FED853]/20 px-3 py-1 rounded-full mb-2">
            Coordinator Portal
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Recruitment Admin
          </h1>
          <p className="text-xs text-white/50 mt-1.5 max-w-xs">
            Sign in to view, search, and manage student recruitment applications.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-300 text-sm animate-fade-in-up"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2"
            >
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <User className="w-4 h-4" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white text-sm placeholder:text-white/30 focus:border-[#FED853] focus:ring-2 focus:ring-[#FED853]/20 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white text-sm placeholder:text-white/30 focus:border-[#FED853] focus:ring-2 focus:ring-[#FED853]/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-[#FED853] text-black hover:bg-[#ffe580] active:scale-[0.99] transition duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#FED853]/10 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Responses Dashboard</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer info note */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40 leading-relaxed">
            Authorized EDC Recruitment Coordinators only. All activity is authenticated and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
