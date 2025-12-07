import React, { useState } from 'react';
import { Loader, AlertCircle, CheckCircle, Plus, X, Users, Rocket, Target, Globe, Code, FileText, User } from 'lucide-react';

const SubmissionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    oneLiner: '',
    problemStatement: '',
    solution: '',
    currentStage: 'IDEA',
    batch: '',
    rollNumber: '',
    contactNumber: '',
    techStack: '',
    websiteUrl: '',
    demoUrl: '',
    pitchDeckUrl: '',
    uniqueness: '',
    marketSize: '',
    targetCustomer: '',
    businessModel: '',
    competitors: '',
    additionalInfo: '',
    teamMembers: [],
  });

  const [teamMember, setTeamMember] = useState({
    name: '',
    email: '',
    role: '',
    batch: '',
    rollNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('founder');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamMemberChange = (e) => {
    const { name, value } = e.target;
    setTeamMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTeamMember = () => {
    if (teamMember.name && teamMember.email) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, teamMember],
      }));
      setTeamMember({
        name: '',
        email: '',
        role: '',
        batch: '',
        rollNumber: '',
      });
    }
  };

  const removeTeamMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit');
      }

      setSuccess('Submission created successfully!');
      setFormData({
        name: '',
        email: '',
        title: '',
        oneLiner: '',
        problemStatement: '',
        solution: '',
        currentStage: 'IDEA',
        batch: '',
        rollNumber: '',
        contactNumber: '',
        techStack: '',
        websiteUrl: '',
        demoUrl: '',
        pitchDeckUrl: '',
        uniqueness: '',
        marketSize: '',
        targetCustomer: '',
        businessModel: '',
        competitors: '',
        additionalInfo: '',
        teamMembers: [],
      });

      if (onSuccess) {
        onSuccess(data.data);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'founder', label: 'Founder', icon: User },
    { id: 'startup', label: 'Startup', icon: Rocket },
    { id: 'market', label: 'Market', icon: Target },
    { id: 'technical', label: 'Technical', icon: Code },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'additional', label: 'Additional', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FED853] rounded-2xl mb-6 shadow-lg">
            <Rocket className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Startup Submission Portal
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Submit your startup for review and get access to our ecosystem of investors, mentors, and resources.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Submission Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === section.id
                          ? 'bg-[#FED853] text-gray-900 shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-[#FED853]/20 to-transparent rounded-xl border border-[#FED853]/30">
                <p className="text-sm text-gray-700 font-medium">Progress</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FED853] rounded-full transition-all duration-500"
                    style={{ width: `${(sections.findIndex(s => s.id === activeSection) + 1) / sections.length * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Complete all sections to submit
                </p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Form Header */}
              <div className="border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sections.find(s => s.id === activeSection)?.label} Details
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Please provide accurate information for evaluation
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Required fields marked with *</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {/* Status Messages */}
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-red-800">Submission Error</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Success!</p>
                      <p className="text-green-600 text-sm mt-1">{success}</p>
                    </div>
                  </div>
                )}

                {/* Founder Section */}
                {activeSection === 'founder' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="+91 99XXXXXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Batch
                        </label>
                        <input
                          type="text"
                          name="batch"
                          value={formData.batch}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="2024"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="BTECH/XXXXX/YY"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Startup Section */}
                {activeSection === 'startup' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Startup Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                        placeholder="Enter your startup name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        One-liner Description *
                      </label>
                      <input
                        type="text"
                        name="oneLiner"
                        value={formData.oneLiner}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                        placeholder="Briefly describe your startup in one sentence"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                        placeholder="What problem are you solving?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Your Solution *
                      </label>
                      <textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                        placeholder="How does your startup solve this problem?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Current Stage *
                      </label>
                      <select
                        name="currentStage"
                        value={formData.currentStage}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition appearance-none bg-white"
                      >
                        <option value="IDEA">🚀 Idea Stage</option>
                        <option value="PROTOTYPE">🔧 Prototype Development</option>
                        <option value="EARLY_CUSTOMERS">👥 Early Customers</option>
                        <option value="REVENUE">💰 Generating Revenue</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Market Section */}
                {activeSection === 'market' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Uniqueness Proposition
                        </label>
                        <textarea
                          name="uniqueness"
                          value={formData.uniqueness}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                          placeholder="What makes your startup unique?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Target Market Size
                        </label>
                        <textarea
                          name="marketSize"
                          value={formData.marketSize}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                          placeholder="Estimated market size and growth"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Target Customer Profile
                        </label>
                        <textarea
                          name="targetCustomer"
                          value={formData.targetCustomer}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                          placeholder="Describe your ideal customer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Business Model
                        </label>
                        <textarea
                          name="businessModel"
                          value={formData.businessModel}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                          placeholder="How do you plan to make money?"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Competitors Analysis
                      </label>
                      <textarea
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                        placeholder="List your main competitors and your advantages"
                      />
                    </div>
                  </div>
                )}

                {/* Technical Section */}
                {activeSection === 'technical' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Technology Stack
                        </label>
                        <input
                          type="text"
                          name="techStack"
                          value={formData.techStack}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="React, Node.js, MongoDB, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Website URL
                        </label>
                        <input
                          type="url"
                          name="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="https://yourstartup.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Demo URL
                        </label>
                        <input
                          type="url"
                          name="demoUrl"
                          value={formData.demoUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="https://demo.yourstartup.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Pitch Deck URL
                        </label>
                        <input
                          type="url"
                          name="pitchDeckUrl"
                          value={formData.pitchDeckUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="https://drive.google.com/your-pitch-deck"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Section */}
                {activeSection === 'team' && (
                  <div className="space-y-8">
                    {/* Add Team Member Form */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Add Team Member
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Team member name"
                            value={teamMember.name}
                            onChange={handleTeamMemberChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="team@email.com"
                            value={teamMember.email}
                            onChange={handleTeamMemberChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                          </label>
                          <input
                            type="text"
                            name="role"
                            placeholder="Co-founder, CTO, etc."
                            value={teamMember.role}
                            onChange={handleTeamMemberChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Batch
                          </label>
                          <input
                            type="text"
                            name="batch"
                            placeholder="2024"
                            value={teamMember.batch}
                            onChange={handleTeamMemberChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Roll Number
                          </label>
                          <input
                            type="text"
                            name="rollNumber"
                            placeholder="Optional"
                            value={teamMember.rollNumber}
                            onChange={handleTeamMemberChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        disabled={!teamMember.name || !teamMember.email}
                        className="px-6 py-3 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-semibold rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                        Add Team Member
                      </button>
                    </div>

                    {/* Team Members List */}
                    {formData.teamMembers.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Team Members ({formData.teamMembers.length})
                        </h4>
                        <div className="space-y-3">
                          {formData.teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#FED853]/50 transition group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#FED853]/20 to-[#FED853]/10 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{member.name}</p>
                                  <p className="text-sm text-gray-600">{member.role || 'Team Member'}</p>
                                  <p className="text-xs text-gray-500">{member.email}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="p-2 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Additional Section */}
                {activeSection === 'additional' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none"
                        placeholder="Any additional details, challenges, or achievements you'd like to share..."
                      />
                    </div>
                  </div>
                )}

                {/* Navigation & Submit */}
                <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    {sections.findIndex(s => s.id === activeSection) > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = sections.findIndex(s => s.id === activeSection);
                          setActiveSection(sections[currentIndex - 1].id);
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition"
                      >
                        Previous
                      </button>
                    )}
                    {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = sections.findIndex(s => s.id === activeSection);
                          setActiveSection(sections[currentIndex + 1].id);
                        }}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition"
                      >
                        Next Section
                      </button>
                    )}
                  </div>

                  {activeSection === 'additional' && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-bold rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all flex items-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Processing Submission...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5" />
                          Submit Startup Application
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                All submissions are confidential and reviewed by our expert panel. 
                You'll receive feedback within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;