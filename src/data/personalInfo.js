export const personalInfo = {
  name: "Rituraj Singh",
  title: "Full Stack Developer",
  subtitle: "B.Tech CSE @ LPU",
  tagline: "Peak Performance is my default setting. ⚡",
  headlines: [
    "Full Stack Developer",
    "Founder, Team WECODE",
    "Multi-Gold Medalist Athlete",
    "National & State Athlete",
    "Professional Anchor",
    "B.Tech CSE @ LPU",
  ],
  avatar: "/pfp.png",
  bio: `I don't believe in doing things halfway. Whether it's a scoreboard, a coding
    terminal, or a national stage, I play to win. I am a Computer Science Engineering
    student at Lovely Professional University with a foundation built on extreme
    discipline and high performance. My technical journey started with a perfect 100/100
    in Artificial Intelligence in my board exams, and I've been obsessed with the logic
    of problem-solving ever since.`,
  longBio: `I am a Double Black Belt in both Taekwondo and Kyokushin Karate, and a National
    & State Gold Medalist. Martial arts taught me the "Warrior Mindset" — the grit
    required for 24-hour hackathons and the focus needed to debug complex systems under
    pressure. As a Handball Goalkeeper, I've mastered the art of staying calm under fire
    and being the last line of defense — a mindset I bring to debugging and system
    security. Currently mastering Data Structures & Algorithms in C and diving deep into
    Web Development to build real-world solutions. I am a fresher in years, but a veteran
    in work ethic.`,
  email: "wecode1012@gmail.com",
  location: "India",
  university: "Lovely Professional University",
  degree: "B.Tech in Computer Science",
  resumeUrl: "#",
  socialLinks: {
    github: "https://github.com/wecode1505",
    linkedin: "https://www.linkedin.com/in/riturajsingh1505",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/__nikhil.singh__15/",
  },
}

export const skills = [
  {
    category: "Frontend",
    icon: "frontend",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: "backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Python", level: 80 },
      { name: "Django", level: 70 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: "database",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Supabase", level: 80 },
      { name: "MySQL", level: 75 },
      { name: "Firebase", level: 80 },
      { name: "Prisma", level: 75 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "tools",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Linux", level: 80 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 70 },
      { name: "VS Code", level: 95 },
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: "KYURON",
    description:
      "A smart cube — an interactive IoT-enabled Rubik's cube with real-time solve tracking, algorithm suggestions, and performance analytics.",
    image: "https://images.unsplash.com/photo-1639743772318-85ee465b8671?w=800&q=80",
    tags: ["React", "Node.js", "IoT", "Python"],
    github: "https://github.com/wecode1505",
    live: "https://kyuron.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "DEVWEBMEET",
    description:
      "Where client and developer meet — a platform connecting businesses with developers for seamless project collaboration, communication, and delivery.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    tags: ["React", "WebRTC", "Node.js", "Supabase"],
    github: "https://github.com/wecode1505",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "SAFALSOPAN",
    description:
      "A success-driven learning platform connecting students with mentors, providing career guidance, skill assessments, and personalized learning paths.",
    image: "https://images.unsplash.com/photo-1516534775068-bb57e39c1a29?w=800&q=80",
    tags: ["Next.js", "Supabase", "Python", "Tailwind CSS"],
    github: "https://github.com/wecode1505",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 4,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates blog posts, social media content, and marketing copy using OpenAI API.",
    image: "https://images.unsplash.com/photo-1677442d019cecf8978307ed3985cf14a376f6d022e37c17a2b564f01d154f63?w=800&q=80",
    tags: ["React", "Python", "FastAPI", "OpenAI"],
    github: "https://github.com/wecode1505",
    live: null,
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and Tailwind CSS featuring smooth animations and dark theme.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/wecode1505",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description:
      "A weather application with location-based forecasts, interactive maps, and 7-day predictions using external weather APIs.",
    image: "https://images.unsplash.com/photo-1629548862265-1ee18fbdc38f?w=800&q=80",
    tags: ["React", "API Integration", "Chart.js"],
    github: "https://github.com/wecode1505",
    live: "https://example.com",
    featured: false,
  },
]

export const experience = [
  {
    id: 1,
    role: "Founder & Lead Developer",
    company: "Team WECODE",
    duration: "2024 - Present",
    description: [
      "Founded Team WECODE — a full-stack web development agency building and selling custom websites for clients",
      "Deliver end-to-end custom websites tailored to client business needs using React, Next.js, Node.js, and Supabase",
      "Building AI/ML-powered full-stack solutions to solve real-world problems",
      "Lead a team of developers, manage client projects, and handle deployment & delivery pipelines",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Full Stack Developer Intern",
    company: "Tech Company",
    duration: "Jun 2025 - Present",
    description: [
      "Developed responsive web applications using React and Node.js",
      "Collaborated with the design team to implement pixel-perfect UIs",
      "Optimized database queries resulting in 40% faster load times",
      "Participated in code reviews and agile sprint planning",
    ],
    current: true,
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Startup Project",
    duration: "Jan 2025 - May 2025",
    description: [
      "Built reusable component library using React and Tailwind CSS",
      "Implemented state management with Redux Toolkit",
      "Integrated third-party APIs for payment and authentication",
      "Improved web performance scores from 65 to 95 on Lighthouse",
    ],
    current: false,
  },
  {
    id: 4,
    role: "Open Source Contributor",
    company: "Various Projects",
    duration: "2024 - Present",
    description: [
      "Contributed to multiple open-source repositories on GitHub",
      "Fixed bugs, added features, and improved documentation",
      "Engaged with developer communities and mentored beginners",
    ],
    current: true,
  },
]

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]
