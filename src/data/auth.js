import { 
  Brain, 
  Sparkles,
  Network,
  Cloud,
  FormInput,
  BarChart3,
  Share2,
  Database
} from "lucide-react";

export const authData = {
  // App branding
  branding: {
    name: "FormForms",
    icon: FormInput,
    tagline: "AI-powered form builder for modern data collection"
  },

  // Features list
  features: [
    { icon: Brain, text: "AI-powered form creation" },
    { icon: Share2, text: "Share via public URL" },
    { icon: Database, text: "Collect responses easily" },
    { icon: BarChart3, text: "In-app analytics & insights" },
  ],

  // Floating icons for animation
  floatingIcons: [
    { Icon: FormInput, size: 24, color: "#4CAF4F" },
    { Icon: Brain, size: 20, color: "#4CAF4F" },
    { Icon: BarChart3, size: 22, color: "#4CAF4F" },
    { Icon: Share2, size: 18, color: "#4CAF4F" },
    { Icon: Database, size: 26, color: "#4CAF4F" },
    { Icon: Sparkles, size: 24, color: "#4CAF4F" },
    { Icon: Network, size: 20, color: "#4CAF4F" },
    { Icon: Cloud, size: 22, color: "#4CAF4F" },
  ],

  // Status badge
  statusBadge: {
    text: "Active Development • New features coming soon",
    color: "#4CAF4F"
  },

  // Clerk appearance settings
  clerkAppearance: {
    elements: {
      card: "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl shadow-[#4CAF4F]/10",
      headerTitle: "text-2xl font-bold text-gray-900",
      headerSubtitle: "text-gray-600",
      socialButtonsBlockButton: "border-gray-300 hover:border-[#4CAF4F]/50 hover:bg-gray-50",
      formButtonPrimary: "bg-gradient-to-r from-[#4CAF4F] to-emerald-500 hover:from-[#4CAF4F]/90 hover:to-emerald-500/90 text-white font-medium shadow-lg shadow-[#4CAF4F]/20",
      footerActionLink: "text-[#4CAF4F] hover:text-emerald-400",
      dividerLine: "bg-gray-200",
      dividerText: "text-gray-500",
      formFieldInput: "bg-white border-gray-300 text-gray-900 focus:border-[#4CAF4F] focus:ring-1 focus:ring-[#4CAF4F]",
      identityPreviewEditButton: "text-[#4CAF4F]",
      formResendCodeLink: "text-[#4CAF4F]",
    }
  }
};