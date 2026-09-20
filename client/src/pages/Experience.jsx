import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { api } from '../lib/api.js';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Experience() {
  const [items, setItems] = useState([]);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api('/experience')
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] pt-20 text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative border-b border-white/[0.07]">

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Glow */}
        <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-400/[0.06] blur-[60px] sm:right-[-150px] sm:top-[-150px] sm:h-[450px] sm:w-[450px] sm:blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? false : 'visible'}
            variants={fadeUp}
            className="max-w-3xl"
          >

            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Career
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              My Experience.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              A journey through backend engineering, full-stack
              development, cloud technologies and building
              products that solve real problems.
            </p>

            {/* =================================================
                STATS
            ================================================== */}
            <div className="mt-10 grid max-w-xl grid-cols-3">

              <div className="border-r border-white/[0.08] pr-4">
                <p className="text-3xl font-black text-white">
                  {items.length}
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-xs">
                  Positions
                </p>
              </div>

              <div className="border-r border-white/[0.08] px-4">
                <p className="text-xl font-black text-white sm:text-2xl">
                  Full Stack
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-xs">
                  Focus
                </p>
              </div>

              <div className="pl-4">
                <p className="text-xl font-black text-white sm:text-2xl">
                  Backend
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-xs">
                  Specialty
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ====================================================== */}
      <section className="relative bg-[#07090c]">

        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          {items.length > 0 ? (

            <div className="relative">

              {/* Timeline line - desktop */}
              <div className="absolute bottom-0 left-[20px] top-0 hidden w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent md:block" />

              <div className="space-y-8">

                {items.map((item, index) => (

                  <motion.article
                    key={item.id}
                    initial={reduceMotion ? false : 'hidden'}
                    whileInView={reduceMotion ? undefined : 'visible'}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    variants={fadeUp}
                    className="relative md:pl-16"
                  >

                    {/* Timeline dot */}
                    <div className="absolute left-0 top-8 hidden md:flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-[#07090c]">

                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.55)]" />

                    </div>

                    {/* Experience Card */}
                    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] transition-[transform,border-color,background-color] duration-200 will-change-transform hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04]">

                      {/* Top glow */}
                      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                      <div className="p-6 sm:p-8 lg:p-9">

                        {/* Header */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                          <div className="flex gap-4">

                            {/* Icon */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                              <BriefcaseBusiness size={19} />
                            </div>

                            {/* Role */}
                            <div>

                              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
                                Position{' '}
                                {String(index + 1).padStart(2, '0')}
                              </p>

                              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {item.role}
                              </h2>

                              <p className="mt-1 font-medium text-cyan-300">
                                {item.company}
                              </p>

                            </div>
                          </div>

                          {/* Date */}
                          <div className="flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-400">

                            <CalendarDays size={14} />

                            <span>
                              {item.start_date} —{' '}
                              {item.end_date || 'Present'}
                            </span>

                          </div>

                        </div>

                        {/* Divider */}
                        <div className="my-7 h-px bg-white/[0.06]" />

                        {/* Description */}
                        {item.description && (
                          <p className="max-w-4xl text-sm leading-7 text-slate-400 sm:text-base">
                            {item.description}
                          </p>
                        )}

                        {/* Bullet points */}
                        {item.bullets?.length > 0 && (

                          <div className="mt-7 space-y-3">

                            {item.bullets.map((bullet) => (

                              <div
                                key={bullet}
                                className="flex gap-3 rounded-xl border border-white/[0.05] bg-black/10 px-4 py-3"
                              >

                                <CheckCircle2
                                  size={16}
                                  className="mt-1 shrink-0 text-cyan-400"
                                />

                                <p className="text-sm leading-6 text-slate-400">
                                  {bullet}
                                </p>

                              </div>

                            ))}

                          </div>
                        )}

                        {/* Footer */}
                        <div className="mt-7 flex items-center justify-between">

                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                            Backend · Full Stack
                          </span>

                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-slate-600 transition-[border-color,color] duration-200 group-hover:border-cyan-400/20 group-hover:text-cyan-400">
                            <ArrowUpRight size={15} />
                          </div>

                        </div>

                      </div>
                    </div>

                  </motion.article>

                ))}

              </div>
            </div>

          ) : (

            /* Empty state */
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">

              <BriefcaseBusiness
                size={32}
                className="mx-auto text-slate-700"
              />

              <h2 className="mt-5 text-lg font-bold text-white">
                Experience coming soon
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                Your professional experience will appear here
                once it has been added.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="border-t border-white/[0.07] bg-[#050505]">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">

          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] via-white/[0.02] to-blue-500/[0.04] px-6 py-14 text-center sm:px-10">

            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[60px] sm:h-40 sm:w-80 sm:blur-[90px]" />

            <div className="relative">

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Let's work together
              </p>

              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                Have a project in mind?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                Let's build something useful, scalable and
                meaningful together.
              </p>

              <a
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-cyan-300"
              >
                Start a conversation
                <ArrowUpRight size={17} />
              </a>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
