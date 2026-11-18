export interface ServiceItem {
  id: string;
  category: "Brand & Identity" | "Creative Content Production" | "Digital Experiences: Websites & Apps" | "Strategic Marketing & Paid Advertising" | "AI Creative Studio";
  title: string;
  tagline: string;
  description: string;
  subservices: string[];
  image: string;
  video?: string;
  deliverables: string[];
  highlight: string;
  ctaText?: string;
  highlightBadge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: "Brand Identity" | "Film & Photography" | "Digital & Web" | "Generative AI";
  year: string;
  heroImage: string;
  secondaryImages: string[];
  tagline: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  servicesProvided: string[];
}

export interface CollectiveMember {
  name: string;
  role: string;
  specialty: string;
  location: string;
  image: string;
  bio: string;
}

export const RAGE_BRAND = {
  name: "Rage Creative",
  headline: "Build a Brand People Remember.",
  subheading:
    "Rage Creative combines strategy, creativity and intelligent technology to build brands, content and digital experiences that help ambitious businesses grow with confidence.",
  positioning: "Creative Studio & Collaborative Ecosystem — Where Human Creativity Meets Intelligent Technology.",
  ceo: "Gareth Ellis",
  ceoTitle: "CEO & Founder",
  phone: "072 786 4383",
  email: "hello@ragecreative.co.za",
  businessEmail: "hello@ragecreative.co.za",
  website: "ragecreative.co.za",
  address: "258 Main Avenue, Ferndale, Randburg, South Africa",
  socials: {
    facebook: "https://www.facebook.com/RageCreativeAgency",
    instagram: "https://www.instagram.com/ragecreativeagency/",
  },
  principles: [
    {
      title: "Strategy Before Design",
      desc: "Every visual asset is rooted in commercial objectives and distinct market positioning.",
    },
    {
      title: "Human Creativity Meets Intelligent Technology",
      desc: "AI doesn't replace creators; it empowers them to explore bolder horizons in a fraction of the time.",
    },
    {
      title: "Collaborative Ecosystem",
      desc: "Rather than rigid agency overheads, we assemble hand-picked creative teams tailored to every brief.",
    },
    {
      title: "Creativity That Creates Momentum",
      desc: "We measure success by memorable impressions, brand authority, and measurable business growth.",
    },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: "branding",
    category: "Brand & Identity",
    title: "Brand & Identity",
    tagline: "Enduring identity systems that command authority in saturated markets.",
    description:
      "We forge brand identities that stand apart in saturated markets. We delve deep into brand psychology and your story, developing timeless typography, bespoke wordmarks, comprehensive design tokens, language, and tone of voice that make your brand memorable.",
    subservices: [
      "Logo & Bespoke Wordmark Design",
      "Brand Psychology & Strategy",
      "Comprehensive Design Tokens",
      "Language & Tone of Voice Guidelines",
      "Luxury Print & Packaging Architecture",
    ],
    image: "/images/Untitled_design_kxtrta.webp",
    video: "/images/Untitled_design_kxtrta_opt.mp4",
    deliverables: [
      "Vector Master Asset Kit",
      "Brand Pack Composition (Tokens & Guidelines)",
      "Digital & Print Stationery",
      "Brand Tone of Voice Playbook",
    ],
    highlight: "Timeless Didone typography paired with commercial differentiation.",
    ctaText: "Brand Pack Composition",
    highlightBadge: "Identity Foundations",
  },
  {
    id: "creative-production",
    category: "Creative Content Production",
    title: "Creative Content Production",
    tagline: "High-calibre photography and film crafted with artistic precision.",
    description:
      "We orchestrate high-calibre photography and film that grabs attention across print, digital, and commercial platforms that speaks to your audience. From studio fashion lookbooks to on-location cinema rigs, every frame is crafted with artistic precision no matter the scale or your requirement. We make the impossible possible at a fraction of the cost and time.",
    subservices: [
      "Fashion & Editorial Lookbooks",
      "On-Location Cinema Commercials",
      "Product Stills & High-End Macro",
      "Executive & Corporate Direction",
      "Omnichannel Video Campaigns",
    ],
    image: "/images/Gemini_Generated_Image_gtylr7gtylr7gtyl_snaray.webp",
    deliverables: [
      "4K Master ProRes Film Exports",
      "Retouched Commercial Stills",
      "Social Native Formats (9:16 / 1:1 / 16:9)",
      "Full Production Art Direction Deck",
    ],
    highlight: "Studio fashion lookbooks to on-location cinema rigs at unprecedented agility.",
    ctaText: "Explore Production Scope",
    highlightBadge: "Cinema & Editorial",
  },
  {
    id: "digital",
    category: "Digital Experiences: Websites & Apps",
    title: "Digital Experiences: Websites & Apps",
    tagline: "Fast, responsive digital destinations that feel like living magazine editorials.",
    description:
      "We design and build fast, responsive digital destinations that feel like living magazine editorials. No generic templates—every interaction, scroll nuance, and typographic hierarchy is tailored to your brand story and narrative, speaking a language that sets you apart.",
    subservices: [
      "Custom Crafted Studio Websites",
      "Interactive Digital Portfolios & Magazines",
      "Luxury E-Commerce (Shopify & Custom Headless)",
      "Responsive Web Applications & Portals",
      "Tailored UI/UX Design Systems in Figma",
    ],
    image: "/images/digital-experiences.jpg",
    deliverables: [
      "Production Web Application",
      "Figma UI/UX Component System",
      "Technical SEO & Sub-Second Loading Speed",
      "Responsive Mobile Optimization",
    ],
    highlight: "Living editorial aesthetic with fluid micro-interactions and zero bloat.",
    ctaText: "Custom Crafted Studio Websites",
    highlightBadge: "Digital Destinations",
  },
  {
    id: "marketing",
    category: "Strategic Marketing & Paid Advertising",
    title: "Strategic Marketing & Paid Advertising",
    tagline: "Data-driven acquisition engineered for predictable revenue and market authority.",
    description:
      "We marry compelling creative assets with data-driven paid acquisition advertising strategy. Rather than burning budget on generic noise, we test messaging systematically across different platforms to unlock predictable customer acquisition, growth and income generation. Let the experts take care of this for you",
    subservices: [
      "Meta Paid Advertising (Instagram & Facebook)",
      "Google Search & Performance Max Campaigns",
      "Systematic Creative Testing & Angle Optimization",
      "High-Converting Sales Funnels & Landing Pages",
      "Customer Acquisition & Growth Analytics",
    ],
    image: "/images/strategic-marketing-advertising.jpg",
    deliverables: [
      "High-Performing Creative Ad Variations",
      "Conversion Tracking & Attribution Setup",
      "Weekly & Monthly ROI Analytics & Reporting",
      "Predictable Customer Acquisition Strategy",
    ],
    highlight: "Systematic creative testing across Meta & Google to eliminate wasted ad spend.",
    ctaText: "Explore Growth Funnels",
    highlightBadge: "Weekly / Monthly ROI Analytics & Reporting",
  },
  {
    id: "ai-studio",
    category: "AI Creative Studio",
    title: "AI Creative Studio",
    tagline: "State-of-the-art generative workflows in an on-brand commercial production system.",
    description:
      "We integrate state-of-the-art generative workflows into an on-brand commercial production system. Human led, technology driven. From conceptualizing impossible campaign sets to automated asset generation, our AI Studio expands what is creatively possible, cutting production time and budgets to a fraction of the cost.",
    subservices: [
      "Generative Editorial Imagery & Lookbooks",
      "Impossible Architectural & Campaign Sets",
      "Rapid Conceptual Prototyping & Moodboarding",
      "High-Resolution Synthetic Art Direction",
      "Automated Multi-Channel Asset Generation",
    ],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "High-Resolution Synthetic Visual Master Files",
      "Custom Generative Prompt Architecture",
      "Bespoke Campaign Concept Decks",
      "Fraction-of-Cost Production Pipelines",
    ],
    highlight: "Human led, technology driven: expanding creative horizons at a fraction of traditional cost.",
    ctaText: "Explore AI Studio Scope",
    highlightBadge: "Generative Innovation",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "maison-vesper",
    title: "Maison Vesper",
    client: "Maison Vesper Paris",
    category: "Film & Photography",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "A seasonal haute couture campaign redefining modern Parisian minimalism.",
    challenge:
      "Maison Vesper needed to launch their Autumn/Winter capsule with an international campaign that broke away from conventional fashion photography while honouring classical tailoring.",
    solution:
      "Rage Creative directed a cinematic 35mm film series, paired with bespoke typography and a modular digital lookbook that allowed VIP clients to pre-order garments directly from the runway film.",
    results: [
      { metric: "+240%", label: "VIP Pre-Orders" },
      { metric: "1.4M", label: "Organic Impressions" },
      { metric: "Vogue", label: "Editorial Feature" },
    ],
    servicesProvided: ["Fashion Photography", "Cinematic Film", "Digital Lookbook", "Brand Campaign"],
  },
  {
    id: "aethelgard-ceramics",
    title: "Aethelgard Living",
    client: "Aethelgard Ceramics & Architecture",
    category: "Brand Identity",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "Tactile identity system and digital flagship for an architectural ceramics studio.",
    challenge:
      "An artisanal brand with exquisite physical craftsmanship struggled to translate its tactile quality to digital channels, losing premium market positioning.",
    solution:
      "We built a warm, stone-toned identity system using custom serif letterforms, embossed unboxing collateral, and an editorial e-commerce platform that mirrors the physical gallery experience.",
    results: [
      { metric: "R1.8M", label: "Launch Month Revenue" },
      { metric: "68%", label: "Repeat Collector Rate" },
      { metric: "0.8s", label: "E-Commerce Load Speed" },
    ],
    servicesProvided: ["Brand Identity", "Luxury Packaging", "Custom E-Commerce", "Art Direction"],
  },
  {
    id: "kinetica-ai",
    title: "Kinetica Neuro-Spatial",
    client: "Kinetica Labs Zurich",
    category: "Generative AI",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1633493106115-0d04c4f34604?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "Synthetic brand universe and AI-generated conceptual sets for deep-tech robotics.",
    challenge:
      "Translating abstract spatial computing concepts into tangible, inspiring visual worlds for tier-1 venture capital pitches without multi-million dollar physical production.",
    solution:
      "Deploying our proprietary generative visual pipelines, we rendered hyper-realistic lab environments, robotic prototypes, and tactile interactive holographic demonstrations.",
    results: [
      { metric: "$14M", label: "Series A Raised" },
      { metric: "7 Days", label: "Full Campaign Delivery" },
      { metric: "-70%", label: "Production Budget Saved" },
    ],
    servicesProvided: ["AI Creative Studio", "Synthetic Lookbooks", "Brand Architecture", "Pitch Deck Art Direction"],
  },
  {
    id: "aurora-digital",
    title: "Aurora Sound Architecture",
    client: "Aurora High Fidelity",
    category: "Digital & Web",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "Living digital magazine and bespoke audio configuration web destination.",
    challenge:
      "High-end acoustic manufacturer needed an immersive online presence matching the tactile beauty of their artisanal amplifiers.",
    solution:
      "Created a bespoke, dark editorial digital destination with responsive audio previews, custom typography, and frictionless direct-to-consumer order flows.",
    results: [
      { metric: "+180%", label: "Conversion Rate" },
      { metric: "4.2 min", label: "Avg Session Time" },
      { metric: "Awwwards", label: "Site of the Day" },
    ],
    servicesProvided: ["Digital Experience", "Web Design & Build", "Design System", "Editorial Layout"],
  },
  {
    id: "apex-motoring",
    title: "Apex Atelier Restomods",
    client: "Apex Automobili",
    category: "Film & Photography",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "High-octane commercial film and digital showroom for limited edition restomods.",
    challenge:
      "Capturing the auditory and mechanical perfection of custom-engineered collector vehicles for ultra-high-net-worth enthusiasts.",
    solution:
      "Multi-camera tracking rigs, binaural engine sound design, and an immersive digital configuration tool that allows collectors to tailor their builds in real-time.",
    results: [
      { metric: "12 / 12", label: "Allocations Sold Out" },
      { metric: "3.2M", label: "YouTube Film Views" },
      { metric: "+310%", label: "Qualified Inquiries" },
    ],
    servicesProvided: ["Commercial Film", "Automotive Photography", "Interactive Configurator", "PR Strategy"],
  },
  {
    id: "noir-botanique",
    title: "Noir Botanique",
    client: "Maison Noir Haute Parfumerie",
    category: "Brand Identity",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=85",
    secondaryImages: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=85",
    ],
    tagline: "Sensory macro product cinematography and precision Meta advertising campaign.",
    challenge:
      "Translating the ethereal scent notes of rare botanical extracts into visual and commercial desire.",
    solution:
      "Ultra-macro fluid captures, shadow-play lighting, and high-converting performance video ads optimized for discerning luxury consumers.",
    results: [
      { metric: "4.8x", label: "Blended ROAS" },
      { metric: "+420%", label: "Subscription Retainers" },
      { metric: "24h", label: "Sold Out Discovery Set" },
    ],
    servicesProvided: ["Product Macro Photography", "Brand Identity", "Performance Ads", "Paid Acquisition"],
  },
];

