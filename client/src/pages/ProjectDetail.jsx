import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85";

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

export default function ProjectDetail() {
  const { id } = useParams();
  const reduceMotion = useReducedMotion();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        const data = await api(`/projects/${id}`);

        setProject(data);
      } catch (error) {
        console.error("Failed to load project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  /* =========================================================
     LOADING STATE
  ========================================================== */

  if (loading) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#050505] pt-20 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-white/10" />

            <div className="mt-8 h-12 max-w-xl rounded-lg bg-white/10" />

            <div className="mt-5 h-5 max-w-2xl rounded bg-white/5" />
            <div className="mt-3 h-5 max-w-xl rounded bg-white/5" />

            <div className="mt-12 aspect-[16/8] rounded-3xl bg-white/[0.04]" />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <div className="h-40 rounded-2xl bg-white/[0.04]" />
              <div className="h-40 rounded-2xl bg-white/[0.04]" />
              <div className="h-40 rounded-2xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================== */

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 pt-20 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
            <Layers3 size={25} />
          </div>

          <h1 className="mt-6 text-2xl font-black">
            Project not found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            This project may have been removed or the URL may be incorrect.
          </p>

          <Link
            to="/projects"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  /* =========================================================
     PROJECT DATA
  ========================================================== */

  const technologies = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : [];

  const bullets = Array.isArray(project.bullets)
    ? project.bullets
    : [];

  const projectImage =
    project.image ||
    project.image_url ||
    fallbackImage;

  const category =
    project.category ||
    project.project_type ||
    "Full Stack Application";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] pt-20 text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {!reduceMotion && (
          <>
            <motion.div
              className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.07] blur-[140px]"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -left-40 top-[500px] h-[450px] w-[450px] rounded-full bg-blue-500/[0.05] blur-[140px]"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Back */}

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "visible"}
          variants={fadeUp}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to projects
          </Link>
        </motion.div>

        {/* =========================================================
            HERO
        ========================================================== */}

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
          {/* Left */}

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "visible"}
            variants={fadeUp}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                <Sparkles size={12} />
                {category}
              </span>

              {project.featured && (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Featured
                </span>
              )}
            </div>

            <div className="mt-7 flex items-start gap-5">
              <span className="hidden pt-2 font-mono text-sm text-slate-700 sm:block">
                #
              </span>

              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              {project.description}
            </p>

            {/* Buttons */}

            <div className="mt-9 flex flex-wrap gap-3">
              {project.repository_url && (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_15px_45px_rgba(34,211,238,.15)]"
                >
                  <Github size={17} />

                  GitHub

                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <ExternalLink size={16} />

                  Live Demo

                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right info */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 30,
                  }
            }
            animate={
              reduceMotion
                ? false
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:justify-self-end"
          >
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                  <Code2 size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    Built with
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    {technologies.length} Technologies
                  </p>
                </div>
              </div>

              {technologies.length > 0 && (
                <div className="mt-5 flex max-w-sm flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            PROJECT IMAGE
        ========================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 40,
                  scale: 0.98,
                }
          }
          animate={
            reduceMotion
              ? false
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }
          }
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative mt-14 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-2 shadow-2xl shadow-black/50"
        >
          <div className="relative aspect-[16/8] overflow-hidden rounded-[1.35rem] bg-[#101214]">
            <img
              src={projectImage}
              alt={project.title}
              className="h-full w-full object-cover opacity-80 transition duration-1000 group-hover:scale-[1.025] group-hover:opacity-100"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Image overlay */}

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                  Project
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  {project.title}
                </p>
              </div>

              <div className="hidden rounded-full border border-white/10 bg-black/40 p-3 text-white backdrop-blur-xl sm:block">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            DETAILS
        ========================================================== */}

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.25fr_.75fr]">
          {/* Highlights */}

          <motion.section
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
              amount: 0.2,
            }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  What I built
                </p>

                <h2 className="mt-1 text-xl font-black text-white">
                  Project Highlights
                </h2>
              </div>
            </div>

            {bullets.length > 0 ? (
              <div className="mt-8 space-y-4">
                {bullets.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -15,
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
                      duration: 0.45,
                      delay: index * 0.06,
                    }}
                    className="group flex gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4 transition-all duration-300 hover:border-cyan-400/10 hover:bg-white/[0.035]"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-400/[0.07] text-cyan-400">
                      <CheckCircle2 size={14} />
                    </div>

                    <p className="text-sm leading-7 text-slate-400 transition-colors group-hover:text-slate-300">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm leading-7 text-slate-500">
                Project highlights will be added soon.
              </p>
            )}
          </motion.section>

          {/* Technology */}

          <motion.section
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                <Layers3 size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Stack
                </p>

                <h2 className="mt-1 text-xl font-black text-white">
                  Technologies
                </h2>
              </div>
            </div>

            {technologies.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {technologies.map((technology, index) => (
                  <motion.div
                    key={technology}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
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
                      delay: index * 0.05,
                    }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                    <span className="text-sm font-medium text-slate-400">
                      {technology}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-500">
                Technology information is not available.
              </p>
            )}
          </motion.section>
        </div>

        {/* =========================================================
            CTA
        ========================================================== */}

        <motion.section
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
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.02] to-blue-500/[0.04] px-6 py-14 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
              Like this project?
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
              Let's build something
              <span className="block text-slate-500">
                equally ambitious.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
              Have an idea or need help building a product? Let's discuss
              your project and turn the idea into something real.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
              >
                Start a Project

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
              >
                <ArrowLeft size={16} />

                More Projects
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}