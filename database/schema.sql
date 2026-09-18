CREATE TABLE IF NOT EXISTS portfolio_profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  headline VARCHAR(255) NOT NULL,
  summary TEXT,
  email VARCHAR(255),
  linkedin_url VARCHAR(500),
  github_url VARCHAR(500),
  portfolio_url VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firebase_uid VARCHAR(128) NOT NULL UNIQUE,
  email VARCHAR(255),
  display_name VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  tech_stack JSON,
  bullets JSON,
  repository_url VARCHAR(500),
  live_url VARCHAR(500),
  featured BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role VARCHAR(200) NOT NULL,
  company VARCHAR(200),
  description TEXT,
  bullets JSON,
  start_date VARCHAR(30),
  end_date VARCHAR(30),
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(200),
  project_title VARCHAR(255) NOT NULL,
  project_type VARCHAR(120),
  budget VARCHAR(100),
  timeline VARCHAR(100),
  description TEXT NOT NULL,
  features JSON,
  status ENUM('new','reviewing','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO portfolio_profile
  (name, headline, summary, email, linkedin_url, github_url, portfolio_url)
SELECT
  'Abhisek K',
  'Backend Developer | Full Stack Developer | Node.js • Express.js • Python • Cloud',
  'Backend Developer focused on scalable APIs, backend systems, database-driven applications, production-ready web solutions, and AI-powered applications.',
  'abhisekkoyal334@gmail.com',
  'https://www.linkedin.com/in/abhisek-koyal-0528a3288',
  'https://github.com/AbhisekXdev',
  'https://abhisek2025.github.io/Abhisek.k-portfolio/'
WHERE NOT EXISTS (SELECT 1 FROM portfolio_profile);

INSERT INTO projects
  (title, slug, description, tech_stack, bullets, repository_url, featured, sort_order)
SELECT
  'B2B RFQ Marketplace',
  'b2b-rfq-marketplace',
  'A full-stack B2B quotation marketplace connecting buyers and suppliers.',
  JSON_ARRAY('Node.js','Express.js','JavaScript','MySQL','React.js','JWT'),
  JSON_ARRAY('Buyer and supplier quotation workflow','Authentication and authorization','RESTful backend APIs','Database-driven architecture','Production deployment'),
  'https://github.com/AbhisekXdev/b2b-rfq-marketplace',
  TRUE, 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='b2b-rfq-marketplace');

INSERT INTO projects
  (title, slug, description, tech_stack, bullets, repository_url, featured, sort_order)
SELECT
  'AI Demand & Inventory Intelligence Platform',
  'ai-demand-inventory-intelligence-platform',
  'AI-powered platform for demand forecasting and inventory intelligence.',
  JSON_ARRAY('Node.js','Express.js','MySQL','React.js','AI'),
  JSON_ARRAY('Demand forecasting','Inventory intelligence','Backend API architecture','MySQL integration','AI integration','React frontend'),
  'https://github.com/AbhisekXdev/AI-Demand-Inventory-Intelligence-Platform',
  TRUE, 2
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='ai-demand-inventory-intelligence-platform');

INSERT INTO projects
  (title, slug, description, tech_stack, bullets, repository_url, featured, sort_order)
SELECT
  'AgentFlow — Agentic Work Intake',
  'agentflow-agentic-work-intake',
  'AI-powered workflow platform that converts unstructured requests into structured workflows and automated actions.',
  JSON_ARRAY('JavaScript','Node.js','AI','Workflow Automation'),
  JSON_ARRAY('AI-powered request processing','Workflow orchestration','Tool and action routing','Human review workflows','Backend automation architecture'),
  'https://github.com/AbhisekXdev/agentflow-agentic-work-intake',
  TRUE, 3
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='agentflow-agentic-work-intake');

INSERT INTO projects
  (title, slug, description, tech_stack, bullets, repository_url, featured, sort_order)
