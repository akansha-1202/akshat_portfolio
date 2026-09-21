export const profile = {
  name: "Akshat Verma",
  title: "Video Editor, Graphic Designer & AI Content Creator",
  location: "Lucknow, Uttar Pradesh, India",
  email: "akshatv0019@gmail.com",
  phone: "+91 9565072333",
  whatsapp: "916388600616",
  tagline:
    "Turning scripts and footage into scroll-stopping short-form video, Meta ad creatives, and AI-powered brand content.",
  bio: "Detail-oriented Video Editor, Graphic Designer, and AI Content Creator with hands-on experience turning raw footage, scripts, and creative assets into engaging short-form content for YouTube, Instagram, and Meta ads. Started at Pathshala Institute editing reels and social creatives, currently edit and design presentations for The Menta, and freelance with Anon India as a Graphic Designer & AI Video Creator — delivering promotional videos and high-conversion Meta ads for real estate, interior design, and construction clients.",
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
 * Five work sections — matches Cloudinary folders.
 * Order: ai_content → editing → anon_india → pathshala → the_menta
 */
export const companies = [
  {
    id: "ai_content",
    title: "AI Content",
    subtitle: "AI Content Creator — Ads & Motion",
    description:
      "AI-powered ad videos and generative motion pieces crafted as an AI Content Creator for brands and campaigns.",
    poster: "/work/ai-content/poster.svg",
    featured: true,
    gradient: "from-rose-600/40 to-orange-900/40",
    categories: [
      {
        id: "videos",
        label: "Videos",
        icon: "✨",
        kind: "videos",
        description: "AI video ads, product promos, and generative creatives.",
        items: [
          { id: "ai-1", title: "Penguin Anon India", type: "video", publicId: "Penguin_anon_india.mp4" },
          { id: "ai-2", title: "Moral Story", type: "video", publicId: "Moral_story.mp4" },
          { id: "ai-3", title: "Happy Ganesh", type: "video", publicId: "Happy_ganesh.mp4" },
          { id: "ai-4", title: "Ajewels Product Ad", type: "video", publicId: "Ajewels_Product_ads_video_demo.mp4" },
          { id: "ai-5", title: "Chandeliers & Pendant Lights", type: "video", publicId: "Chandeliers_Pendant_Lights.mp4" },
          { id: "ai-6", title: "HID Promo", type: "video", publicId: "HID.mp4" },
          { id: "ai-7", title: "BNF Promo", type: "video", publicId: "bnf3.mp4" },
        ],
      },
    ],
  },
  {
    id: "editing",
    title: "Editing",
    subtitle: "Reels & Promo Edits",
    description: "Short-form reels and promotional video edits across brands.",
    poster: "/work/video-edit/poster.svg",
    featured: false,
    gradient: "from-purple-600/40 to-violet-900/40",
    categories: [
      {
        id: "videos",
        label: "Videos",
        icon: "✂️",
        kind: "videos",
        description: "Reels, cuts, and campaign highlight edits.",
        items: [
          { id: "edit-1", title: "Ganesh Chaturthi Reel", type: "video", publicId: "Ganesh_chaturthi.mp4" },
          { id: "edit-2", title: "Vlogs Edit", type: "video", publicId: "vlogs.mp4" },
          { id: "edit-3", title: "Sumit Sales Reel", type: "video", publicId: "Sumit_Sales_1.mp4" },
          { id: "edit-4", title: "Sumit — Cut 2", type: "video", publicId: "Sumit2.mp4" },
          { id: "edit-5", title: "Indu Lights Promo", type: "video", publicId: "Indu_lights1.mp4" },
          { id: "edit-6", title: "Realtor Campaign", type: "video", publicId: "Realtor.mp4" },
          { id: "edit-7", title: "Akeel — Promo Edit", type: "video", publicId: "Akeel.mp4" },
        ],
      },
    ],
  },
  {
    id: "anon_india",
    title: "Anon India",
    subtitle: "AI Video Creator · Meta Ads & Branding",
    description:
      "Promotional and branding videos plus high-conversion Meta creatives for real estate, interior design, and construction clients.",
    poster: "/work/anon-india/poster.svg",
    featured: false,
    gradient: "from-orange-600/40 to-red-900/40",
    categories: [
      {
        id: "images",
        label: "Images",
        icon: "🎨",
        kind: "posts",
        description: "Static Meta ads, social posts, and branding creatives.",
        items: [
          { id: "anon-img-1", title: "IRIS Broadway — Commercial Ad", type: "image", publicId: "IRIS_BROADWAY.jpg" },
          { id: "anon-img-2", title: "IRIS Broadway — Brand Visual", type: "image", publicId: "IRIS_Broadway.jpg" },
          { id: "anon-img-3", title: "Interior Design Post", type: "image", publicId: "Anon_India_Interior_Design_Instagram_Post_1.png" },
          { id: "anon-img-4", title: "Campaign Creative", type: "image", publicId: "1.png" },
          { id: "anon-img-5", title: "IRIS Broadway — Promo Graphic", type: "image", publicId: "IRIS_BROADWAY.png" },
        ],
      },
      {
        id: "videos",
        label: "Videos",
        icon: "🎬",
        kind: "videos",
        description: "Short-form promotional and branding videos for social platforms.",
        items: [
          { id: "anon-vid-1", title: "Anon India — Awards Reel", type: "video", publicId: "Aonon_india_Awards.mp4" },
        ],
      },
    ],
  },
  {
    id: "pathshala",
    title: "Pathshala",
    subtitle: "Education Brand Creatives",
    description: "Posters, social posts, and promotional videos for Pathshala Institute.",
    poster: "/work/pathshala/poster.svg",
    featured: false,
    gradient: "from-blue-600/40 to-indigo-900/40",
    categories: [
      {
        id: "images",
        label: "Images",
        icon: "📱",
        kind: "posts",
        description: "Social posts, posters, and campaign graphics.",
        items: [
          { id: "path-img-1", title: "Institute Poster", type: "image", publicId: "1.jpg" },
          { id: "path-img-2", title: "Admission Open 2025", type: "image", publicId: "ADMISSION_OPEN_2025_8.jpg" },
          { id: "path-img-3", title: "Fun Fact Creative", type: "image", publicId: "FUN_FACT_1.jpg" },
          { id: "path-img-4", title: "Invitation Card", type: "image", publicId: "Invetation_Card.jpg" },
          { id: "path-img-5", title: "Brand Post", type: "image", publicId: "Pathshala_2.jpg" },
          {
            id: "path-img-6",
            title: "Campus Location",
            type: "image",
            publicId:
              "Near_lekhraj_Metro_Station_M-31_Sanjay_gandhi_puram_Faizabad_road_Indiranagar_Lucknow.jpg",
          },
          {
            id: "path-img-7",
            title: "Lifestyle Ad",
            type: "image",
            publicId:
              "a-bright-and-aspirational-lifestyle-adve_xpYuAQPOShGg1n8iWKAhhQ_1284qFwdQquM1IL_qUDGiA.jpeg",
          },
          { id: "path-img-8", title: "Campaign Creative", type: "image", publicId: "10.jpg" },
        ],
      },
      {
        id: "videos",
        label: "Videos",
        icon: "🎬",
        kind: "videos",
        description: "Promotional and educational reels.",
        items: [
          { id: "path-vid-1", title: "Address Reel", type: "video", publicId: "Address.mp4" },
        ],
      },
    ],
  },
  {
    id: "the_menta",
    title: "The Menta",
    subtitle: "YouTube Edits & Presentations",
    description:
      "End-to-end YouTube video editing and structured presentation decks for The Menta learning content.",
    poster: "/work/the-menta/poster.svg",
    featured: false,
    gradient: "from-emerald-600/40 to-teal-900/40",
    categories: [
      {
        id: "ppt",
        label: "PPT",
        icon: "📊",
        kind: "ppt",
        description: "Presentation decks and learning slides.",
        items: [
          { id: "menta-ppt-1", title: "IISER Overview", type: "ppt", publicId: "IISER.pdf" },
          { id: "menta-ppt-2", title: "1 Lakh to 5 Lakh", type: "ppt", publicId: "1_Lakh_to_5_Lakh.pdf" },
          { id: "menta-ppt-3", title: "NEET (UG) 2025", type: "ppt", publicId: "NEET_UG_2025.pdf" },
          { id: "menta-ppt-4", title: "NIT Round 5 Cut-Off 2025", type: "ppt", publicId: "NIT_COLLEGES_ROUND_5_Cut-Off_2025.pdf" },
        ],
      },
    ],
  },
];

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
    title: "Video Editing & AI Content",
    description:
      "YouTube edits, promotional reels, motion graphics, and AI-powered ad videos with engaging storytelling and platform-optimized pacing.",
    highlights: ["YouTube & reels", "AI content creation", "Motion graphics"],
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
    role: "Graphic Designer & AI Video Creator (Freelance)",
    period: "Nov 2025 – Present",
    responsibilities: [
      "Edit promotional and branding videos for short-form, vertical social platforms across real estate, interior design, and construction clients — with pacing and cuts built to maximize watch-through.",
      "Design high-conversion static and video ad creatives for Meta (Facebook & Instagram), combining audience psychology with platform guidelines for lead-gen and project-launch campaigns.",
      "Create AI-powered video content and brand visuals that stay consistent with client identity and campaign goals.",
    ],
  },
  // {
  //   company: "AI Content Creation",
  //   role: "AI Content Creator",
  //   period: "2025 – Present",
  //   responsibilities: [
  //     "Produce AI-powered ad videos and generative motion pieces for product promos, brand storytelling, and social campaigns.",
  //     "Blend AI tools with hands-on editing to deliver polished short-form creatives optimized for Instagram, YouTube, and Meta ads.",
  //     "Turn briefs and creative assets into scroll-stopping vertical (9:16) content with strong pacing, sound design, and visual continuity.",
  //   ],
  // },
  {
    company: "The Menta",
    role: "Video Editor & Presentation Designer",
    period: "May 2025 – Present",
    responsibilities: [
      "Edit YouTube videos end-to-end — cutting, sequencing, and pacing footage into clear, engaging narratives from the first few seconds.",
      "Build structured, professional PowerPoint presentations to support video and learning content with consistent visual style and messaging.",
    ],
  },
  {
    company: "Pathshala Institute",
    role: "Graphic Designer & Video Editor",
    period: "Oct 2024 – Jun 2025",
    responsibilities: [
      "Edited promotional reels and short-form videos for social media, using cuts, transitions, and background music suited to platform viewing habits.",
      "Created social media graphic creatives supporting institutional branding and outreach campaigns.",
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
      "AI Content Creator",
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
      "Pursuing BA while building a career in graphic design, video editing, and AI content creation.",
    icon: "🎓",
    type: "Degree",
  },
  {
    title: "Graphic Design — Hero to Zero",
    institution: "Vibhu Sir",
    period: "Sep 2025 – Present",
    description: "Hands-on graphic design training focused on practical creative skills.",
    icon: "🎨",
    type: "Training",
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
    title: "AI-Powered Digital Marketing with SEO",
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
  "AI Content",
  "Meta Ads",
  "Reels",
  "Branding",
  "Motion Graphics",
  "Real Estate",
  "YouTube",
];