export const BRAND_ACCELERATOR = {
  header: "BRAND ACCELERATOR",
  tagline: "Your brand has potential. Let's accelerate it.",
  intro:
    "A clear brand strategy, stronger brand presence and ready-to-use content — all in one focused week. You don't need to start from scratch. You need to know what's working, what isn't, what makes your brand different, and exactly what to do next. The Brand Accelerator is our introductory brand experience designed to give you the clarity, strategy and practical tools you need to elevate your brand and start showing up with confidence.",
  bannerPill: "ONE WEEK. ONE CLEAR DIRECTION. ONE STRONGER BRAND. | Once-off investment of R4,000",
  price: "R4,000",
  turnaround: "1-Week Turnaround",
  deliverables: [
    {
      step: "01",
      title: "One-on-One Brand Discovery Session",
      desc: "A focused 1.5 hr session to understand your business, vision, audience, challenges, and goals — what's working, what's not working and how you can improve.",
    },
    {
      step: "02",
      title: "Brand Strategy & Presence Audit",
      desc: "A strategic review of your current presence to identify what works, inconsistencies, and key opportunities providing you with a concise brand strategy road map.",
    },
    {
      step: "03",
      title: "Brand Positioning & Messaging",
      desc: "Clarify brand purpose, audience targeting, unique value proposition, and communication framework.",
    },
    {
      step: "04",
      title: "Brand Opportunity Snapshot",
      desc: "Concise strategic overview highlighting high-impact priorities and quick win opportunities increasing income with minimal outlay.",
    },
    {
      step: "05",
      title: "Brand Kit Development",
      desc: "Essential visual foundations for a consistent, recognizable, and professional brand presence to get your brand noticed and remembered.",
    },
    {
      step: "06",
      title: "Paid Advertising Overview",
      desc: "Strategic evaluation of current advertising, spend, audience targeting, and customer journey recommending a clear path forward and alignment to maximize ROI beyond boosting posts",
    },
    {
      step: "07",
      title: "Logo, Website & Social Media Analysis",
      desc: "Expert audit of key digital touchpoints with actionable recommendations and feedback",
    },
    {
      step: "08",
      title: "Your Step-by-Step Brand Blueprint",
      desc: "Clear roadmap detailing immediate quick win priorities and execution steps — elevate your brand and income.",
    },
    {
      step: "09",
      title: "5 × On-Brand Digital Stills",
      desc: "Strategically aligned visual content ready for immediate deployment for ads or social media posting.",
    },
    {
      step: "10",
      title: "3 × On-Brand 15-Second Video Creatives",
      desc: "High-impact short-form videos tailored for modern social feeds or advertising designed to create impact, brand awareness and follower conversion.",
    },
    {
      step: "11",
      title: "8 × Scroll-Stopping Caption Compositions",
      desc: "Strategic well thought out copy to engage audiences, increase sales and drive conversion.",
    },
  ],
  qualifiers: [
    "Launching or preparing to launch.",
    "Outgrown current brand identity.",
    "Presence does not reflect product/service quality.",
    "Inconsistent messaging across web and social channels.",
    "Plenty of ideas, but lacking clear brand direction.",
    "Seeking high-level strategic guidance without committing to a full rebrand.",
  ],
  designedFor: [
    "Looking for a clear low cost blueprint to elevate their brand presence and increase revenue",
    "Short on time or resources where creative work could easily be outsourced",
    "Fits founders, SMEs, company owners, content creators, influencers, ambitious scale-ups and those wanting to build a more profitable business",
  ],
  outcomes: [
    {
      title: "Clarity",
      desc: "Know exactly who you are and what sets you apart.",
    },
    {
      title: "Direction",
      desc: "A step-by-step blueprint to execute with confidence.",
    },
    {
      title: "Consistency",
      desc: "Cohesive visual and verbal brand foundations.",
    },
    {
      title: "Content",
      desc: "Ready-to-use digital assets and copy.",
    },
    {
      title: "Confidence",
      desc: "Stop second-guessing your brand voice and market presence.",
    },
  ],
  ctaBox: {
    headline: "YOUR BRAND, ACCELERATED. R4,000 once-off. 1-week turnaround.",
    subtext:
      "Stop asking, 'How much does branding cost?' Start asking: 'What could a clearer, stronger, and more strategic brand be worth to my business?'",
    buttonText: "Book Your Brand Accelerator",
  },
};

