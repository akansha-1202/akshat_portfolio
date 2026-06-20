export const profile = {
  name: "Akshat Verma",
  title: "Graphic Designer, Video Editor & Digital Marketer",
  location: "Lucknow, Uttar Pradesh, India",
  email: "akshatv0019@gmail.com",
  phone: "+91 9565072333",
  whatsapp: "916388600616",
  tagline:
    "Helping brands grow through design-driven strategy, creative storytelling, and scroll-stopping Meta ad creatives.",
  bio: "Creative and passionate Graphic Designer, Video Editor, and Digital Marketer with hands-on experience in designing, branding, and digital promotions. I started at Pathshala Institute creating impactful designs and managing social media, currently edit for The Menta YouTube channel, and freelance with Anon India on AI-powered ad videos and real estate Meta creatives. I believe in continuous learning — ensuring my work always matches the latest trends and audience expectations.",
  languages: ["Hindi", "English"],
  socials: {
    linkedin: "https://www.linkedin.com/in/akshatverm-gd-ve/",
    instagram: "#",
    behance: "#",
  },
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Clients Served" },
  { value: 50, suffix: "+", label: "Creatives Delivered" },
  { value: 2, suffix: "", label: "Years Experience" },
  { value: 8, suffix: "+", label: "Tools Mastered" },
];

export const driveFolderUrl =
  "https://drive.google.com/drive/folders/1Ia8W1MwLhpN3DGmSyk9xv-vAcONBAlJC";

/**
 * Each company has 2 work categories (matches Google Drive subfolders).
 * Add driveFolderId per category + driveFileId per item — no download needed.
 */
