export const personalInfo = {
  name: "Rituraj Singh",
  title: "Full Stack Developer",
  subtitle: "B.Tech CSE @ LPU",
  tagline: "Full throttle. No brakes. Building at max speed. ⚡",
  headlines: [
    "Full Stack Developer",
    "Multi-Gold Medalist Athlete",
    "National & State Athlete",
    "Professional Anchor",
    "B.Tech CSE @ LPU",
  ],
  avatar: "https://avatars.githubusercontent.com/u/231709192?v=4",
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
      { name: "MySQL", level: 75 },
      { name: "Redis", level: 70 },
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
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product management, cart functionality, and payment integration.",
    image: null,
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    description:
      "A real-time messaging application with WebSocket integration, group chats, file sharing, and online status indicators.",
    image: null,
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description:
      "A Kanban-style project management tool with drag-and-drop, team collaboration, and progress tracking features.",
    image: null,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 4,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates blog posts, social media content, and marketing copy using OpenAI API.",
    image: null,
    tags: ["React", "Python", "FastAPI", "OpenAI"],
    github: "https://github.com",
    live: null,
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and Tailwind CSS featuring smooth animations and dark theme.",
    image: null,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description:
      "A weather application with location-based forecasts, interactive maps, and 7-day predictions using external weather APIs.",
    image: null,
    tags: ["React", "API Integration", "Chart.js"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false,
  },
]

export const experience = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
