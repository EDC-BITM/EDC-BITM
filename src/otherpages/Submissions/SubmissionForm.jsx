import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
  Users,
  Rocket,
  Target,
  Globe,
  Code,
  FileText,
  User,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  Clock,
  ChevronDown,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

// Validation schemas matching backend exactly
const teamMemberSchema = z.object({
  name: z
    .string()
    .min(1, "Team member name is required")
    .max(255, "Name must be less than 255 characters"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  contactNumber: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val === "" ||
        /^[+]?[0-9]{1,4}?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/im.test(
          val
        ),
      "Invalid phone number format"
    ),
  batch: z
    .string()
    .max(10, "Batch must be less than 10 characters")
    .optional()
    .or(z.literal("")),
  rollNumber: z
    .string()
    .max(20, "Roll number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .max(50, "Role must be less than 50 characters")
    .optional()
    .or(z.literal("")),
});

const submissionSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  email: z.string().email("Valid email required").toLowerCase(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  oneLiner: z
    .string()
    .min(10, "One-liner must be at least 10 characters")
    .max(500, "One-liner must be less than 500 characters"),
  problemStatement: z
    .string()
    .min(20, "Problem statement must be at least 20 characters")
    .max(2000, "Problem statement must be less than 2000 characters"),
  solution: z
    .string()
    .min(20, "Solution must be at least 20 characters")
    .max(2000, "Solution must be less than 2000 characters"),
  currentStage: z.enum(["IDEA", "PROTOTYPE", "EARLY_CUSTOMERS", "REVENUE"], {
    message: "Current stage must be selected",
  }),

  // Optional fields
  batch: z
    .string()
    .max(10, "Batch must be less than 10 characters")
    .optional()
    .or(z.literal("")),
  rollNumber: z
    .string()
    .max(20, "Roll number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  contactNumber: z
    .string()
    .refine(
      (val) => !val || val === "" || /^[0-9]{10}$/.test(val),
      "Contact number must be exactly 10 digits"
    )
    .optional()
    .or(z.literal("")),
  uniqueness: z
    .string()
    .max(1000, "Uniqueness description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  marketSize: z
    .string()
    .max(1000, "Market size must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  targetCustomer: z
    .string()
    .max(1000, "Target customer must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  businessModel: z
    .string()
    .max(1000, "Business model must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  techStack: z
    .string()
    .max(500, "Tech stack must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  competitors: z
    .string()
    .max(1000, "Competitors must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url("Invalid website URL")
    .optional()
    .or(z.literal("")),
  demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
  pitchDeckUrl: z
    .string()
    .url("Invalid pitch deck URL")
    .optional()
    .or(z.literal("")),
  otherLinks: z
    .string()
    .max(1000, "Other links must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  additionalInfo: z
    .string()
    .max(2000, "Additional info must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
  specificGuidance: z
    .string()
    .max(2000, "Specific guidance must be less than 2000 characters")
    .optional()
    .or(z.literal("")),

  // Team members
  teamMembers: z.array(teamMemberSchema).optional().default([]),
});

// Input field component with proper error handling using fieldState
const FormField = React.memo(
  ({
    name,
    label,
    type = "text",
    required = false,
    placeholder,
    rows,
    control,
    maxLength,
    ...props
  }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            {rows ? (
              <textarea
                {...field}
                rows={rows}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition resize-none ${
                  fieldState.invalid
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                {...props}
              />
            ) : (
              <input
                {...field}
                type={type}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                  fieldState.invalid
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                {...props}
              />
            )}
            {/* Character count for text fields with limits */}
            {maxLength && (
              <p className="mt-1 text-xs text-gray-500">
                {field.value?.length || 0}/{maxLength} characters
              </p>
            )}
            {/* Error message */}
            {fieldState.error && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);

FormField.displayName = "FormField";

const SubmissionForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = useState({
    name: "",
    email: "",
    role: "",
    batch: "",
    rollNumber: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("founder");
  const [isScrolledToForm, setIsScrolledToForm] = useState(false);
  const [teamMemberErrors, setTeamMemberErrors] = useState({});

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      name: "",
      email: "",
      title: "",
      oneLiner: "",
      problemStatement: "",
      solution: "",
      currentStage: "IDEA",
      batch: "",
      rollNumber: "",
      contactNumber: "",
      techStack: "",
      websiteUrl: "",
      demoUrl: "",
      pitchDeckUrl: "",
      uniqueness: "",
      marketSize: "",
      targetCustomer: "",
      businessModel: "",
      competitors: "",
      additionalInfo: "",
      specificGuidance: "",
      otherLinks: "",
      teamMembers: [],
    },
  });

  const formValues = watch();
  const teamMembers = watch("teamMembers") || [];

  const sections = [
    {
      id: "founder",
      label: "Founder",
      icon: User,
      fields: ["name", "email", "contactNumber", "batch", "rollNumber"],
    },
    {
      id: "startup",
      label: "Startup",
      icon: Rocket,
      fields: [
        "title",
        "oneLiner",
        "problemStatement",
        "solution",
        "currentStage",
      ],
    },
    {
      id: "market",
      label: "Market",
      icon: Target,
      fields: [
        "uniqueness",
        "marketSize",
        "targetCustomer",
        "businessModel",
        "competitors",
      ],
    },
    {
      id: "technical",
      label: "Technical",
      icon: Code,
      fields: ["techStack", "websiteUrl", "demoUrl", "pitchDeckUrl"],
    },
    { id: "team", label: "Team", icon: Users, fields: ["teamMembers"] },
    {
      id: "additional",
      label: "Additional",
      icon: FileText,
      fields: ["additionalInfo", "specificGuidance", "otherLinks"],
    },
  ];

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Check section completion
  const getSectionCompletion = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return false;

    // Only founder and startup are required sections
    const requiredFields = {
      founder: ["name", "email"],
      startup: [
        "title",
        "oneLiner",
        "problemStatement",
        "solution",
        "currentStage",
      ],
    };

    if (!requiredFields[sectionId]) return false; // Optional sections

    return requiredFields[sectionId].every((field) => {
      const value = formValues[field];
      return value && value.toString().trim() !== "";
    });
  };

  // Scroll to form when clicking CTA
  const scrollToForm = () => {
    const formElement = document.getElementById("submission-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
    setIsScrolledToForm(true);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById("submission-form");
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        setIsScrolledToForm(rect.top <= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTeamMemberChange = (e) => {
    const { name, value } = e.target;
    setTeamMember((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (teamMemberErrors[name]) {
      setTeamMemberErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addTeamMember = () => {
    // Validate team member before adding
    const result = teamMemberSchema.safeParse(teamMember);

    if (!result.success) {
      const errors = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setTeamMemberErrors(errors);
      toast.error("Please fix team member validation errors");
      return;
    }

    const currentMembers = watch("teamMembers") || [];
    setValue("teamMembers", [...currentMembers, teamMember]);
    setTeamMember({
      name: "",
      email: "",
      role: "",
      batch: "",
      rollNumber: "",
      contactNumber: "",
    });
    setTeamMemberErrors({});
    toast.success("Team member added successfully");
  };

  const removeTeamMember = (index) => {
    const currentMembers = watch("teamMembers") || [];
    setValue(
      "teamMembers",
      currentMembers.filter((_, i) => i !== index)
    );
    toast.success("Team member removed");
  };

  const navigateToSection = async (sectionId) => {
    // Don't allow navigation if not scrolled to form yet
    if (!isScrolledToForm) {
      scrollToForm();
      return;
    }

    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    const targetIndex = sections.findIndex((s) => s.id === sectionId);
    const currentSection = sections[currentIndex];

    // Only check validation if moving forward from required sections
    if (
      targetIndex > currentIndex &&
      ["founder", "startup"].includes(activeSection)
    ) {
      const isValid = await trigger(currentSection.fields);
      if (!isValid) {
        // Get the error fields
        const errorFields = currentSection.fields.filter(
          (field) => errors[field]
        );
        const errorMessages = errorFields
          .map((field) => errors[field]?.message)
          .filter(Boolean)
          .join(", ");

        if (errorMessages) {
          toast.error(`Please fix the following errors: ${errorMessages}`, {
            duration: 4000,
          });
        }
        return;
      }
    }

    // Allow navigation
    setActiveSection(sectionId);
  };

  const handleNext = async () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      const currentSection = sections[currentIndex];

      // Only validate required sections (founder and startup)
      if (["founder", "startup"].includes(activeSection)) {
        const isValid = await trigger(currentSection.fields);
        if (!isValid) {
          // Get the error fields
          const errorFields = currentSection.fields.filter(
            (field) => errors[field]
          );
          const errorMessages = errorFields
            .map((field) => errors[field]?.message)
            .filter(Boolean)
            .join(", ");

          if (errorMessages) {
            toast.error(`Please fix the following errors: ${errorMessages}`, {
              duration: 4000,
            });
          }
          return;
        }
      }

      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Clean up empty strings to null for optional fields
      const cleanedData = {
        ...data,
        batch: data.batch || null,
        rollNumber: data.rollNumber || null,
        contactNumber: data.contactNumber || null,
        uniqueness: data.uniqueness || null,
        marketSize: data.marketSize || null,
        targetCustomer: data.targetCustomer || null,
        businessModel: data.businessModel || null,
        techStack: data.techStack || null,
        competitors: data.competitors || null,
        websiteUrl: data.websiteUrl || null,
        demoUrl: data.demoUrl || null,
        pitchDeckUrl: data.pitchDeckUrl || null,
        otherLinks: data.otherLinks || null,
        additionalInfo: data.additionalInfo || null,
        specificGuidance: data.specificGuidance || null,
      };

      const response = await fetch(`${API_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle backend validation errors
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors
            .map((err) => `${err.field}: ${err.message}`)
            .join("\n");
          toast.error(errorMessages, { duration: 5000 });
        } else {
          toast.error(result.message || "Failed to submit");
        }
        throw new Error(result.message || "Failed to submit");
      }

      // Only execute this if response.ok is true
      toast.success(
        "🎉 Startup submitted successfully! Redirecting to confirmation page...",
        { duration: 1500 }
      );

      // Verify we have data before navigating
      if (!result.data) {
        console.error("No data in successful response:", result);
        throw new Error("Invalid response from server");
      }

      // Navigate to success page with query parameters
      const params = new URLSearchParams({
        title: result.data.title || "",
        name: result.data.name || "",
        email: result.data.email || "",
        oneLiner: result.data.oneLiner || "",
        currentStage: result.data.currentStage || "",
        teamSize: result.data.teamMembers
          ? String(result.data.teamMembers.length + 1)
          : "1",
      });

      setTimeout(() => {
        navigate(`/submission-success?${params.toString()}`, {
          replace: true,
        });
      }, 1500);

      if (onSuccess) {
        onSuccess(result.data);
      }
    } catch (err) {
      console.error("Submission error:", err);
      // Error toast is already shown above, no need to show again
    } finally {
      setLoading(false);
    }
  };

  // Simplified section locking logic
  const getSectionStatus = (sectionId) => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    const activeIndex = sections.findIndex((s) => s.id === activeSection);

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
      // Check founder section completion
      if (activeIndex < 1 && sectionIndex >= 1) {
        if (!getSectionCompletion("founder")) {
          return { locked: true, canNavigate: false };
        }
      }
      // Check startup section completion
      if (activeIndex < 2 && sectionIndex >= 2) {
        if (!getSectionCompletion("startup")) {
          return { locked: true, canNavigate: false };
        }
      }
    }

    return { locked: false, canNavigate: true };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated with background image */}
      <div className="relative w-full flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/Submission_Hero.png"
            alt="EDC Startup Submission Background"
            className="w-full h-full object-cover scale-105 brightness-80 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Animated Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {/* Animated Heading */}
          <div className="animate-fade-in-up">
            {/* <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#FED853] to-[#FED853]/80 rounded-2xl mb-8 shadow-2xl animate-pulse-slow">
              <Rocket className="w-12 h-12 text-gray-900" />
            </div> */}

            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white drop-shadow-lg text-center mb-6 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-[#FED853] via-[#FED853]/90 to-[#FED853]/80 bg-clip-text text-transparent">
                EDC Is Open To Ideas
              </span>
            </h1>

            {/* <p className="text-2xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto text-center animate-fade-in-up animation-delay-200">
              Submit your startup for pre-incubation and get expert mentorship, funding, and resources
            </p> */}

            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto text-center animate-fade-in-up animation-delay-300">
              Entrepreneurship Development Cell at BIT Mesra is your launchpad
              to transform ideas into successful ventures. We provide the
              ecosystem, mentorship, and opportunities to help your startup
              thrive.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <Shield className="w-6 h-6 text-[#FED853]" />
              <span className="text-lg font-medium">Expert Mentorship</span>
            </div>
            <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <Award className="w-6 h-6 text-[#FED853]" />
              <span className="text-lg font-medium">Funding Opportunities</span>
            </div>
            <div className="flex items-center gap-3 text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <Clock className="w-6 h-6 text-[#FED853]" />
              <span className="text-lg font-medium">Fast-track Growth</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-xl mx-auto animate-fade-in-up animation-delay-500">
            <div className="bg-gradient-to-r from-[#FED853]/20 to-transparent p-6 rounded-2xl border border-[#FED853]/30 mb-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Submit Your Ideas for Pre-Incubation
              </h3>
              <p className="text-gray-200">
                EDC will help you grow. Share your innovative ideas and get
                access to our complete startup support ecosystem including
                mentorship, funding, and networking opportunities.
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-8 h-8 text-[#FED853]" />
        </div>
      </div>

      {/* Main Form Section */}
      <div
        id="submission-form"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Startup Submission Form
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete all sections below to submit your startup for
            pre-incubation.
            <span className="text-[#FED853] font-semibold">
              {" "}
              * Required fields
            </span>
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
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                Application Sections
              </h3>
              <div className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const { locked, canNavigate } = getSectionStatus(section.id);
                  const isComplete = getSectionCompletion(section.id);
                  const isRequired = ["founder", "startup"].includes(
                    section.id
                  );

                  return (
                    <button
                      key={section.id}
                      onClick={() =>
                        canNavigate && navigateToSection(section.id)
                      }
                      disabled={locked}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-[#FED853] text-gray-900 shadow-md"
                          : locked
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive ? "bg-white/20" : "bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{section.label}</span>
                        {isRequired && (
                          <span className="text-xs text-red-500">*</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isComplete && isRequired && !isActive && (
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
                  <p className="text-sm font-medium text-gray-700">
                    Required Progress
                  </p>
                  <span className="text-sm font-bold text-[#FED853]">
                    {
                      [
                        getSectionCompletion("founder"),
                        getSectionCompletion("startup"),
                      ].filter(Boolean).length
                    }
                    /2
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FED853] to-[#FED853]/80 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        ([
                          getSectionCompletion("founder"),
                          getSectionCompletion("startup"),
                        ].filter(Boolean).length /
                          2) *
                        100
                      }%`,
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
                      {sections.find((s) => s.id === activeSection)?.label}{" "}
                      Details
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {activeSection === "founder" &&
                        "Tell us about yourself (Required)"}
                      {activeSection === "startup" &&
                        "Describe your startup idea (Required)"}
                      {activeSection === "market" &&
                        "Define your target market (Optional)"}
                      {activeSection === "technical" &&
                        "Technical implementation details (Optional)"}
                      {activeSection === "team" &&
                        "Your team members (Optional)"}
                      {activeSection === "additional" &&
                        "Additional information (Optional)"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FED853]/10 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      Section{" "}
                      {sections.findIndex((s) => s.id === activeSection) + 1} of{" "}
                      {sections.length}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                {/* Error Summary for Current Section */}
                {(() => {
                  const currentSection = sections.find(
                    (s) => s.id === activeSection
                  );
                  const sectionErrors = currentSection?.fields
                    .filter((field) => errors[field])
                    .map((field) => ({
                      field,
                      message: errors[field]?.message,
                    }))
                    .filter((e) => e.message);

                  if (sectionErrors && sectionErrors.length > 0) {
                    return (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-red-800 mb-2">
                              Please fix the following errors:
                            </p>
                            <ul className="text-sm text-red-700 space-y-1">
                              {sectionErrors.map((err, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-red-500">•</span>
                                  <span>{err.message}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Founder Section */}
                {activeSection === "founder" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="name"
                        label="Full Name"
                        required
                        placeholder="John Smith"
                        maxLength={255}
                        control={control}
                      />
                      <FormField
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        placeholder="john@example.com"
                        control={control}
                      />
                      <FormField
                        name="contactNumber"
                        label="Contact Number"
                        type="tel"
                        placeholder="9999999999"
                        control={control}
                      />
                      <FormField
                        name="batch"
                        label="Batch"
                        placeholder="2024"
                        maxLength={10}
                        control={control}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          name="rollNumber"
                          label="Roll Number"
                          placeholder="BTXX/ZZZZZ/YY"
                          maxLength={20}
                          control={control}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Startup Section */}
                {activeSection === "startup" && (
                  <div className="space-y-6">
                    <FormField
                      name="title"
                      label="Startup Title"
                      required
                      placeholder="Enter your startup name"
                      maxLength={50}
                      control={control}
                    />
                    <FormField
                      name="oneLiner"
                      label="One-liner Description"
                      required
                      placeholder="Briefly describe your startup in one sentence"
                      maxLength={500}
                      control={control}
                    />
                    <FormField
                      name="problemStatement"
                      label="Problem Statement"
                      required
                      rows={4}
                      placeholder="What problem are you solving?"
                      maxLength={2000}
                      control={control}
                    />
                    <FormField
                      name="solution"
                      label="Your Solution"
                      required
                      rows={4}
                      placeholder="How does your startup solve this problem?"
                      maxLength={2000}
                      control={control}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Current Stage <span className="text-red-500">*</span>
                      </label>
<<<<<<< HEAD
                      <Controller
=======
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
                      <p className="mt-1 text-xs text-gray-500">5–50 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        One-liner Description *
                        {sectionErrors.startup?.oneLiner && (
                          <span className="text-red-500 text-sm ml-2">
                            {sectionErrors.startup.oneLiner}
                          </span>
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
                      <p className="mt-1 text-xs text-gray-500">10–500 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Problem Statement *
                        {sectionErrors.startup?.problemStatement && (
                          <span className="text-red-500 text-sm ml-2">
                            {sectionErrors.startup.problemStatement}
                          </span>
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
                      <p className="mt-1 text-xs text-gray-500">20–2000 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Your Solution *
                        {sectionErrors.startup?.solution && (
                          <span className="text-red-500 text-sm ml-2">
                            {sectionErrors.startup.solution}
                          </span>
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
                      <p className="mt-1 text-xs text-gray-500">20–2000 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Current Stage *
                      </label>
                      <select
>>>>>>> b239597 (feat: added blogs page and resolved conflicts)
                        name="currentStage"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition appearance-none bg-white"
                          >
                            <option value="IDEA">🚀 Idea Stage</option>
                            <option value="PROTOTYPE">
                              🔧 Prototype Development
                            </option>
                            <option value="EARLY_CUSTOMERS">
                              👥 Early Customers
                            </option>
                            <option value="REVENUE">
                              💰 Generating Revenue
                            </option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Market Section - OPTIONAL */}
                {activeSection === "market" && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional but recommended. You can
                        skip if not applicable.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="uniqueness"
                        label="Uniqueness Proposition"
                        rows={3}
                        placeholder="What makes your startup unique?"
                        maxLength={1000}
                        control={control}
                      />
                      <FormField
                        name="marketSize"
                        label="Target Market Size"
                        rows={3}
                        placeholder="Estimated market size and growth"
                        maxLength={1000}
                        control={control}
                      />
                      <FormField
                        name="targetCustomer"
                        label="Target Customer Profile"
                        rows={3}
                        placeholder="Describe your ideal customer"
                        maxLength={1000}
                        control={control}
                      />
                      <FormField
                        name="businessModel"
                        label="Business Model"
                        rows={3}
                        placeholder="How do you plan to make money?"
                        maxLength={1000}
                        control={control}
                      />
                    </div>
                    <FormField
                      name="competitors"
                      label="Competitors Analysis"
                      rows={4}
                      placeholder="List your main competitors and your advantages"
                      maxLength={1000}
                      control={control}
                    />
                  </div>
                )}

                {/* Technical Section - OPTIONAL */}
                {activeSection === "technical" && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Fill only if you have
                        technical details to share.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="techStack"
                        label="Technology Stack"
                        placeholder="React, Node.js, MongoDB, etc."
                        maxLength={500}
                        control={control}
                      />
                      <FormField
                        name="websiteUrl"
                        label="Website URL"
                        type="url"
                        placeholder="https://yourstartup.com"
                        control={control}
                      />
                      <FormField
                        name="demoUrl"
                        label="Demo URL"
                        type="url"
                        placeholder="https://demo.yourstartup.com"
                        control={control}
                      />
                      <FormField
                        name="pitchDeckUrl"
                        label="Pitch Deck URL"
                        type="url"
                        placeholder="https://drive.google.com/your-pitch-deck"
                        control={control}
                      />
                    </div>
                  </div>
                )}

                {/* Team Section - OPTIONAL */}
                {activeSection === "team" && (
                  <div className="space-y-8">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Add team members if
                        applicable.
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
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Team member name"
                            value={teamMember.name}
                            onChange={handleTeamMemberChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.name
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.name}
                            </p>
                          )}
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
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.email
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            name="contactNumber"
                            placeholder="Optional"
                            value={teamMember.contactNumber}
                            onChange={handleTeamMemberChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.contactNumber
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.contactNumber && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.contactNumber}
                            </p>
                          )}
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
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.role
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.role && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.role}
                            </p>
                          )}
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
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.batch
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.batch && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.batch}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Roll Number
                          </label>
                          <input
                            type="text"
                            name="rollNumber"
                            placeholder="Optional"
                            value={teamMember.rollNumber}
                            onChange={handleTeamMemberChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FED853] focus:border-transparent transition ${
                              teamMemberErrors.rollNumber
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {teamMemberErrors.rollNumber && (
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {teamMemberErrors.rollNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        disabled={!teamMember.name}
                        className="px-6 py-3 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-semibold rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                        Add Team Member
                      </button>
                    </div>

                    {/* Team Members List */}
                    {teamMembers.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Team Members ({teamMembers.length})
                        </h4>
                        <div className="space-y-3">
                          {teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#FED853]/50 transition group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#FED853]/20 to-[#FED853]/10 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {member.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {member.role || "Team Member"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {member.email}
                                  </p>
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
                {activeSection === "additional" && (
                  <div className="space-y-6">
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 text-sm">
                        💡 This section is optional. Add any additional
                        information you'd like to share.
                      </p>
                    </div>
                    <FormField
                      name="additionalInfo"
                      label="Additional Information"
                      rows={6}
                      placeholder="Any additional details, challenges, or achievements you'd like to share..."
                      maxLength={2000}
                      control={control}
                    />
                    <FormField
                      name="specificGuidance"
                      label="Specific Guidance Needed"
                      rows={6}
                      placeholder="What specific areas would you like guidance on?"
                      maxLength={2000}
                      control={control}
                    />
                    <FormField
                      name="otherLinks"
                      label="Other Links"
                      placeholder="Any other relevant links (GitHub, LinkedIn, etc.)"
                      maxLength={1000}
                      control={control}
                    />
                  </div>
                )}

                {/* Navigation & Submit */}
                <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    {activeSection !== "founder" && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition flex items-center gap-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Previous
                      </button>
                    )}
                    {activeSection !== "additional" && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        {["market", "technical", "team", "additional"].includes(
                          activeSection
                        )
                          ? "Next (Optional)"
                          : "Next Section"}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {activeSection === "additional" && (
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-[#FED853] to-[#FED853]/90 text-gray-900 font-bold rounded-xl hover:from-[#FED853]/90 hover:to-[#FED853]/80 transition-all flex items-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading || isSubmitting ? (
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
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-6 bg-gradient-to-r from-[#FED853]/10 to-transparent rounded-2xl border border-[#FED853]/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#FED853] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Your Data is Secure
              </h4>
              <p className="text-sm text-gray-600">
                All information submitted is confidential and will only be used
                for evaluation purposes. Only Founder and Startup sections are
                required. Market, Technical, Team, and Additional sections are
                optional.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg mb-2">
            Entrepreneurship Development Cell - BIT Mesra
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved. Turning ideas into
            successful ventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
