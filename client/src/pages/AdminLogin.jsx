import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

const features = [
  'Manage portfolio content',
  'Update projects and experience',
  'Review incoming project inquiries',
];

export default function AdminLogin() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  async function login() {
    try {
      setError('');
      setLoading(true);

      await loginWithGoogle();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Cyan glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[140px]"
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          LOGIN AREA
      ====================================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-16 sm:px-8">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080a0d]/90 shadow-2xl shadow-black/50 backdrop-blur-xl lg:grid-cols-[1fr_0.85fr]">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -25,
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative hidden overflow-hidden border-r border-white/[0.07] bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-blue-500/[0.04] p-10 lg:flex lg:flex-col lg:justify-between xl:p-12"
          >

            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-cyan-400/[0.08]" />

            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-cyan-400/[0.06]" />

            {/* Logo */}
            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400">
                  <Code2 size={21} />
                </div>

                <div>
                  <p className="text-sm font-black tracking-tight text-white">
                    Abhisek<span className="text-cyan-400">.dev</span>
                  </p>

                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-slate-600">
                    Portfolio CMS
                  </p>
                </div>

              </div>

            </div>

            {/* Main content */}
            <div className="relative">

              <div className="mb-5 flex items-center gap-2">
                <Sparkles size={14} className="text-cyan-400" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Admin Workspace
                </span>
              </div>

              <h2 className="max-w-md text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-5xl">
                Manage your
                <span className="block text-slate-500">
                  digital presence.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
                Keep your portfolio, projects, experience and
                incoming client requests organized from one
                private workspace.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-3">

                {features.map((feature, index) => (

                  <motion.div
                    key={feature}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -15,
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
                      duration: 0.45,
                      delay: 0.25 + index * 0.1,
                    }}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-cyan-400"
                    />

                    <span className="text-sm text-slate-400">
                      {feature}
                    </span>

                  </motion.div>

                ))}

              </div>

            </div>

            {/* Bottom */}
            <div className="relative flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              <ShieldCheck size={14} />
              Secure administrator access
            </div>

          </motion.div>

          {/* =================================================
              RIGHT SIDE — LOGIN
          ================================================== */}

          <motion.div
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
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"
          >

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400">
                <Code2 size={19} />
              </div>

              <div>
                <p className="text-sm font-black text-white">
                  Abhisek<span className="text-cyan-400">.dev</span>
                </p>

                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                  Portfolio CMS
                </p>
              </div>

            </div>

            {/* Login icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
              <LockKeyhole size={20} />
            </div>

            {/* Heading */}
            <div className="mt-7">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Admin CMS
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                Welcome back.
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Sign in with your authorized Google account to
                access your portfolio workspace.
              </p>

            </div>

            {/* Login card */}
            <div className="mt-8">

              <button
                type="button"
                onClick={login}
                disabled={loading}
                className="group flex w-full items-center justify-between rounded-xl border border-white/[0.09] bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.06] hover:shadow-[0_15px_40px_rgba(0,0,0,.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <div className="flex items-center gap-3">

                  {/* Google icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white">
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
                    ) : (
                      <GoogleIcon />
                    )}
                  </div>

                  <div className="text-left">

                    <p className="text-sm font-bold text-white">
                      {loading
                        ? 'Signing you in...'
                        : 'Continue with Google'}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-600">
                      Authorized account only
                    </p>

                  </div>

                </div>

                {!loading && (
                  <div className="mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-slate-600 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:text-cyan-400">
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                )}

              </button>

            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
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
                className="mt-4 rounded-xl border border-red-400/10 bg-red-400/[0.06] px-4 py-3"
              >
                <p className="text-xs leading-5 text-red-300">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Security note */}
            <div className="mt-8 flex items-start gap-3 border-t border-white/[0.07] pt-6">

              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-slate-600"
              />

              <p className="text-[11px] leading-5 text-slate-700">
                Access is restricted to authorized administrator
                accounts. Your Google authentication is handled
                securely through Firebase.
              </p>

            </div>

            {/* Back */}
            <a
              href="/"
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-white"
            >
              <ArrowUpRight size={14} />
              Back to portfolio
            </a>

          </motion.div>

        </div>

      </div>
    </main>
  );
}

/* ============================================================
   GOOGLE ICON
============================================================ */

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.53 13.85A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.27.31-1.85V7.62H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.38l3.24-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.12c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.27 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.37l3.24 2.53C7.3 7.84 9.46 6.12 12 6.12Z"
      />
    </svg>
  );
}