export const COLLABORATIVE_ECOSYSTEM = {
  headline: "Great Brands Aren't Built Alone.",
  subheading:
    "We're creating a collaborative creative ecosystem where photographers, designers, developers, filmmakers, marketers and strategists can build something bigger together.",
  whyCollaborate: [
    {
      title: "Work on Paid Client Projects",
      desc: "Fair compensation for every brief. No speculative work or uncompensated pitches.",
    },
    {
      title: "Creative Freedom & High Calibre",
      desc: "Join projects that push aesthetic boundaries and elevate your portfolio.",
    },
    {
      title: "Intelligent Production Tools",
      desc: "Access our internal generative AI workflows and high-end studio infrastructure.",
    },
    {
      title: "Flexible Collaboration",
      desc: "Retain your freelance independence while partnering on premier commercial accounts.",
    },
  ],
  disciplines: [
    "Fashion & Editorial Photography",
    "Cinematography & Directing",
    "Brand Identity & Graphic Design",
    "Full-Stack Web Development",
    "Generative AI & Prompt Engineering",
    "Paid Media & Performance Marketing",
    "Copywriting & Brand Voice Strategy",
    "3D Animation & Motion Design",
  ],
  revenueModel: {
    title: "Direct Project Compensation & Collaborative Growth",
    description: "Every collaborator is paid directly and transparently on commercial engagements. We don't ask for speculative free pitches. As our ecosystem expands, key creative contributors gain access to recurring retainer accounts, cross-referral commissions, and frontier studio resources.",
  },
  rolesWanted: [
    "Commercial Photographers",
    "Cinematographers & Editors",
    "Brand & Identity Designers",
    "Full-Stack Web Developers",
    "Generative AI Artists",
    "Meta & Google Media Buyers",
  ],
};

