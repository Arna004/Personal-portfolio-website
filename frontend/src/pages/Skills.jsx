import React from 'react';

const skills = [
  {
    name: 'HTML',
    icon: 'https://img.icons8.com/color/48/000000/html-5--v1.png',
  },
  {
    name: 'CSS',
    icon: 'https://img.icons8.com/color/48/000000/css3.png',
  },
  {
    name: 'JavaScript',
    icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png',
  },
  {
    name: 'React',
    icon: 'https://img.icons8.com/color/48/000000/react-native.png',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://img.icons8.com/color/48/000000/tailwindcss.png',
  },
];

const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="skills-title">My Skills</h2>
      <p className="skills-subtitle">
        Here are some of the technologies and tools I work with:
      </p>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <img src={skill.icon} alt={skill.name} className="skill-icon" />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
