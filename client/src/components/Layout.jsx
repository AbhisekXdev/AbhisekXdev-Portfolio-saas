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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="font-black tracking-tight text-white">Abhisek<span className="text-cyan-400">.dev</span></Link>

          <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `text-sm transition ${isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {open && (
          <nav className="border-t border-white/10 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {links.map(([label, to]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="text-slate-200">
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Abhisek K. Build Backend. Scale Systems. Ship Products.</p>
          <div className="flex gap-3">
            <a href="https://github.com/AbhisekXdev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/abhisek-koyal-0528a3288" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