SELECT
  'AI-Assisted USG Reporting System',
  'ai-assisted-usg-reporting-system',
  'AI-assisted reporting platform using modern web technologies and Python-based AI integration.',
  JSON_ARRAY('React.js','Node.js','Express.js','MySQL','Python','AI'),
  JSON_ARRAY('Python AI integration','Assisted report generation','Backend API development','MySQL integration','React frontend','Full-stack architecture'),
  'https://github.com/AbhisekXdev/AI-Assisted-USG-Reporting-System',
  TRUE, 4
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='ai-assisted-usg-reporting-system');

INSERT INTO projects
  (title, slug, description, tech_stack, bullets, repository_url, featured, sort_order)
SELECT
  'NexusMall — Multi-Vendor Marketplace',
  'nexusmall-multi-vendor-marketplace',
  'Full-stack multi-vendor marketplace where vendors manage products, customers shop online, and admins manage users, vendors, products, and orders.',
  JSON_ARRAY('TypeScript','Node.js','Express.js','React.js','Database'),
  JSON_ARRAY('Vendor management','Customer shopping experience','Product management','Order management','Admin dashboard','Authentication and authorization'),
  'https://github.com/AbhisekXdev/NexusMall-Multi-Vendor-Marketplace',
  TRUE, 5
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug='nexusmall-multi-vendor-marketplace');

INSERT INTO skills (category, name, sort_order)
SELECT 'Backend', 'Node.js', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Backend' AND name='Node.js');
INSERT INTO skills (category, name, sort_order)
SELECT 'Backend', 'Express.js', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Backend' AND name='Express.js');
INSERT INTO skills (category, name, sort_order)
SELECT 'Backend', 'Python', 3 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Backend' AND name='Python');
INSERT INTO skills (category, name, sort_order)
SELECT 'Frontend', 'React.js', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Frontend' AND name='React.js');
INSERT INTO skills (category, name, sort_order)
SELECT 'Frontend', 'Next.js', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Frontend' AND name='Next.js');
INSERT INTO skills (category, name, sort_order)
SELECT 'Database', 'MySQL', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Database' AND name='MySQL');
INSERT INTO skills (category, name, sort_order)
SELECT 'Database', 'MongoDB', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Database' AND name='MongoDB');
INSERT INTO skills (category, name, sort_order)
SELECT 'Database', 'PostgreSQL', 3 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Database' AND name='PostgreSQL');
INSERT INTO skills (category, name, sort_order)
SELECT 'Cloud', 'AWS', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Cloud' AND name='AWS');
INSERT INTO skills (category, name, sort_order)
SELECT 'Cloud', 'Google Cloud Platform', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE category='Cloud' AND name='Google Cloud Platform');

INSERT INTO experience (role, company, description, bullets, start_date, end_date, sort_order)
SELECT
  'Freelance Backend & Full Stack Developer',
  'Freelance',
  'Worked with clients on real-world web applications, backend systems, and full-stack solutions.',
  JSON_ARRAY(
    'Developed and integrated RESTful APIs',
    'Built backend services using Node.js and Express.js',
    'Developed backend solutions and integrations using Python',
    'Designed and integrated MySQL and MongoDB databases',
    'Implemented authentication and authorization using JWT and Passport.js',
    'Integrated backend APIs with React.js and Next.js applications',
    'Worked with cloud-based deployments and database services'
  ),
  '2020', 'Present', 1
WHERE NOT EXISTS (SELECT 1 FROM experience WHERE role='Freelance Backend & Full Stack Developer');

INSERT INTO experience (role, company, description, bullets, start_date, end_date, sort_order)
SELECT
  'Backend Developer',
  'EATech Digital Pvt. Ltd.',
  'Worked as a Backend Developer, contributing to production-oriented web applications and backend systems.',
  JSON_ARRAY(
    'Developed and maintained RESTful APIs',
    'Built backend applications using Node.js and Express.js',
    'Worked with MySQL and MongoDB',
    'Implemented authentication, authorization, and secure API workflows',
    'Integrated frontend applications with backend services',
    'Worked with Python for backend development and integrations',
    'Debugged, optimized, and maintained existing backend functionality'
  ),
  '2020', 'Present', 2
WHERE NOT EXISTS (SELECT 1 FROM experience WHERE role='Backend Developer' AND company='EATech Digital Pvt. Ltd.');
