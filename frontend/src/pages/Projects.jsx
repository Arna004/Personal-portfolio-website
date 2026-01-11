import React from 'react';

// Add images and tags to each project
const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my skills, projects, and experience. Built with React and styled-components.',
    link: '/',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    tags: ['React', 'Styled-Components', 'Frontend','Backend','Javascript','TailwindCSS','HTML','Express.js','Node.jS']
  },
  {
    title: 'Online Ticket Booking System',
    description: 'A full-stack web application for booking tickets online, featuring user authentication, seat selection, and payment integration.',
    link: 'https://ticket-booking-system-cse26.pages.dev/',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    tags: ['Full Stack', 'Node.js', 'MongoDB', 'Express']
  },
  
];

const Projects = () => {
  return (
    <section className="projects-section enhanced-projects-bg">
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">
        Here are some of the projects I've worked on recently. Click to explore more!
      </p>
      <div className="projects-list enhanced-projects-list">
        {projects.map((project, idx) => (
          <div className="project-card enhanced-project-card" key={idx}>
            <div className="project-image-wrapper enhanced-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image enhanced-project-image" />
            </div>
            <div className="project-content enhanced-project-content">
              <h3 className="enhanced-project-title">{project.title}</h3>
              <p className="enhanced-project-desc">{project.description}</p>
              <div className="project-tags enhanced-project-tags">
                {project.tags.map((tag, i) => (
                  <span className="project-tag enhanced-project-tag" key={i}>{tag}</span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn enhanced-project-link-btn"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
