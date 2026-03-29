import nancyResumePdf from '@/content/resume/nancy_resume.pdf';

export const profile = {
  name: "Nancy Jaiswal",
  role: "Software Engineer and FullStack Developer",
  shortRole: "Software Engineerr",
  location: "SiddharthNagar, Uttar Pradesh, India",
  email: "nancyjais1907@gmail.com",
  phone: "+91 9305406903",
  intro:
    "I engineer real-time collaborative systems and high-performance web applications with a focus on algorithmic efficiency and seamless user experiences.",
  summary:
    "B.Tech CSE student at LPU with a LeetCode rating of 1700+. I specialize in building scalable full-stack applications using Next.js and Node.js, combined with a deep understanding of Data Structures and Algorithms.",
  availability: "Open to internships, freelance work, and entry-level software roles.",
  resumePath: nancyResumePdf,
  resumeFileName: "nancy_resume.pdf",
  links: {
    github: "https://github.com/nancy-jaiswal19",
    linkedin: "https://www.linkedin.com/in/nancy-jaiswal19/",
    email: "mailto:nancyjais1907@gmail.com",
  },
};

export const highlights = [
  { label: "LeetCode Rating", value: "1700+" },
  { label: "DSA Problems", value: "400+" },
  { label: "Tech Stack", value: "Next.js, Node, Socket.io" },
];

export const strengths = [
  {
    title: "Algorithmic Engineering",
    description:
      "Expertise in visualizing and implementing complex search logic, graph theory, and data structures to solve real-world problems.",
  },
  {
    title: "Real-Time Systems",
    description:
      "Experienced in handling concurrent edits and live synchronization using Socket.io and optimized WebSocket event handling.",
  },
  {
    title: "Full-Stack Performance",
    description:
      "Focused on UI responsiveness, maintaining 60 FPS during heavy computations and optimizing backend REST APIs.",
  },
];

export const skillGroups = [
  {
    title: "Programming Languages",
    items: ["C++", "JavaScript (ES6+)", "SQL", "Python"],
  },
  {
    title: "Web Technologies",
    items: ["Next.js", "React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS"],
  },
  {
    title: "Database & Tools",
    items: ["MongoDB", "MySQL", "Git", "Postman", "Vercel", "Monaco Editor"],
  }
];

export const projects = [
  {
    title: "CodeSync Pro",
    period: "2026",
    summary:
      "Real-time collaborative editor with live synchronization and user tracking.",
    details:
      "Engineered a collaborative editor using Socket.io for sub-millisecond sync and integrated a Cloud Compiler API for remote execution.",
    stack: ["React.js", "Node.js", "Socket.io", "Monaco Editor"],
    outcome: "Ensured data consistency across multi-user sessions through conflict resolution strategies.",
    github: "https://github.com/nancy-jaiswal19/CodeSync-Pro",
  },
  {
    title: "Pathfinding Visualizer",
    period: "2026",
    summary:
      "Interactive tool to visualize Dijkstra, BFS, and DFS algorithms.",
    details:
      "Built an optimized state management system to maintain 60 FPS while visualizing maze generation and search traversals.",
    stack: ["React.js", "Data Structure", "Algorithms", "CSS3"],
    outcome: "Demonstrated graph theory and search efficiency through real-time obstacle placement.",
    github: "https://github.com/nancy-jaiswal19/Path-Finding-Visualizer",
  },
  {
    title: "HomeSpace",
    period: "2025",
    summary:
      "Online furniture store with Augmented Reality (AR) visualization.",
    details:
      "Integrated web-based AR for physical environment previews and optimized backend APIs for dynamic cart management.",
    stack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    outcome: "Created a responsive e-commerce platform with unique spatial preview capabilities.",
    github: "https://github.com/nancy-jaiswal19/Online-Furniture-Store-with-Augmented-Reality-AR-Preview",
  },
];

export const certificates: Array<{
  title: string;
  issuer: string;
  year: string;
  summary: string;
  skills: string[];
  link?: string;
}> = [
  {
    title: "HackerRank Problem Solving",
    issuer: "HackerRank",
    year: "2025",
    summary:
      "Verified advanced problem-solving skills in competitive programming.",
    skills: ["DSA", "Problem Solving", "Competitive Programming"],
    link: "https://www.hackerrank.com/certificates/40ea09bd51bb",
  },
  {
    title: "Backend Development",
    issuer: "FreeCodeCamp",
    year: "2025",
    summary:
      "Built complex API architectures and database-driven applications.",
    skills: ["APIs", "Database", "Backend"],
    link: "https://drive.google.com/file/d/1nhxpWAEUx2E16m1O9bXYBdmELKQQg8ZN/view?usp=",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "Coursera",
    year: "2024",
    summary:
      "Built foundational understanding of computer hardware, operating system concepts, system components, and how software interacts with underlying machines.",
    skills: ["Hardware", "Operating Systems", "Systems"],
    link: "https://drive.google.com/file/d/19xMhXPuNeIUi_6lgKl85KDQiraf2RCK5/view?usp=sharing",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    year: "2025",
    summary:
      "Completed NPTEL Cloud Computing coursework covering cloud service models, virtualization, distributed systems foundations, and scalable cloud architecture concepts.",
    skills: ["Cloud Computing", "Virtualization", "Distributed Systems"],
    link: "https://drive.google.com/file/d/1Lx_C0WiR5uHeZ3aN_efEDYDOohF5R6BS/view?usp=sharing",
  },
];

export const timeline = [
  {
    title: "Bachelor of Technology in Computer Science and Engineering",
    meta: "Lovely Professional University • Phagwara, Punjab • 2023 - Present",
    description: "CGPA: 7.82",
  },
  {
    title: "Intermediate",
    meta: "Delhi School Of Excellence • Basti, Uttar Pradesh • 2021 - 2023",
    description: "Percentage: 68.4%",
  },
  {
    title: "Matriculation",
    meta: "Delhi School Of Excellence • Basti, Uttar Pradesh • 2020 - 2021",
    description: "Percentage: 78%",
  },
];
