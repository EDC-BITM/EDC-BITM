import React from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "@/utils/pb";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import TailwindAdvancedEditor from "@/components/admin/TextEditor";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = pb.authStore.model;

  const handleLogout = () => {
    pb.authStore.clear();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/admin/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <span className="text-yellow-500 font-bold text-lg">
                <img src={EDCLogo.src} alt="EDC Logo" className="w-8 h-8" />
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-zinc-400">EDC - BITM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-zinc-400">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-zinc-400">
            Here's what's happening with your events today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Total Events</span>
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs text-green-400 mt-2">+2 this month</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Speakers</span>
              <span className="text-2xl">🎤</span>
            </div>
            <p className="text-3xl font-bold">28</p>
            <p className="text-xs text-green-400 mt-2">+5 this month</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Registrations</span>
              <span className="text-2xl">✍️</span>
            </div>
            <p className="text-3xl font-bold">342</p>
            <p className="text-xs text-green-400 mt-2">+48 this week</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Team Members</span>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold">45</p>
            <p className="text-xs text-zinc-500 mt-2">No change</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">➕</div>
              <h4 className="font-medium mb-1">Add New Event</h4>
              <p className="text-sm text-zinc-400">Create a new event</p>
            </button>

            <button className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">🎤</div>
              <h4 className="font-medium mb-1">Manage Speakers</h4>
              <p className="text-sm text-zinc-400">Add or edit speakers</p>
            </button>

            <button className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium mb-1">View Analytics</h4>
              <p className="text-sm text-zinc-400">Check event statistics</p>
            </button>

            <button className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-medium mb-1">Manage Team</h4>
              <p className="text-sm text-zinc-400">Update team members</p>
            </button>

            <button className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-medium mb-1">Manage Startups</h4>
              <p className="text-sm text-zinc-400">Add startup info</p>
            </button>

            <button className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg hover:bg-pink-500/20 transition-colors text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-medium mb-1">Settings</h4>
              <p className="text-sm text-zinc-400">Configure dashboard</p>
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-400 mb-1">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">User ID</p>
              <p className="font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Verified</p>
              <p className="font-medium">
                {user?.verified ? (
                  <span className="text-green-400">✓ Verified</span>
                ) : (
                  <span className="text-red-400">✗ Not verified</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Account Created</p>
              <p className="font-medium">
                {new Date(user?.created).toLocaleDateString()}
              </p>
            </div>
            <div>
              <TailwindAdvancedEditor />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
