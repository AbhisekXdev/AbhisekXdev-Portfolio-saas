import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Inbox,
  LayoutDashboard,
  Linkedin,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const emptyProject = {
  title: '',
  slug: '',
  description: '',
  tech_stack: '',
  bullets: '',
  repository_url: '',
  live_url: '',
  featured: true,
  sort_order: 0,
};

const tabs = [
  {
    key: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: UserRound,
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: FolderKanban,
  },
  {
    key: 'inquiries',
    label: 'Inquiries',
    icon: Inbox,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Admin() {
  const { user, getToken, logout } = useAuth();

  const [tab, setTab] = useState('overview');
  const [dashboard, setDashboard] = useState({});
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const reduceMotion = useReducedMotion();

  async function authApi(path, options = {}) {
    const token = await getToken();

    return api(path, {
      ...options,
      token,
    });
  }

  async function load() {
    try {
      setLoading(true);

      const [d, p, s, e, i, pr] = await Promise.all([
        authApi('/admin/dashboard'),
        api('/portfolio'),
        api('/skills'),
        api('/experience'),
        authApi('/admin/inquiries'),
        api('/projects'),
      ]);

      setDashboard(d);
      setProfile(p.profile || {});
      setSkills(s);
      setExperience(e);
      setInquiries(i);
      setProjects(pr);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user]);

  async function saveProfile(event) {
    event.preventDefault();

    try {
      await authApi('/admin/profile', {
        method: 'PUT',
        body: profile,
      });

      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  }

  function prepareProject(project) {
    setEditingId(project.id);

    setProjectForm({
      ...project,
      tech_stack: project.tech_stack.join(', '),
      bullets: project.bullets.join('\n'),
    });

    setTab('projects');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function saveProject(event) {
    event.preventDefault();

    try {
      const payload = {
        ...projectForm,

        tech_stack: projectForm.tech_stack
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean),

        bullets: projectForm.bullets
          .split('\n')
          .map((x) => x.trim())
          .filter(Boolean),
      };

      await authApi(
        editingId
          ? `/admin/projects/${editingId}`
          : '/admin/projects',
        {
          method: editingId ? 'PUT' : 'POST',
          body: payload,
        }
      );

      const wasEditing = Boolean(editingId);

      setProjectForm(emptyProject);
      setEditingId(null);

      setMessage(
        wasEditing
          ? 'Project updated successfully.'
          : 'Project created successfully.'
      );

      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteProject(id) {
    if (!window.confirm('Delete this project?')) {
      return;
    }

    try {
      await authApi(`/admin/projects/${id}`, {
        method: 'DELETE',
      });

      setMessage('Project deleted.');
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function updateInquiry(id, status) {
    try {
      await authApi(`/admin/inquiries/${id}`, {
        method: 'PATCH',
        body: {
          status,
        },
      });

      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function resetProject() {
    setEditingId(null);
    setProjectForm(emptyProject);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* =====================================================
          MOBILE / DESKTOP HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050505]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400">
              <Code2 size={18} />
            </div>

            <div>
              <p className="text-sm font-black">
                Abhisek<span className="text-cyan-400">.dev</span>
              </p>

              <p className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-600 sm:block">
                Portfolio CMS
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-slate-300">
                {user?.displayName || 'Administrator'}
              </p>

              <p className="text-[10px] text-slate-600">
                {user?.email}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.05]">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={16} className="text-slate-500" />
              )}
            </div>

            <button
              onClick={logout}
              className="hidden items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-red-400/20 hover:bg-red-400/[0.05] hover:text-red-300 sm:flex"
            >
              <LogOut size={14} />
              Sign out
            </button>

          </div>

        </div>
      </header>

      {/* =====================================================
          DASHBOARD BODY
      ====================================================== */}

      <div className="mx-auto flex max-w-[1600px]">

        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-64 shrink-0 border-r border-white/[0.07] bg-[#07090c] p-5 lg:block">

          <div className="flex h-full flex-col">

            <div>

              <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-700">
                Workspace
              </p>

              <nav className="space-y-1">

                {tabs.map((item) => {
                  const Icon = item.icon;
                  const active = tab === item.key;

                  return (
                    <button
                      key={item.key}
                      onClick={() => setTab(item.key)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                        active
                          ? 'bg-cyan-400/[0.08] text-cyan-300'
                          : 'text-slate-500 hover:bg-white/[0.035] hover:text-white'
                      }`}
                    >

                      <Icon
                        size={17}
                        className={
                          active
                            ? 'text-cyan-400'
                            : 'text-slate-600 group-hover:text-slate-300'
                        }
                      />

                      <span>{item.label}</span>

                      {item.key === 'inquiries' &&
                        dashboard.newInquiries > 0 && (
                          <span className="ml-auto rounded-full bg-cyan-400 px-2 py-0.5 text-[9px] font-black text-black">
                            {dashboard.newInquiries}
                          </span>
                        )}

                    </button>
                  );
                })}

              </nav>

            </div>

            {/* Bottom */}
            <div className="mt-auto">

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">

                <div className="flex items-center gap-2">
                  <Activity
                    size={15}
                    className="text-cyan-400"
                  />

                  <span className="text-xs font-semibold text-white">
                    System status
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.5)]" />

                  <span className="text-[11px] text-slate-600">
                    All systems operational
                  </span>
                </div>

              </div>

            </div>

          </div>
        </aside>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="min-w-0 flex-1">

          {/* Mobile nav */}
          <div className="border-b border-white/[0.07] bg-[#07090c] px-4 py-3 lg:hidden">

            <div className="flex gap-2 overflow-x-auto">

              {tabs.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      tab === item.key
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </button>
                );
              })}

            </div>
          </div>

          <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">

            {/* =================================================
                TOP PAGE HEADER
            ================================================== */}

            <motion.div
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? false : 'visible'}
              variants={fadeUp}
              className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
            >

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                  {tab === 'overview'
                    ? 'Dashboard'
                    : tabs.find((x) => x.key === tab)?.label}
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {tab === 'overview'
                    ? 'Portfolio control center'
                    : tab === 'profile'
                      ? 'Profile settings'
                      : tab === 'projects'
                        ? 'Project management'
                        : 'Project inquiries'}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {tab === 'overview'
                    ? 'Manage your portfolio, projects and client requests from one place.'
                    : tab === 'profile'
                      ? 'Keep your professional information up to date.'
                      : tab === 'projects'
                        ? 'Create, edit and organize the projects shown on your portfolio.'
                        : 'Review and manage incoming project requests.'}
                </p>

              </div>

              {tab === 'projects' && (
                <button
                  onClick={resetProject}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  <Plus size={16} />
                  New project
                </button>
              )}

            </motion.div>

            {/* Message */}
            {message && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-cyan-400"
                  />

                  <p className="text-xs text-cyan-200">
                    {message}
                  </p>
                </div>

                <button
                  onClick={() => setMessage('')}
                  className="text-slate-600 hover:text-white"
                >
                  <X size={15} />
                </button>
              </motion.div>
            )}

            {/* =================================================
                OVERVIEW
            ================================================== */}

            {tab === 'overview' && (
              <Overview
                dashboard={dashboard}
                projects={projects}
                inquiries={inquiries}
                loading={loading}
                setTab={setTab}
                reduceMotion={reduceMotion}
              />
            )}

            {/* =================================================
                PROFILE
            ================================================== */}

            {tab === 'profile' && (
              <ProfileEditor
                profile={profile}
                setProfile={setProfile}
                saveProfile={saveProfile}
                reduceMotion={reduceMotion}
              />
            )}

            {/* =================================================
                PROJECTS
            ================================================== */}

            {tab === 'projects' && (
              <ProjectsManager
                projects={projects}
                projectForm={projectForm}
                setProjectForm={setProjectForm}
                editingId={editingId}
                saveProject={saveProject}
                prepareProject={prepareProject}
                deleteProject={deleteProject}
                resetProject={resetProject}
                reduceMotion={reduceMotion}
              />
            )}

            {/* =================================================
                INQUIRIES
            ================================================== */}

            {tab === 'inquiries' && (
              <Inquiries
                inquiries={inquiries}
                updateInquiry={updateInquiry}
                reduceMotion={reduceMotion}
              />
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   OVERVIEW
============================================================ */

function Overview({
  dashboard,
  projects,
  inquiries,
  loading,
  setTab,
  reduceMotion,
}) {
  const cards = [
    {
      label: 'Projects',
      value: dashboard.projects,
      icon: FolderKanban,
      tab: 'projects',
    },
    {
      label: 'Skills',
      value: dashboard.skills,
      icon: Sparkles,
      tab: 'profile',
    },
    {
      label: 'Experience',
      value: dashboard.experience,
      icon: BriefcaseBusiness,
      tab: 'profile',
    },
    {
      label: 'New inquiries',
      value: dashboard.newInquiries,
      icon: Inbox,
      tab: 'inquiries',
    },
  ];

  return (
    <div className="space-y-8">

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.button
              key={card.label}
              onClick={() => setTab(card.tab)}
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
                delay: index * 0.06,
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:bg-white/[0.04]"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-500 transition group-hover:border-cyan-400/10 group-hover:bg-cyan-400/[0.05] group-hover:text-cyan-400">
                  <Icon size={18} />
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                />

              </div>

              <p className="mt-7 text-xs font-medium text-slate-600">
                {card.label}
              </p>

              <p className="mt-1 text-3xl font-black tracking-tight text-white">
                {loading ? '—' : card.value ?? '0'}
              </p>

            </motion.button>
          );
        })}

      </div>

      {/* Main dashboard grid */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">

        {/* Recent projects */}
        <motion.section
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.025]"
        >

          <SectionHeader
            icon={FolderKanban}
            title="Recent projects"
            action="View all"
            onClick={() => setTab('projects')}
          />

          <div className="divide-y divide-white/[0.06]">

            {projects.slice(0, 5).map((project) => (
              <div
                key={project.id}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-600">
                    <Code2 size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {project.title}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-slate-600">
                      {project.slug}
                    </p>
                  </div>

                </div>

                {project.featured && (
                  <span className="shrink-0 rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                    Featured
                  </span>
                )}

              </div>
            ))}

            {!projects.length && (
              <Empty text="No projects yet." />
            )}

          </div>
        </motion.section>

        {/* Inquiries */}
        <motion.section
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.025]"
        >

          <SectionHeader
            icon={Inbox}
            title="Latest inquiries"
            action="View inbox"
            onClick={() => setTab('inquiries')}
          />

          <div className="divide-y divide-white/[0.06]">

            {inquiries.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="px-5 py-4 sm:px-6"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.project_title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-600">
                      {item.name} · {item.email}
                    </p>
                  </div>

                  <StatusBadge status={item.status} />

                </div>

              </div>
            ))}

            {!inquiries.length && (
              <Empty text="No inquiries yet." />
            )}

          </div>
        </motion.section>

      </div>

    </div>
  );
}

/* ============================================================
   PROFILE
============================================================ */

function ProfileEditor({
  profile,
  setProfile,
  saveProfile,
  reduceMotion,
}) {
  const fields = [
    ['name', 'Full name'],
    ['headline', 'Headline'],
    ['email', 'Email'],
    ['linkedin_url', 'LinkedIn URL'],
    ['github_url', 'GitHub URL'],
    ['portfolio_url', 'Portfolio URL'],
  ];

  return (
    <motion.form
      onSubmit={saveProfile}
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion ? false : 'visible'}
      variants={fadeUp}
      className="grid gap-6 xl:grid-cols-[1fr_320px]"
    >

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
            Personal information
          </p>

          <h2 className="mt-2 text-xl font-black text-white">
            Professional profile
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            This information appears across your public portfolio.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {fields.map(([key, label]) => (
            <AdminInput
              key={key}
              label={label}
              value={profile[key] || ''}
              onChange={(value) =>
                setProfile({
                  ...profile,
                  [key]: value,
                })
              }
            />
          ))}

          <div className="md:col-span-2">

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Professional summary
              </span>

              <textarea
                rows="7"
                value={profile.summary || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    summary: e.target.value,
                  })
                }
                className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm leading-7 text-white outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/[0.04]"
                placeholder="Write a short professional summary..."
              />

            </label>

          </div>

        </div>

        <button
          type="submit"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          <Save size={16} />
          Save profile
        </button>

      </div>

      {/* Preview */}
      <div className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">

        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
          Preview
        </p>

        <div className="mt-7">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/[0.08] text-cyan-400">
            <UserRound size={22} />
          </div>

          <h3 className="mt-5 text-xl font-black text-white">
            {profile.name || 'Your Name'}
          </h3>

          <p className="mt-2 text-sm font-medium text-cyan-300">
            {profile.headline || 'Your professional headline'}
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            {profile.summary ||
              'Your professional summary will appear here.'}
          </p>

        </div>

      </div>

    </motion.form>
  );
}

/* ============================================================
   PROJECT MANAGER
============================================================ */

function ProjectsManager({
  projects,
  projectForm,
  setProjectForm,
  editingId,
  saveProject,
  prepareProject,
  deleteProject,
  resetProject,
  reduceMotion,
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">

      {/* Form */}
      <motion.form
        onSubmit={saveProject}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'visible'}
        variants={fadeUp}
        className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7"
      >

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
              {editingId ? 'Edit project' : 'New project'}
            </p>

            <h2 className="mt-2 text-xl font-black text-white">
              {editingId
                ? 'Update project'
                : 'Create project'}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetProject}
              className="rounded-lg p-2 text-slate-600 hover:bg-white/[0.05] hover:text-white"
            >
              <X size={16} />
            </button>
          )}

        </div>

        <div className="mt-7 space-y-4">

          <AdminInput
            label="Project title"
            value={projectForm.title}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                title: value,
              })
            }
            required
          />

          <AdminInput
            label="Slug"
            value={projectForm.slug}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                slug: value,
              })
            }
            required
          />

          <AdminInput
            label="Repository URL"
            value={projectForm.repository_url}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                repository_url: value,
              })
            }
          />

          <AdminInput
            label="Live URL"
            value={projectForm.live_url}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                live_url: value,
              })
            }
          />

          <AdminTextarea
            label="Description"
            value={projectForm.description}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                description: value,
              })
            }
            required
            rows={5}
          />

          <AdminTextarea
            label="Technology stack"
            value={projectForm.tech_stack}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                tech_stack: value,
              })
            }
            placeholder="React, Node.js, MySQL"
            rows={3}
          />

          <AdminTextarea
            label="Highlights"
            value={projectForm.bullets}
            onChange={(value) =>
              setProjectForm({
                ...projectForm,
                bullets: value,
              })
            }
            placeholder="One achievement per line"
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">

            <AdminInput
              label="Sort order"
              type="number"
              value={projectForm.sort_order}
              onChange={(value) =>
                setProjectForm({
                  ...projectForm,
                  sort_order: value,
                })
              }
            />

            <label className="flex items-end pb-1">

              <span className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/[0.08] bg-[#090b0e] px-3 py-3.5 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      featured: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-cyan-400"
                />

                Featured
              </span>

            </label>

          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-black text-black transition hover:bg-cyan-300"
          >
            {editingId ? (
              <>
                <Save size={16} />
                Update project
              </>
            ) : (
              <>
                <Plus size={16} />
                Create project
              </>
            )}
          </button>

        </div>
      </motion.form>

      {/* Project list */}
      <div className="space-y-4">

        {projects.map((project, index) => (
          <motion.article
            key={project.id}
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
              duration: 0.45,
              delay: index * 0.05,
            }}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.035] sm:p-6"
          >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex min-w-0 gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
                  <Code2 size={19} />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span className="rounded-full bg-cyan-400/[0.08] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                        Featured
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-xs text-slate-600">
                    /{project.slug}
                  </p>

                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => prepareProject(project)}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
                >
                  <Pencil size={13} />
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="flex items-center gap-2 rounded-lg border border-red-400/10 bg-red-400/[0.04] px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/[0.08]"
                >
                  <Trash2 size={13} />
                  Delete
                </button>

              </div>

            </div>

            <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {project.tech_stack?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] font-medium text-slate-500"
                >
                  {tech}
                </span>
              ))}

            </div>

            <div className="mt-5 flex flex-wrap gap-4 border-t border-white/[0.06] pt-4">

              {project.repository_url && (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-white"
                >
                  <Github size={14} />
                  Repository
                  <ExternalLink size={11} />
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-cyan-300"
                >
                  <ExternalLink size={14} />
                  Live project
                </a>
              )}

            </div>

          </motion.article>
        ))}

        {!projects.length && (
          <div className="rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
            <FolderKanban
              size={30}
              className="mx-auto text-slate-700"
            />

            <p className="mt-4 text-sm font-semibold text-white">
              No projects yet
            </p>

            <p className="mt-2 text-xs text-slate-600">
              Create your first portfolio project.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

/* ============================================================
   INQUIRIES
============================================================ */

function Inquiries({
  inquiries,
  updateInquiry,
  reduceMotion,
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion ? false : 'visible'}
      variants={fadeUp}
      className="space-y-4"
    >

      {inquiries.map((item) => (
        <article
          key={item.id}
          className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] sm:p-7"
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
                <Mail size={18} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-lg font-bold text-white">
                    {item.project_title}
                  </h2>

                  <StatusBadge status={item.status} />

                </div>

                <p className="mt-1 text-sm text-cyan-300">
                  {item.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-600">
                  {item.email}
                  {item.company
                    ? ` · ${item.company}`
                    : ''}
                </p>

              </div>

            </div>

            <select
              value={item.status}
              onChange={(e) =>
                updateInquiry(
                  item.id,
                  e.target.value
                )
              }
              className="w-full appearance-none rounded-lg border border-white/[0.08] bg-[#090b0e] px-3 py-2.5 text-xs text-slate-400 outline-none focus:border-cyan-400/30 lg:w-auto"
            >
              {[
                'new',
                'reviewing',
                'contacted',
                'closed',
              ].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-7 rounded-xl border border-white/[0.05] bg-black/10 p-4">

            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-400">
              {item.description}
            </p>

          </div>

          <div className="mt-5 flex flex-wrap gap-2">

            {item.project_type && (
              <InfoBadge>
                {item.project_type}
              </InfoBadge>
            )}

            {item.budget && (
              <InfoBadge>
                Budget: {item.budget}
              </InfoBadge>
            )}

            {item.timeline && (
              <InfoBadge>
                Timeline: {item.timeline}
              </InfoBadge>
            )}

            {item.features?.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-1.5 text-[10px] font-medium text-cyan-300"
              >
                {feature}
              </span>
            ))}

          </div>

        </article>
      ))}

      {!inquiries.length && (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-24 text-center">

          <Inbox
            size={32}
            className="mx-auto text-slate-700"
          />

          <h2 className="mt-5 font-bold text-white">
            No inquiries yet
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            New project requests will appear here.
          </p>

        </div>
      )}

    </motion.div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function AdminInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-800 focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.04]"
      />

    </label>
  );
}

function AdminTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-white/[0.08] bg-[#090b0e] px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-800 focus:border-cyan-400/40 focus:bg-[#0b0e12] focus:ring-4 focus:ring-cyan-400/[0.04]"
      />

    </label>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  action,
  onClick,
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">

      <div className="flex items-center gap-2.5">

        <Icon
          size={16}
          className="text-cyan-400"
        />

        <h2 className="text-sm font-bold text-white">
          {title}
        </h2>

      </div>

      <button
        onClick={onClick}
        className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 transition hover:text-white"
      >
        {action}
        <ChevronRight size={13} />
      </button>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    new: 'border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-300',
    reviewing:
      'border-amber-400/10 bg-amber-400/[0.05] text-amber-300',
    contacted:
      'border-blue-400/10 bg-blue-400/[0.05] text-blue-300',
    closed:
      'border-white/[0.08] bg-white/[0.03] text-slate-500',
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
        styles[status] || styles.closed
      }`}
    >
      {status}
    </span>
  );
}

function InfoBadge({ children }) {
  return (
    <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-slate-500">
      {children}
    </span>
  );
}

function Empty({ text }) {
  return (
    <div className="px-6 py-12 text-center">
      <FileText
        size={24}
        className="mx-auto text-slate-700"
      />

      <p className="mt-3 text-xs text-slate-600">
        {text}
      </p>
    </div>
  );
}