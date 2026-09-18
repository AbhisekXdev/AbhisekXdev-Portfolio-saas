import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-glow transition hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">Featured</span>
        <Link to={`/projects/${project.id}`} className="text-xs text-slate-400 hover:text-white">Details →</Link>
      </div>
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech_stack?.map(item => (
          <span key={item} className="rounded-md bg-slate-900 px-2 py-1 text-xs text-slate-300">{item}</span>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        {project.repository_url && (
          <a className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white" href={project.repository_url} target="_blank" rel="noreferrer">
            <Github size={16} /> Repo
          </a>
        )}
        {project.live_url && (
          <a className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200" href={project.live_url} target="_blank" rel="noreferrer">
            <ExternalLink size={16} /> Live
          </a>
        )}
      </div>
    </article>
  );
}
