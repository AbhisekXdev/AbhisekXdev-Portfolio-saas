import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Server,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

const PROFILE_IMAGE =
  "https://lh3.googleusercontent.com/a/ACg8ocIOy4WElUsY3BbigeJvGV7K0pqS-0fTYS7awMprB3-vNDRIp2hm=s180-c";

const technologies = [
  "Node.js",
  "Express.js",
  "React",
  "Next.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "GCP",
];

const capabilities = [
  {
    icon: Server,
    number: "01",
    title: "Backend Development",
    description:
      "Building scalable APIs, backend services and reliable server-side applications.",
    technologies: "Node.js · Express.js · Python",
  },
  {
    icon: Code2,
    number: "02",
    title: "Frontend Development",
    description:
      "Creating fast, responsive and modern web interfaces with excellent UX.",
    technologies: "React · Next.js · Tailwind CSS",
  },
  {
    icon: Database,
    number: "03",
    title: "Database Engineering",
    description:
      "Designing structured, efficient and maintainable data-driven systems.",
    technologies: "MySQL · PostgreSQL · MongoDB",
  },
  {
    icon: Cloud,
    number: "04",
    title: "Cloud & AI",
    description:
      "Deploying cloud applications and exploring intelligent AI-powered products.",
    technologies: "AWS · GCP · AI · Automation",
  },
];

const fallbackProjectImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
];