export const companies = [
  {
    id: "anon-india",
    title: "Anon India",
    subtitle: "Real Estate Meta Ads & Branding",
    description:
      "High-conversion graphic designs and video ad creatives for Meta campaigns — project launches, event promotions, and lead-generation for real estate brands.",
    poster: "/work/anon-india/poster.svg",
    featured: true,
    gradient: "from-orange-600/40 to-red-900/40",
    categories: [
      {
        id: "graphic-design",
        label: "Graphic Design",
        icon: "🎨",
        kind: "posts",
        description:
          "Static ads, social posts, carousels, and branding creatives for real estate and construction campaigns.",
        driveFolderId: "1akqLSzE-j3l6RgB6A7KT9D-ArHqK5aeq",
        items: [
          {
            id: "anon-post-1",
            title: "IRIS Broadway — Commercial Ad",
            type: "image",
            driveFileId: "1w2yVR5u6hHM9kn-uAeJpF0baD1-HZ2ES",
          },
          {
            id: "anon-post-2",
            title: "IRIS Broadway — Commercial Ad",
            type: "image",
            driveFileId: "1f3prTzmCn140J8pYnrI7Wr3uTAUu5sqf",
          },
          {
            id: "anon-post-3",
            title: "IRIS Broadway — Commercial Ad",
            type: "image",
            driveFileId: "1bAlaHat7G-QciE2IadwoIc66vBhyxoD7",
          },
          {
            id: "anon-post-4",
            title: "IRIS Broadway — Commercial Ad",
            type: "image",
            driveFileId: "1K9T2NyeWQi61Jdoz9DdyO52QowJZl5UT",
          },
        ],
      },
      {
        id: "videos",
        label: "Videos",
        icon: "🎬",
        kind: "videos",
        description:
          "Promotional reels, video ads, and AI-powered ad content optimized for Facebook & Instagram.",
        driveFolderId: "1tHXrL2H2QxrNjMIHGbtohiZccWM6kisb",
        items: [
          {
            id: "anon-reel-1",
            title: "Anon India — Promo Reel",
            type: "video",
            driveFileId: "1syFUa7ci-xCiwF83dUD5fFAobXJGtbRd",
          },
          {
            id: "anon-reel-2",
            title: "Anon India — Promo Reel",
            type: "video",
            driveFileId: "1ujZV_P4-WG7vYqM9rsTonhSXZowlZXwR",
          },
        ],
      },
    ],
  },
  {
    id: "pathshala",
    title: "Pathshala Institute",
    subtitle: "Education Brand Creatives",
    description:
      "Marketing creatives and promotional videos for an education institute — posters, social posts, reels, and motion graphics.",
    poster: "/work/pathshala/poster.svg",
    featured: false,
    gradient: "from-blue-600/40 to-indigo-900/40",
    categories: [
      {
        id: "post",
        label: "Post",
        icon: "📱",
        kind: "posts",
        description:
          "Social media posts, posters, banners, and infographics for student outreach and batch promotions.",
        driveFolderId: "18OM6gjPU44Sv7bdwB5fxjfeuagO_oByZ",
        items: [
          {
            id: "pathshala-post-1",
            title: "Pathshala Institute — Poster",
            type: "image",
            driveFileId: "1886adj_Zz41whWPcUXUkqcTzk79sCdoA",
          },
          {
            id: "pathshala-post-2",
            title: "Pathshala Institute — Poster",
            type: "image",
            driveFileId: "1pTuXq1KZjik8iTps54J0VG2dFr9SoQWO",
          },
          {
            id: "pathshala-post-3",
            title: "Pathshala Institute — Poster",
            type: "image",
            driveFileId: "1MIVn6NzxndV-b_D6z2HKq9sWvlmU7pe0",
          },
          {
            id: "pathshala-post-4",
            title: "Pathshala Institute — Poster",
            type: "image",
            driveFileId: "1SMGJ1vZEO4H8PyPjLGsxdzPGvovrjEvT",
          }
        ],
      },
      {
        id: "video",
        label: "Video",
        icon: "🎬",
        kind: "videos",
        description:
          "Educational and promotional reels edited for YouTube and social platforms.",
        driveFolderId: "12yZU-pT5-uB3mT8107LFWrxC4dT50J0R",
        items: [
          {
            id: "pathshala-video-1",
            title: "Pathshala Institute — Video",
            type: "video",
            driveFileId: "1kYBboLy2-2EfBPY3c7tjP22QicQBQq3m",
          }
        ],
      },
    ],
  },
  {
    id: "the-menta",
    title: "The Menta",
    subtitle: "YouTube, Animation & Learning Content",
    description:
      "Design, animation, and video editing for an education brand — PPTs, YouTube content, reels, and digital ads.",
    poster: "/work/the-menta/poster.svg",
    featured: false,
    gradient: "from-emerald-600/40 to-teal-900/40",
    categories: [
      {
        id: "ppt",
        label: "The Menta PPT",
        icon: "📊",
        kind: "ppt",
        description:
          "Structured presentation decks and learning slides for video and educational content.",
        driveFolderId: "1fI2ejSITOVIef1PC6vw7qCrFV8E3DTS-",
        items: [
          {
            id: "the-menta-ppt-1",
            title: "The Menta PPT",
            type: "ppt",
            driveFileId: "1zxV2F0HlJFlXXNrXugbOPK87FZsyvKsZ",
          },
          {
            id: "the-menta-ppt-2",
            title: "The Menta PPT",
            type: "ppt",
            driveFileId: "1voY6mEA90ErzkmDMqBIRobHWsaGtXLm5",
          },
          {
            id: "the-menta-ppt-3",
            title: "The Menta PPT",
            type: "ppt",
            driveFileId: "1mQ5mgCmaCRtiBCyage4ACOV20g-LlFih",
          },
          {
            id: "the-menta-ppt-4",
            title: "The Menta PPT",
            type: "ppt",
            driveFileId: "1tUXc6dV6sPNGCrm2dn5m1iuMMdKswu7z",
          },
        ],
      },
      {
        id: "video",
        label: "Video",
        icon: "🎬",
        kind: "videos",
        description:
          "YouTube edits, animated content, reels, and short-form videos with engaging storytelling.",
        driveFolderId: "",
        items: [
          {
            id: "the-menta-video-1",
            title: "Top IIT CSE Cutoff 2025 (JEE Advanced) ",
            type: "video",
            driveFileId: "1gY9rzamcxOhJFhUoBUmdxpWbU0f5rrgH",
          },
          {
            id: "the-menta-video-2",
            title: "अब Counselling होगी और भी आसान !",
            type: "video",
            driveFileId: "1YEqO905m4mJ_3YAHeLpk2RjeLSRnHt52",
          },
          {
            id: "the-menta-video-3",
            title: "NTA Notification",
            type: "video",
            driveFileId: "1YEqO915s4Bj_OoqPKonQwe0PK89Wa38CsDfE7P",
          }
        ],
      },
    ],
  },
  {
    id: "video-edit",
    title: "Video Edit Collection",
    subtitle: "Reels & Promotional Edits",
    description:
      "A curated collection of short-form reels and promotional edits across brands and campaigns.",
    poster: "/work/video-edit/poster.svg",
    featured: false,
    gradient: "from-purple-600/40 to-violet-900/40",
    categories: [
      {
        id: "reels",
        label: "Reels",
        icon: "📲",
        kind: "videos",
        description:
          "Short-form vertical reels crafted for Instagram and Facebook engagement.",
        driveFolderId: "",
        items: [],
      },
      {
        id: "promos",
        label: "Promo Edits",
        icon: "✂️",
        kind: "videos",
        description:
          "Promotional video edits, ad cuts, and campaign highlight reels.",
        driveFolderId: "",
        items: [],
      },
    ],
  },
];

