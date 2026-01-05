import { Users, Building2, GraduationCap, Heart, LibraryBig, MessageSquare, LineChart, Shield, Settings } from 'lucide-react'

export const links =[
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
]

export  const userTypes = [
    {
      id:1,
      icon: Users,
      title: "Small Businesses",
      description: "Our form builder provides complete automation of customer feedback, lead generation, and contact forms for growing businesses"
    },
    {
      id:2,
      icon: Building2,
      title: "Enterprise Organizations", 
      description: "Our form management software provides full automation of data collection, employee surveys, and compliance forms"
    },
    {
      id:3,
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Our platform provides seamless automation of student registrations, course evaluations, and academic surveys"
    },
    {
      id:4,
      icon: Heart,
      title: "Healthcare & Nonprofits",
      description: "Our intelligent forms streamline patient intake, volunteer registration, and donation collection with secure data handling"
    }
  ]

  export const menuList =[
    {
        id:1,
        name: "My Forms",
        path:"/dashboard",
        icon : LibraryBig
    },
      {
        id:5,
        name: "Responses",
        path:"/dashboard/responses",
        icon : MessageSquare
    },
      {
        id:2,
        name: "Analytics",
        path:"/dashboard/analytics",
        icon : LineChart
    },
      {
        id:3,
        name: "Settings",
        path:"/dashboard/settings",
        icon : Settings
    },
      {
        id:4,
        name: "Upgrade",
        path:"/dashboard/upgrade",
        icon : Shield
    }
  ]