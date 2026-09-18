import { useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { api } from '../lib/api.js';

const initial = {
  name: '',
  email: '',
  company: '',
  project_title: '',
  project_type: '',
  budget: '',
  timeline: '',
  description: '',
  featuresText: '',
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Contact() {
  const [form, setForm] = useState(initial);

  const [state, setState] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const reduceMotion = useReducedMotion();

  function update(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();

    setState({
      loading: true,
      message: '',
      error: '',
    });

    try {
      await api('/inquiries', {
        method: 'POST',
        body: {
          ...form,
          features: form.featuresText
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
        },
      });

      setForm(initial);

      setState({
        loading: false,
        message:
          'Thanks — your project details were sent successfully.',
        error: '',
      });
    } catch (error) {
      setState({
        loading: false,
        message: '',
        error: error.message,
      });
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] pt-20 text-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative border-b border-white/[0.07]">

        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Glow */}
        <div className="pointer-events-none absolute right-[-150px] top-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">

          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate={reduceMotion ? false : 'visible'}
            variants={fadeUp}
            className="max-w-3xl"
          >

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                Work together
              </p>
            </div>

            <h1 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Let's build something
              <span className="block text-slate-500">
                meaningful.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Have an idea, product or technical challenge?
              Tell me what you're building and I'll get back to
              you with the next steps.
            </p>

          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTACT AREA
      ====================================================== */}
      <section className="bg-[#07090c]">

        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-24">

          {/* =================================================
              LEFT INFO
          ================================================== */}
          <motion.aside
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="h-fit"
          >

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                <MessageSquare size={21} />
              </div>

              <h2 className="mt-7 text-2xl font-black text-white">
                Tell me about it.
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                The more details you provide, the better I can
                understand your requirements and suggest the
                right technical approach.
              </p>

              {/* Info items */}
              <div className="mt-8 space-y-4">

                <ContactInfo
                  icon={Mail}
                  title="Email"
                  value="Let's discuss your project"
                />

                <ContactInfo
                  icon={Clock3}
                  title="Response time"
                  value="Usually within 24–48 hours"
                />

                <ContactInfo
                  icon={BriefcaseBusiness}
                  title="Available for"
                  value="Web · Backend · Full Stack · AI"
                />

              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-white/[0.07]" />

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                  <Sparkles size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Have a complex idea?
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    That's exactly what I like working on.
                  </p>
                </div>
              </div>

            </div>
          </motion.aside>

          {/* =================================================
              FORM
          ================================================== */}
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >

            <form
              onSubmit={submit}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
            >

              {/* Top glow */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <div className="p-6 sm:p-8 lg:p-10">

                {/* Form heading */}
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                    Project details
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white">
                    Start a conversation
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    Tell me what you're looking to build.
                  </p>
                </div>

                {/* =================================================
                    BASIC INFO
                ================================================== */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <Input
                    icon={User}
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Abhisek K"
                    required
                  />

                  <Input
                    icon={Mail}
                    label="Email address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                    required
                  />

                  <Input
                    icon={BriefcaseBusiness}
                    label="Company"
                    name="company"
                    value={form.company}
                    onChange={update}
                    placeholder="Your company"
                  />

                  <Input
                    icon={Sparkles}
                    label="Project title"
                    name="project_title"
                    value={form.project_title}
                    onChange={update}
                    placeholder="My new application"
                    required
                  />

                </div>

                {/* =================================================
                    PROJECT OPTIONS
                ================================================== */}
                <div className="mt-5 grid gap-5 sm:grid-cols-3">

                  <Select
                    label="Project type"
                    name="project_type"
                    value={form.project_type}
                    onChange={update}
                    options={[
                      'Web Application',
                      'Backend / API',
                      'Full Stack',
                      'AI Application',
                      'E-commerce',
                      'Portfolio',
                      'Other',
                    ]}
                  />

                  <Select
                    label="Budget"
                    name="budget"
                    value={form.budget}
                    onChange={update}
                    options={[
                      'Under $500',
                      '$500 – $1,000',
                      '$1,000 – $2,500',
                      '$2,500 – $5,000',
                      '$5,000+',
                      'Not decided',
                    ]}
                  />

                  <Select
                    label="Timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={update}
                    options={[
                      'ASAP',
                      '1 – 2 weeks',
                      '2 – 4 weeks',
                      '1 – 2 months',
                      '2+ months',
                      'Flexible',
                    ]}
                  />

                </div>

                {/* =================================================
                    FEATURES
                ================================================== */}
                <div className="mt-5">

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Required features
                    </span>

                    <input
                      name="featuresText"
                      value={form.featuresText}
                      onChange={update}
                      placeholder="Admin panel, OAuth, payments, reports"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.05]"
                    />

                    <p className="mt-2 text-[11px] text-slate-700">
                      Separate multiple features with commas.
                    </p>
                  </label>

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}
                <div className="mt-5">

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Project description
                    </span>

                    <textarea
                      required
                      name="description"
                      value={form.description}
                      onChange={update}
                      rows="7"
                      placeholder="Tell me about your idea, goals, users, technical requirements or anything else that might be useful..."
                      className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm leading-7 text-white outline-none transition-all placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.05]"
                    />

                  </label>

                </div>

                {/* =================================================
                    STATUS
                ================================================== */}
                {state.message && (
                  <motion.div
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 10,
                          }
                    }
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                          }
                    }
                    className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.06] p-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <p className="text-sm leading-6 text-emerald-300">
                      {state.message}
                    </p>
                  </motion.div>
                )}

                {state.error && (
                  <div className="mt-5 rounded-xl border border-red-400/10 bg-red-400/[0.06] p-4 text-sm leading-6 text-red-300">
                    {state.error}
                  </div>
                )}

                {/* =================================================
                    SUBMIT
                ================================================== */}
                <button
                  type="submit"
                  disabled={state.loading}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_15px_45px_rgba(34,211,238,.12)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {state.loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send project details
                      <Send
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-slate-700">
                  Your information stays private
                </p>

              </div>
            </form>

          </motion.div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-10 bg-[#050505]" />

    </main>
  );
}

/* ============================================================
   INPUT COMPONENT
============================================================ */

function Input({
  icon: Icon,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-700"
        />

        <input
          required={required}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/[0.08] bg-[#090b0e] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.05]"
        />
      </div>
    </label>
  );
}

/* ============================================================
   SELECT COMPONENT
============================================================ */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm text-slate-400 outline-none transition-all focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.05]"
      >
        <option value="">
          Select...
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ============================================================
   CONTACT INFO
============================================================ */

function ContactInfo({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-black/10 p-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-500">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
          {title}
        </p>

        <p className="mt-1 truncate text-xs font-medium text-slate-400">
          {value}
        </p>
      </div>

    </div>
  );
}