const fallbackExperience = [
  {
    year: "2024 — Present",
    role: "Backend / Full Stack Developer",
    description:
      "Building scalable applications, APIs and modern digital products using JavaScript, Node.js, React and cloud technologies.",
  },
  {
    year: "2023 — 2024",
    role: "Software Developer",
    description:
      "Worked across backend systems, databases and frontend applications while focusing on clean and maintainable engineering.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  const [data, setData] = useState({
    profile: null,
    skills: [],
    experience: [],
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [portfolio, featuredProjects] = await Promise.all([
          api("/portfolio"),
          api("/projects?featured=true"),
        ]);

        setData({
          profile: portfolio?.profile || null,
          skills: portfolio?.skills || [],
          experience: portfolio?.experience || [],
        });

        setProjects(Array.isArray(featuredProjects) ? featuredProjects : []);
      } catch (error) {
        console.error("Failed to load home page data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const profile = data.profile;

  /*
   * Backend profile values.
   * Fallback values are used only if the database is empty.
   */
  const profileName = profile?.name || "Abhisek K.";

  const profileHeadline =
    profile?.headline || "Backend Developer.";

  const profileSummary =
    profile?.summary ||
    "I build scalable backend systems and modern full-stack applications that solve real-world problems.";

  const profileEmail = profile?.email || "";

  const githubUrl =
    profile?.github_url || "https://github.com/abhisekxdev";

  const linkedinUrl =
    profile?.linkedin_url || "https://www.linkedin.com/";

  /*
   * Format backend project data for this UI.
   */
  const formattedProjects = projects.map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, "0"),
    category:
      project.category ||
      project.project_type ||
      "Full Stack Application",
    description: project.description || "A modern digital product.",
    technologies: Array.isArray(project.tech_stack)
      ? project.tech_stack
      : [],
    image:
      project.image ||
      project.image_url ||
      fallbackProjectImages[index % fallbackProjectImages.length],
  }));

  /*
   * Use backend experience when available.
   * Otherwise show fallback content.
   */
  const formattedExperience =
    data.experience.length > 0
      ? data.experience.map((item) => ({
          ...item,
          year: `${item.start_date || ""}${
            item.end_date ? ` — ${item.end_date}` : " — Present"
          }`,
          role: item.role || "Developer",
          description: item.description || "",
        }))
      : fallbackExperience;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative min-h-[calc(100vh-72px)] border-b border-white/[0.08]">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Background glow */}
        {!reduceMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-cyan-400/[0.08] blur-[130px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-500/[0.06] blur-[120px]"
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:px-10 lg:py-28">
          {/* HERO CONTENT */}

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "visible"}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-2 text-xs font-semibold text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                </span>

                Available for new opportunities
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-slate-500"
            >
              Backend · Full Stack · AI
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.7rem]"
            >
              Hi, I'm{" "}
              <span className="text-white">{profileName}</span>

              <span className="mt-4 block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {profileHeadline}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
              {profileSummary}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              Experienced across backend engineering, frontend development,
              databases, cloud technologies and AI-powered applications.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_15px_45px_rgba(34,211,238,.15)]"
              >
                Explore My Work

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
              >
                Download Resume

                <ArrowDownToLine
                  size={16}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>

            {/* Social */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex items-center gap-5"
            >
              <span className="h-px w-10 bg-white/10" />

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 transition hover:-translate-y-1 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={19} />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 transition hover:-translate-y-1 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={19} />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-white"
              >
                <Mail size={15} />
                Let's talk
              </Link>

              {profileEmail && (
                <a
                  href={`mailto:${profileEmail}`}
                  className="hidden text-xs text-slate-600 transition hover:text-cyan-400 sm:block"
                >
                  {profileEmail}
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* PROFILE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.92,
                    y: 25,
                  }
            }
            animate={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[310px]"
          >
            <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-[80px]" />

            {/* Image card */}

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.025] p-2 shadow-2xl shadow-black/50">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#111]">
                <img
                  src={PROFILE_IMAGE}
                  alt={profileName}
                  className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                      <Code2 size={15} />
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                        Building with
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-white">
                        Node.js · React · Next.js
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}

            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -7, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 top-8 rounded-xl border border-white/10 bg-[#0c0f13]/95 px-4 py-3 shadow-xl backdrop-blur-xl"
            >
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Primary focus
              </p>

              <p className="mt-1 text-xs font-bold text-cyan-300">
                Backend Engineering
              </p>
            </motion.div>

            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, 7, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-[#0c0f13]/95 px-4 py-3 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-cyan-400" />

                <span className="text-xs font-semibold text-white">
                  Full Stack Developer
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          TECHNOLOGY
      ========================================================== */}

      <section className="border-b border-white/[0.07] bg-[#080a0d]">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            {technologies.map((technology, index) => (
              <motion.span
                key={technology}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                whileInView={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.025,
                }}
                className="text-xs font-semibold text-slate-600 transition-colors hover:text-slate-300"
              >
                {technology}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ABOUT
      ========================================================== */}

      <section className="border-b border-white/[0.07] bg-[#050505]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-10">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            whileInView={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
              About me
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Engineering ideas
              <span className="block text-slate-500">
                into products.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            whileInView={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
            className="max-w-3xl"
          >
            <p className="text-lg leading-8 text-slate-300">
              {profileSummary}
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-500">
              My work spans backend architecture, REST APIs, databases,
              frontend applications and cloud deployment. I enjoy taking an
              idea from concept through development and turning it into a
              product that people can actually use.
            </p>

            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              More about me

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          EXPERTISE
      ========================================================== */}

      <section className="border-b border-white/[0.07] bg-[#080a0d]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
              Expertise
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              What I do.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
            {capabilities.map(
              (
                {
                  icon: Icon,
                  number,
                  title,
                  description,
                  technologies: tech,
                },
                index,
              ) => (
                <motion.div
                  key={title}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 25,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                  }}
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          backgroundColor: "rgba(255,255,255,0.035)",
                        }
                  }
                  className="group bg-[#080a0d] p-7 transition-colors duration-300 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs font-mono text-slate-700">
                      {number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-white">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                    {description}
                  </p>

                  <p className="mt-6 text-xs font-semibold text-slate-400">
                    {tech}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          PROJECTS
      ========================================================== */}

      <section className="border-b border-white/[0.07] bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              whileInView={
                reduceMotion
                  ? false
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
                Selected work
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Featured Projects.
              </h2>
            </motion.div>

            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
            >
              View all projects

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-7">
            {loading ? (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                <p className="text-sm text-slate-500">
                  Loading projects...
                </p>
              </div>
            ) : formattedProjects.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                <p className="text-sm text-slate-500">
                  No featured projects yet.
                </p>
              </div>
            ) : (
              formattedProjects.map((project, index) => (
                <motion.article
                  key={project.id || project.slug || index}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 35,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className="group grid overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] lg:grid-cols-[1.1fr_.9fr]"
                >
                  <div className="relative min-h-[280px] overflow-hidden bg-[#101214] lg:min-h-[400px]">
                    <img
                      src={project.image}
                      alt={project.title || "Project"}
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300 backdrop-blur">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between p-7 sm:p-10">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-600">
                          {project.number}
                        </span>

                        <ArrowUpRight
                          size={20}
                          className="text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400"
                        />
                      </div>

                      <h3 className="mt-10 text-2xl font-black text-white sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        {project.description}
                      </p>

                      {project.technologies.length > 0 && (
                        <div className="mt-7 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      to="/projects"
                      className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white"
                    >
                      View project
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE
      ========================================================== */}

      <section className="border-b border-white/[0.07] bg-[#080a0d]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
                Experience
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                My journey.
              </h2>
            </div>

            <div className="space-y-0">
              {formattedExperience.map((item, index) => (
                <motion.div
                  key={item.id || item.year || index}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 25,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? false
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="border-t border-white/[0.07] py-8 last:border-b"
                >
                  <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                    <p className="text-xs font-mono text-slate-600">
                      {item.year}
                    </p>

                    <div>
                      <div className="flex items-center gap-3">
                        <BriefcaseBusiness
                          size={17}
                          className="text-cyan-400"
                        />

                        <div>
                          <h3 className="font-bold text-white">
                            {item.role}
                          </h3>

                          {item.company && (
                            <p className="mt-1 text-xs text-cyan-400">
                              {item.company}
                            </p>
                          )}
                        </div>
                      </div>

                      {item.description && (
                        <p className="mt-3 text-sm leading-7 text-slate-500">
                          {item.description}
                        </p>
                      )}

                      {item.bullets?.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-500">
                          {item.bullets.slice(0, 3).map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-2"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CTA
      ========================================================== */}

      <section className="bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.98,
                  }
            }
            whileInView={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-blue-500/[0.04] px-6 py-20 text-center sm:px-12"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Have a project?
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let's build something
                <span className="block text-slate-500">
                  meaningful together.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500">
                Have an idea, product or technical challenge? Let's talk about
                how I can help turn it into reality.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
                >
                  Start a Project

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Resume
                  <ArrowDownToLine size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}