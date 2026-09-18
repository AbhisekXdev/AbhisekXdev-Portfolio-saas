import {
  ArrowRight,
  FolderCode,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";

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

export default function Projects() {
  const reduceMotion = useReducedMotion();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api("/projects");

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

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
              className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.06] blur-[140px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -left-40 top-[550px] h-[450px] w-[450px] rounded-full bg-blue-500/[0.05] blur-[140px]"
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

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* =========================================================
            HERO
        ========================================================== */}

        <motion.section
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "visible"}
          variants={fadeUp}
          className="relative"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              {/* Label */}

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                <Sparkles size={12} />

                Portfolio
              </div>

              {/* Heading */}

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Selected
                <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Projects.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Backend systems, AI applications, marketplaces, APIs and
                full-stack products built with modern technologies.
              </p>
            </div>

            {/* Project counter */}

            <div className="lg:pb-1">
              <div className="inline-flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                  <FolderCode size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    Total projects
                  </p>

                  <p className="mt-1 text-xl font-black text-white">
                    {loading ? "—" : projects.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =========================================================
            DIVIDER
        ========================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
          animate={
            reduceMotion
              ? false
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-16 h-px origin-left bg-white/[0.07]"
        />

        {/* =========================================================
            PROJECTS
        ========================================================== */}

        <section className="mt-12">
          {/* Loading */}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={
                    reduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]"
                >
                  <div className="aspect-[16/9] animate-pulse bg-white/[0.05]" />

                  <div className="space-y-4 p-6">
                    <div className="h-3 w-20 animate-pulse rounded bg-white/[0.07]" />

                    <div className="h-7 w-3/4 animate-pulse rounded bg-white/[0.07]" />

                    <div className="h-4 w-full animate-pulse rounded bg-white/[0.05]" />

                    <div className="h-4 w-5/6 animate-pulse rounded bg-white/[0.05]" />

                    <div className="flex gap-2 pt-2">
                      <div className="h-7 w-16 animate-pulse rounded-full bg-white/[0.05]" />
                      <div className="h-7 w-20 animate-pulse rounded-full bg-white/[0.05]" />
                      <div className="h-7 w-14 animate-pulse rounded-full bg-white/[0.05]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            /* =====================================================
               EMPTY
            ====================================================== */

            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? false : "visible"}
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                <FolderCode size={24} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-white">
                No projects yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                Projects added through the admin dashboard will appear here.
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ) : (
            /* =====================================================
               PROJECT GRID
            ====================================================== */

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
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
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* =========================================================
            BOTTOM CTA
        ========================================================== */}

        {!loading && projects.length > 0 && (
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
            transition={{ duration: 0.7 }}
            className="relative mt-20 overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] via-white/[0.02] to-blue-500/[0.04] px-6 py-14 text-center sm:px-12"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-400">
                Have an idea?
              </p>

              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                Let's build something
                <span className="block text-slate-500">
                  meaningful together.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
                Have a product idea, technical challenge or project in mind?
                Let's turn it into a working solution.
              </p>

              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-cyan-300"
              >
                Start a Project

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}