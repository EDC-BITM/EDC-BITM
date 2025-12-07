import React, { useState } from 'react';
import { Loader, AlertCircle, CheckCircle } from 'lucide-react';

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
    if (teamMember.name) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Startup Submission Form
          </h1>
          <p className="text-slate-600 mb-8">
            Share your startup idea with us
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Founder Information */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Founder Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="batch"
                  placeholder="Batch (e.g., 2024)"
                  value={formData.batch}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Startup Core Information */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Startup Information
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Startup Title *"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="oneLiner"
                  placeholder="One-liner Description *"
                  value={formData.oneLiner}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="problemStatement"
                  placeholder="Problem Statement *"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="solution"
                  placeholder="Your Solution *"
                  value={formData.solution}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  name="currentStage"
                  value={formData.currentStage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="IDEA">Idea</option>
                  <option value="PROTOTYPE">Prototype</option>
                  <option value="EARLY_CUSTOMERS">Early Customers</option>
                  <option value="REVENUE">Revenue</option>
                </select>
              </div>
            </div>

            {/* Market & Business */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Market & Business
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="uniqueness"
                  placeholder="What makes your startup unique?"
                  value={formData.uniqueness}
                  onChange={handleInputChange}
                  rows="3"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="marketSize"
                  placeholder="Target market size"
                  value={formData.marketSize}
                  onChange={handleInputChange}
                  rows="3"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="targetCustomer"
                  placeholder="Target customer profile"
                  value={formData.targetCustomer}
                  onChange={handleInputChange}
                  rows="3"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="businessModel"
                  placeholder="Business model"
                  value={formData.businessModel}
                  onChange={handleInputChange}
                  rows="3"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="competitors"
                  placeholder="Competitors"
                  value={formData.competitors}
                  onChange={handleInputChange}
                  rows="3"
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Technical Information */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Technical Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="techStack"
                  placeholder="Tech Stack (e.g., React, Node.js, Python)"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="url"
                  name="websiteUrl"
                  placeholder="Website URL"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="url"
                  name="demoUrl"
                  placeholder="Demo URL"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="url"
                  name="pitchDeckUrl"
                  placeholder="Pitch Deck URL"
                  value={formData.pitchDeckUrl}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Additional Information
              </h2>
              <textarea
                name="additionalInfo"
                placeholder="Any additional information you'd like to share"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Team Members */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Team Members
              </h2>
              <div className="space-y-4 mb-4 p-4 bg-slate-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Team Member Name"
                    value={teamMember.name}
                    onChange={handleTeamMemberChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={teamMember.email}
                    onChange={handleTeamMemberChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Role (e.g., Co-founder, Tech Lead)"
                    value={teamMember.role}
                    onChange={handleTeamMemberChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="batch"
                    placeholder="Batch"
                    value={teamMember.batch}
                    onChange={handleTeamMemberChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={teamMember.rollNumber}
                    onChange={handleTeamMemberChange}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Team Member
                </button>
              </div>

              {formData.teamMembers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900">Added Members:</h3>
                  {formData.teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{member.name}</p>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit Startup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;