import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  Rocket,
  Calendar,
  Mail,
  ArrowRight,
  Home,
  MessageCircle,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";

const SubmissionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const oneLiner = searchParams.get("oneLiner");
  const currentStage = searchParams.get("currentStage");
  const teamSize = searchParams.get("teamSize");


  // If no submission data, redirect to home
  React.useEffect(() => {
    if (!email || !name) {
      console.warn("No submission data found in URL, redirecting to home");
      navigate("/", { replace: true });
    }
  }, [email, name, navigate]);

  if (!email || !name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FED853]/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FED853]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FED853]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Success Icon Animation */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-2xl animate-bounce-in">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            🎉 Submission Successful!
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your startup application has been successfully
            submitted to EDC BIT Mesra.
          </p>
        </div>

        {/* Submission Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 animate-fade-in-up animation-delay-200">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FED853] to-[#FED853]/80 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-gray-900" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {title || "Your Startup"}
              </h2>
              {oneLiner && <p className="text-gray-600">{oneLiner}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Submitted by - Always show if name/email exists */}
            {(name || email) && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Submitted by</p>
                  {name && (
                    <p className="font-semibold text-gray-900">{name}</p>
                  )}
                  {email && <p className="text-sm text-gray-600">{email}</p>}
                </div>
              </div>
            )}

            {/* Submission Date - Always show */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Submission Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Current Stage - Only show if exists */}
            {currentStage && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Stage</p>
                  <p className="font-semibold text-gray-900">
                    {currentStage.replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            )}

            {/* Team Size - Only show if team size exists and is greater than 1 */}
            {teamSize && parseInt(teamSize) > 1 && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Team Size</p>
                  <p className="font-semibold text-gray-900">
                    {teamSize} Members
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-[#FED853]/20 to-transparent rounded-2xl border border-[#FED853]/30 p-8 mb-8 animate-fade-in-up animation-delay-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FED853]" />
            What Happens Next?
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FED853] text-gray-900 font-bold rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Application Review
                </h4>
                <p className="text-gray-600">
                  Our team will carefully review your submission within 5-7
                  business days. We evaluate each application based on
                  innovation, market potential, and team capability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FED853] text-gray-900 font-bold rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Email Confirmation
                </h4>
                <p className="text-gray-600">
                  You'll receive a confirmation email at{" "}
                  <span className="font-medium text-gray-900">
                    {email || "your registered email"}
                  </span>{" "}
                  with your application reference number and next steps.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FED853] text-gray-900 font-bold rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Initial Screening
                </h4>
                <p className="text-gray-600">
                  Selected startups will be contacted for a preliminary
                  discussion with our mentors and investment committee.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#FED853] text-gray-900 font-bold rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Pre-incubation Program
                </h4>
                <p className="text-gray-600">
                  Successful applicants will gain access to our complete
                  pre-incubation program including mentorship, workspace,
                  funding opportunities, and networking events.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 animate-fade-in-up animation-delay-400">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Keep in Touch
              </h4>
              <p className="text-blue-800 text-sm">
                While we review your application, make sure to check your email
                regularly. Follow us on our social media channels for updates,
                events, and startup success stories. Feel free to reach out if
                you have any questions or need to update your application.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </button>

          <button
            onClick={() => navigate("/submissions")}
            className="px-8 py-4 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-semibold rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>Submit Another Startup</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-600">
          <blockquote className="text-xl italic text-gray-600 max-w-2xl mx-auto">
            "The best way to predict the future is to create it."
          </blockquote>
          <p className="text-gray-500 mt-2">- Peter Drucker</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SubmissionSuccess;