// Used by Hero collage — same data, shorter alias
export const projects = companies;

export const services = [
  {
    icon: "📱",
    title: "Social & Meta Ads",
    description:
      "Scroll-stopping static, carousel, and story creatives for Facebook & Instagram — built for leads, project launches, and event promotions in real estate and branding.",
    highlights: ["Static & carousel ads", "Story creatives", "Lead-gen campaigns"],
  },
  {
    icon: "🎬",
    title: "Video Editing & Reels",
    description:
      "YouTube edits, promotional reels, motion graphics, and AI-powered ad videos with engaging storytelling and platform-optimized pacing.",
    highlights: ["YouTube & reels", "Motion graphics", "AI ad videos"],
  },
  {
    icon: "✨",
    title: "Brand & Visual Design",
    description:
      "Logos, brochures, infographics, and campaign visuals that maintain brand consistency while driving digital marketing goals.",
    highlights: ["Logos & brochures", "Infographics", "Campaign visuals"],
  },
];

export const experience = [
  {
    company: "Anon India",
    role: "Freelance Graphic Designer & Ads Video Creator",
    period: "Nov 2025 – Present",
    responsibilities: [
      "Create high-conversion Meta ad creatives (static, carousel, story) for real estate lead generation.",
      "Design social media posts, reels, project launch creatives, and event promotion campaigns.",
      "Build video ad creatives optimized for Facebook & Instagram with branding-consistent, premium layouts.",
      "Collaborate with the marketing team on audience psychology and platform-specific requirements.",
    ],
  },
  {
    company: "The Menta",
    role: "Graphic Designer, Video Editor & Animator",
    period: "May 2025 – Present",
    responsibilities: [
      "Edit YouTube videos, reels, and educational content with clear visual storytelling.",
      "Develop animated content, logos, brochures, and digital ads for social media marketing.",
      "Implement animation techniques to enhance marketing materials and brand campaigns.",
      "Work in a fast-paced creative team focused on growth and innovation.",
    ],
  },
  {
    company: "Pathshala Institute",
    role: "Graphic Designer & Video Editor",
    period: "Oct 2024 – Dec 2025",
    responsibilities: [
      "Designed posters, banners, social media graphics, and infographics for educational branding.",
      "Edited educational and promotional videos using Premiere Pro and After Effects.",
      "Created motion graphics to simplify complex educational concepts for digital platforms.",
      "Managed social media presence and contributed to batch and event promotions.",
    ],
  },
];

export const toolkit = [
  {
    category: "Design",
    icon: "🎨",
    description: "Visual identity, layouts, and polished static creatives.",
    tools: ["Canva", "Adobe Photoshop", "Branding", "Infographics"],
  },
  {
    category: "Video & Motion",
    icon: "🎬",
    description: "Editing, animation, and motion for social and YouTube.",
    tools: [
      "CapCut",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Motion Graphics",
    ],
  },
  {
    category: "Marketing & AI",
    icon: "📈",
    description: "Ad creatives, content strategy, and AI-powered video.",
    tools: [
      "Meta Ads Creatives",
      "AI Video Creator",
      "Content Strategy",
      "Social Media Marketing",
    ],
  },
];

export const education = [
  {
    title: "Bachelor of Arts — History",
    institution: "University of Lucknow",
    period: "2022 – Present",
    description:
      "Pursuing BA while building a career in graphic design, video editing, and digital marketing.",
    icon: "🎓",
    type: "Degree",
  },
  {
    title: "Computer Operator & Programming Assistant (COPA)",
    institution: "Information Technology Institute (ITI)",
    period: "Sep 2024",
    description: "NSQF certification in computer operations and programming.",
    icon: "💻",
    type: "Certification",
  },
  {
    title: "Digital Entrepreneurship Ka Mahakumbh",
    institution: "Zinmatt",
    period: "Jul 2025",
    description:
      "10-day intensive program on digital entrepreneurship and online earning strategies.",
    icon: "🚀",
    type: "Program",
  },
  {
    title: "AI Powered Digital Marketing with SEO",
    institution: "Pankaj Kumar SEO",
    period: "Completed",
    description:
      "Training in AI-driven digital marketing, content marketing, and search engine optimization.",
    icon: "🤖",
    type: "Certification",
  },
];

export const marqueeItems = [
  "Design",
  "Edit",
  "Meta Ads",
  "Reels",
  "Branding",
  "Motion Graphics",
  "Real Estate",
  "YouTube",
];
