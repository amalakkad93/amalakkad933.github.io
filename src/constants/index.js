import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  python,
  flask,
  cpp,
  express,
  sqlalchemy,
  sqlite,
  pytest,
  aws,
  gcp,
  verilog,
  assembly,

  starco,
  pixelPond,
  ceravoLogo,
  calpolyLogo,
  leaderboard,
  math,
  movie,
  nyeusi,
  space,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX Design",
    icon: ux,
  },
  {
    title: "Software Prototyping",
    icon: prototyping,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "postgresql",
    icon: postgresql,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },

  {
    name: 'Python',
    icon: python,
  },
  {
    name: 'Flask',
    icon: flask,
  },
  {
    name: 'C++',
    icon: cpp,
  },
  {
    name: 'Express',
    icon: express,
  },
  {
    name: 'SQLAlchemy',
    icon: sqlalchemy,
  },
  {
    name: 'SQLite',
    icon: sqlite,
  },
  {
    name: 'Pytest',
    icon: pytest,
  },
  {
    name: 'AWS',
    icon: aws,
  },
  {
    name: 'Google Cloud Services',
    icon: gcp,
  },
  {
    name: 'Verilog',
    icon: verilog,
  },
  {
    name: 'Assembly',
    icon: assembly,
  },
];

const experiences = [
  {
    title: "Transportation Manager",
    company_name: "Ceravo Care",
    icon: ceravoLogo,
    iconBg: "#333333",
    date: "Aug 2017 - Present",
    description:
      "Led a transportation team, enhancing performance and efficiency, impacting 30+ team members. Overhauled trip routing, achieving a 20% improvement in operational efficiency. Spearheaded staff management, reducing turnover by 15%.",
  },
  {
    title: "Teacher Assistant (Volunteer)",
    company_name: "Cal Poly Pomona University",
    icon: calpolyLogo,
    iconBg: "#333333",
    date: "Aug 2021 - Dec 2021",
    description:
      "Enhanced student understanding in Microcontroller & Digital Logics Design, yielding a 10% rise in average grades. Led multiple tutorial sessions, showcasing organizational and time management skills, benefiting over 30 students.",
  },
];
const projects = [
  {
    id: "project-1",
    name: "Starco",
    description:
      "Starco is a meticulously engineered clone of the famous food delivery platform UberEats, blending a robust Flask backend with a dynamic React frontend, managed efficiently through Redux. This platform revolutionizes the food delivery experience by offering a rich array of features, allowing users to easily browse through a diverse selection of restaurants and view detailed information about each, including menus and user reviews. Additionally, users can personalize their experience by marking their favorite restaurants, adding a layer of engagement to their browsing journey. Starco's advanced search functionality stands out, offering dual-mode capabilities for users to find restaurants either by geographical location or city-based search, simplifying discovery while adding depth to the search experience. The platform also encourages community interaction with a dynamic review system, enabling users to leave, update, or remove reviews, ensuring feedback remains relevant and current. At its core, Starco boasts a streamlined order management system, where users can navigate menus, add items to their cart, and experience a simulated checkout process, showcasing the potential of real-world transaction processing. The integration of Flask and React, enhanced by Redux, ensures a responsive and intuitive user interface, making the platform user-friendly for both tech-savvy individuals and newcomers to online food ordering. Overall, Starco is more than just an UberEats clone; it's a testament to sophisticated web application development, demonstrating comprehensive functionality and attention to detail, essential for modern food delivery services.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: starco,
    repo: "https://github.com/amalakkad93/StarcoEat",
    demo: "https://gotham-eat.onrender.com",
  },
  {
    id: "project-2",
    name: "PixelPond",
    description:
      "PixelPond, as a meticulously crafted clone of Flickr, offers a robust platform for photo sharing and management. It stands out for its comprehensive features, enabling users to not only upload and organize their photography but also to engage in a community-driven environment. Users can comment on photos, initiating interactive dialogues and connections. These comments are dynamic, with the flexibility for editing or removal, fostering a lively and evolving conversation. A highlight of PixelPond's user-centric approach is its advanced search mechanism. Unlike basic search functionalities, it goes a step further by incorporating both user and tag-based filtering. This dual-mode search system allows users to find photos with precision, either by searching for specific users or by exploring tags associated with the photos. This feature makes navigating through the vast array of images both intuitive and efficient, enhancing the user's journey through the platform. The seamless integration of Flask's powerful backend with React's responsive frontend, augmented by Redux for effective state management, positions PixelPond as a prime example of sophisticated web application development. The attention to detail in replicating Flickr's celebrated functionalities, coupled with additional user-friendly features, underscores PixelPond's commitment to delivering a superior photo-sharing experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: pixelPond,
    repo: "https://github.com/amalakkad93/PixelPond",
    demo: "https://pixelpond-rhct.onrender.com",
  },
];

export { services, technologies, experiences, projects };