export const TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Rage Creative transformed how we show up in the market. In less than 10 days, they delivered an identity system and campaign that felt like it belonged in Vogue. Our inbound inquiries tripled in 30 days.",
    author: "Elena Rostova",
    role: "Founder & Creative Director",
    company: "Maison Vesper Paris",
    rating: 5,
    project: "Haute Couture Campaign & Digital Flagship",
  },
  {
    id: "2",
    quote:
      "The Brand Accelerator package was the single highest-ROI investment we've ever made. The clarity on our messaging alone unlocked three corporate contracts within a fortnight.",
    author: "Markus Vance",
    role: "Managing Principal",
    company: "Aethelgard Ceramics",
    rating: 5,
    project: "Brand Accelerator & Identity Suite",
  },
  {
    id: "3",
    quote:
      "Their AI Studio is months ahead of traditional agencies. They gave us concept art and commercial visuals that would have taken 4 months and half a million rand to produce physically.",
    author: "Dr. Julian Weiss",
    role: "VP of Product",
    company: "Kinetica Neuro-Spatial",
    rating: 5,
    project: "Generative Brand Universe",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Immersion",
    desc: "We analyze your brand DNA, market positioning, audience motivations, and business goals to establish a clear creative hypothesis.",
  },
  {
    step: "02",
    title: "Strategic Architecture",
    desc: "We define the narrative framework, aesthetic direction, and technical requirements before committing a single pixel or camera frame.",
  },
  {
    step: "03",
    title: "High-Calibre Production",
    desc: "Senior craftspeople and frontier AI workflows collaborate to produce world-class imagery, web platforms, and copy with speed and fidelity.",
  },
  {
    step: "04",
    title: "Deployment & Scaling",
    desc: "We launch across digital, print, and paid acquisition channels with rigorous performance tracking and ongoing strategic support.",
  },
];
