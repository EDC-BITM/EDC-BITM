import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, CheckCircle, Plus, X, Users, Rocket, Target, Globe, Code, FileText, User, ArrowRight, ArrowLeft, Shield, Award, Clock, ChevronDown, Lock } from 'lucide-react';

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
  const [sectionErrors, setSectionErrors] = useState({});
  const [isScrolledToForm, setIsScrolledToForm] = useState(false);
  const [sectionCompletion, setSectionCompletion] = useState({
    founder: false,
    startup: false,
    market: false,
    technical: false,
    team: false,
    additional: false
  });

  const sections = [
    { id: 'founder', label: 'Founder', icon: User, required: ['name', 'email'] },
    { id: 'startup', label: 'Startup', icon: Rocket, required: ['title', 'oneLiner', 'problemStatement', 'solution', 'currentStage'] },
    { id: 'market', label: 'Market', icon: Target, required: [] },
    { id: 'technical', label: 'Technical', icon: Code, required: [] },
    { id: 'team', label: 'Team', icon: Users, required: [] },
    { id: 'additional', label: 'Additional', icon: FileText, required: [] },
  ];

  // Update section completion when formData changes
  useEffect(() => {
    const updateCompletion = () => {
      const newCompletion = {};
      sections.forEach(section => {
        if (section.required.length === 0) {
          newCompletion[section.id] = false; // Optional sections don't get checkmarks
        } else {
          newCompletion[section.id] = section.required.every(field => 
            formData[field] && formData[field].trim() !== ''
          );
        }
      });
      setSectionCompletion(newCompletion);
    };

    updateCompletion();
  }, [formData]);

  // Scroll to form when clicking CTA
  const scrollToForm = () => {
    const formElement = document.getElementById('submission-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
    setIsScrolledToForm(true);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('submission-form');
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        setIsScrolledToForm(rect.top <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateSection = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return true;

    const errors = {};
    let isValid = true;

    section.required.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'This field is required';
        isValid = false;
      }
    });

    // Email validation for founder section
    if (sectionId === 'founder' && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    setSectionErrors(prev => ({ ...prev, [sectionId]: errors }));
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if exists
    if (sectionErrors[activeSection]?.[name]) {
      setSectionErrors(prev => ({
        ...prev,
        [activeSection]: {
          ...prev[activeSection],
          [name]: undefined
        }
      }));
    }
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

  const navigateToSection = (sectionId) => {
    // Don't allow navigation if not scrolled to form yet
    if (!isScrolledToForm) {
      scrollToForm();
      return;
    }

    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const targetIndex = sections.findIndex(s => s.id === sectionId);

    // Only check validation if moving forward
    if (targetIndex > currentIndex) {
      // Check if current section is valid (only for required sections)
      if (['founder', 'startup'].includes(activeSection)) {
        const isValid = validateSection(activeSection);
        if (!isValid) {
          setError(`Please complete all required fields in ${sections[currentIndex].label} section`);
          setTimeout(() => setError(''), 3000);
          return;
        }
      }
    }

    // Allow backward navigation always
    setActiveSection(sectionId);
    setError('');
  };

  const handleNext = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      const isValid = validateSection(activeSection);
      
      // Only validate required sections (founder and startup)
      if (['founder', 'startup'].includes(activeSection) && !isValid) {
        setError(`Please complete all required fields in ${sections[currentIndex].label} section`);
      } else {
        setActiveSection(sections[currentIndex + 1].id);
        setError('');
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate only required sections
    const requiredSections = sections.filter(s => s.required.length > 0);
    for (const section of requiredSections) {
      if (!validateSection(section.id)) {
        setError(`Please complete all required fields in ${section.label} section`);
        setLoading(false);
        return;
      }
    }

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

      setSuccess('🎉 Startup submitted successfully! Our team will review your application within 5-7 business days.');
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

      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simplified section locking logic
  const getSectionStatus = (sectionId) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    
    if (!isScrolledToForm) {
      return { locked: true, canNavigate: false };
    }
    
    // If trying to go to a previous section, always allow
    if (sectionIndex <= activeIndex) {
      return { locked: false, canNavigate: true };
    }
    
    // If trying to go to a future section, check if we can skip
    // Only founder and startup sections prevent skipping
    if (sectionIndex > activeIndex) {
      // Check if any required section between current and target is incomplete
      for (let i = activeIndex; i < sectionIndex; i++) {
        const section = sections[i];
        if (section.required.length > 0) {
          const isComplete = section.required.every(field => 
            formData[field] && formData[field].trim() !== ''
          );
          if (!isComplete) {
            return { locked: true, canNavigate: false };
          }
        }
      }
    }
    
    return { locked: false, canNavigate: true };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FED853' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FED853] to-[#FED853]/80 rounded-2xl mb-8 shadow-2xl">
              <Rocket className="w-10 h-10 text-gray-900" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FED853] to-[#FED853]/80 bg-clip-text text-transparent">
                Entrepreneurship Development Cell
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Turning Ideas Into Successful Ventures
            </p>
            
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              EDC is your launchpad to entrepreneurial success. We provide mentorship, resources, 
              and funding opportunities to help your startup thrive in today's competitive landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="flex items-center gap-3 text-white">
                <Shield className="w-6 h-6 text-[#FED853]" />
                <span className="text-lg">Expert Mentorship</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Award className="w-6 h-6 text-[#FED853]" />
                <span className="text-lg">Funding Opportunities</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-[#FED853]" />
                <span className="text-lg">Fast-track Growth</span>
              </div>
            </div>

            <div className="max-w-xl mx-auto">
              <div className="bg-gradient-to-r from-[#FED853]/20 to-transparent p-6 rounded-2xl border border-[#FED853]/30 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  🚀 Submit Your Ideas for Pre-Incubation
                </h3>
                <p className="text-gray-200">
                  EDC will help you grow. Share your innovative ideas and get access to our complete 
                  startup support ecosystem including mentorship, funding, and networking opportunities.
                </p>
              </div>
              
              <button
                onClick={scrollToForm}
                className="group px-8 py-4 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-bold text-lg rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all shadow-2xl hover:shadow-3xl flex items-center gap-3 mx-auto animate-bounce hover:animate-none"
              >
                <span>Start Your Application</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
          <ChevronDown className="w-6 h-6 text-[#FED853]" />
        </div>
      </div>

      {/* Main Form Section */}
      <div id="submission-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Startup Submission Form
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete all sections below to submit your startup for pre-incubation. 
            <span className="text-[#FED853] font-semibold"> * Required fields</span>
          </p>
          
          {!isScrolledToForm && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Scroll down to access the form</span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Application Sections</h3>
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const { locked, canNavigate } = getSectionStatus(section.id);
                  const isComplete = sectionCompletion[section.id];

                  return (
                    <button
                      key={section.id}
                      onClick={() => canNavigate && navigateToSection(section.id)}
                      disabled={locked}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#FED853] text-gray-900 shadow-md'
                          : locked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-white/20' : 'bg-gray-100'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{section.label}</span>
                        {section.required.length > 0 && (
                          <span className="text-xs text-red-500">*</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isComplete && section.required.length > 0 && !isActive && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {locked && !isActive && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-[#FED853]/10 to-transparent rounded-xl border border-[#FED853]/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Required Progress</p>
                  <span className="text-sm font-bold text-[#FED853]">
                    {Object.keys(sectionCompletion).filter(key => 
                      sections.find(s => s.id === key)?.required.length > 0 && sectionCompletion[key]
                    ).length}/{sections.filter(s => s.required.length > 0).length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FED853] to-[#FED853]/80 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(Object.keys(sectionCompletion).filter(key => 
                        sections.find(s => s.id === key)?.required.length > 0 && sectionCompletion[key]
                      ).length / sections.filter(s => s.required.length > 0).length) * 100}%` 
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Market, Technical, Team & Additional sections are optional
                </p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              {/* Form Header */}
              <div className="border-b border-gray-200 px-8 py-6 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {sections.find(s => s.id === activeSection)?.label} Details
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {activeSection === 'founder' && 'Tell us about yourself (Required)'}
                      {activeSection === 'startup' && 'Describe your startup idea (Required)'}
                      {activeSection === 'market' && 'Define your target market (Optional)'}
                      {activeSection === 'technical' && 'Technical implementation details (Optional)'}
                      {activeSection === 'team' && 'Your team members (Optional)'}
                      {activeSection === 'additional' && 'Additional information (Optional)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FED853]/10 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      Section {(sections.findIndex(s => s.id === activeSection) + 1)} of {sections.length}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {/* Status Messages */}
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-red-800">Please complete this section</p>
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
                          {sectionErrors.founder?.name && (
                            <span className="text-red-500 text-sm ml-2">(Required)</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                            sectionErrors.founder?.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address *
                          {sectionErrors.founder?.email && (
                            <span className="text-red-500 text-sm ml-2">
                              {sectionErrors.founder.email}
                            </span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                            sectionErrors.founder?.email ? 'border-red-300' : 'border-gray-300'
                          }`}
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
                          placeholder="+91 99xxxxxxxx"
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
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition"
                          placeholder="BTXX/ZZZZZ/YY"
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
                        {sectionErrors.startup?.title && (
                          <span className="text-red-500 text-sm ml-2">(Required)</span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                          sectionErrors.startup?.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your startup name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        One-liner Description *
                        {sectionErrors.startup?.oneLiner && (
                          <span className="text-red-500 text-sm ml-2">(Required)</span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="oneLiner"
                        value={formData.oneLiner}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                          sectionErrors.startup?.oneLiner ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Briefly describe your startup in one sentence"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Problem Statement *
                        {sectionErrors.startup?.problemStatement && (
                          <span className="text-red-500 text-sm ml-2">(Required)</span>
                        )}
                      </label>
                      <textarea
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none ${
                          sectionErrors.startup?.problemStatement ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="What problem are you solving?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Your Solution *
                        {sectionErrors.startup?.solution && (
                          <span className="text-red-500 text-sm ml-2">(Required)</span>
                        )}
                      </label>
                      <textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none ${
                          sectionErrors.startup?.solution ? 'border-red-300' : 'border-gray-300'
                        }`}
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

                {/* Market Section - OPTIONAL */}
                {activeSection === 'market' && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional but recommended. You can skip if not applicable.
                      </p>
                    </div>
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

                {/* Technical Section - OPTIONAL */}
                {activeSection === 'technical' && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Fill only if you have technical details to share.
                      </p>
                    </div>
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

                {/* Team Section - OPTIONAL */}
                {activeSection === 'team' && (
                  <div className="space-y-8">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Add team members if applicable.
                      </p>
                    </div>
                    
                    {/* Add Team Member Form */}
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Add Team Member (Optional)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
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
                            Email
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
                                className="p-2 text-gray-400 hover:text-red-500 transition"
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

                {/* Additional Section - OPTIONAL */}
                {activeSection === 'additional' && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Add any additional information you'd like to share.
                      </p>
                    </div>
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
                    {activeSection !== 'founder' && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition flex items-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Previous
                      </button>
                    )}
                    {activeSection !== 'additional' && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        {['market', 'technical', 'team', 'additional'].includes(activeSection) ? 'Next (Optional)' : 'Next Section'}
                        <ArrowRight className="w-5 h-5" />
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
            <div className="mt-8 p-6 bg-gradient-to-r from-[#FED853]/10 to-transparent rounded-2xl border border-[#FED853]/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#FED853] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Your Data is Secure</h4>
                  <p className="text-sm text-gray-600">
                    All information submitted is confidential and will only be used for evaluation purposes. 
                    Only Founder and Startup sections are required. Market, Technical, Team, and Additional sections are optional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-2">Entrepreneurship Development Cell</p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved. Turning ideas into successful ventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;