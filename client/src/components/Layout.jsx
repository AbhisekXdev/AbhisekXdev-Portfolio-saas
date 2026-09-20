import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const links = [
    ['Home', '/'],
    ['Projects', '/projects'],
    ['Experience', '/experience'],
    ['Contact', '/contact'],
    ['Admin', '/admin']
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#111827]/95 supports-[backdrop-filter]:backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            to="/"
            className="shrink-0 text-lg font-black tracking-tight text-white transition-opacity duration-150 hover:opacity-90"
          >
            Abhisek<span className="text-cyan-400">.dev</span>
          </Link>

          <button
            type="button"
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-200 transition-colors duration-150 hover:bg-white/[0.07] hover:text-white md:hidden"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-cyan-400/10 text-cyan-400'
                      : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {open && (
          <nav className="border-t border-white/[0.08] bg-[#111827] px-4 py-3 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {links.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-white/[0.05] hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/[0.08] bg-[#0f172a]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p className="leading-6">
            © {new Date().getFullYear()} Abhisek K. Build Backend. Scale Systems. Ship Products.
          </p>

          <div className="flex gap-2">
            <a
              href="https://github.com/AbhisekXdev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 text-slate-400 transition-colors duration-150 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-white"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/abhisek-koyal-0528a3288"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 text-slate-400 transition-colors duration-150 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
