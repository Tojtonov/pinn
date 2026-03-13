import React, { useState } from 'react'

// Premium Logo Component
const Logo = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <rect width="32" height="32" rx="8" fill="#7C3AED"/>
    <path d="M8 16C8 11.5817 11.5817 8 16 8V8C20.4183 8 24 11.5817 24 16V24H16C11.5817 24 8 20.4183 8 16V16Z" fill="white" fillOpacity="0.95"/>
    <circle cx="16" cy="16" r="3" fill="#7C3AED"/>
  </svg>
)

// Icon Components
const Icons = {
  Arrow: () => <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Play: () => <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M4 3v10l9-5-9-5z"/></svg>,
  Check: () => <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Star: () => <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-amber-400"><path d="M8 1l2.2 4.4 4.8.7-3.5 3.4.8 4.9L8 12l-4.3 2.4.8-4.9L1 6.1l4.8-.7L8 1z"/></svg>,
}

// Mini UI Components for Feature Cards
const FeatureUIs = {
  // Kanban Board Mini UI
  KanbanBoard: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="flex gap-2 h-full">
        {['To Do', 'Progress', 'Done'].map((col, i) => (
          <div key={i} className="flex-1 bg-white rounded-lg p-2 border border-slate-100">
            <div className="flex items-center gap-1 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full ${['bg-slate-300', 'bg-amber-400', 'bg-emerald-400'][i]}`}/>
              <span className="text-[10px] font-medium text-slate-500">{col}</span>
            </div>
            {[1,2].map(j => (
              <div key={j} className="bg-slate-50 rounded p-1.5 mb-1.5 border border-slate-100">
                <div className="h-1.5 bg-slate-200 rounded w-full mb-1"/>
                <div className="h-1 bg-slate-100 rounded w-2/3"/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
  // Analytics Dashboard Mini UI
  Analytics: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="flex gap-2 mb-3">
        {[
          { value: '2.4k', label: 'Users', color: 'bg-violet-500' },
          { value: '+12%', label: 'Growth', color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="flex-1 bg-white rounded-lg p-2 border border-slate-100">
            <div className={`w-1.5 h-1.5 rounded-full ${stat.color} mb-1`}/>
            <div className="text-sm font-bold text-slate-800">{stat.value}</div>
            <div className="text-[9px] text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg p-2 border border-slate-100 h-16">
        <div className="flex items-end gap-1 h-full pb-1">
          {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 85].map((h, i) => (
            <div key={i} className="flex-1 bg-violet-500 rounded-t" style={{height: `${h}%`}}/>
          ))}
        </div>
      </div>
    </div>
  ),
  // Calendar Mini UI  
  Calendar: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="bg-white rounded-lg border border-slate-100 h-full p-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-semibold text-slate-700">February 2026</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-slate-100"/>
            <div className="w-4 h-4 rounded bg-slate-100"/>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-[8px] text-slate-400 mb-1">
          {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({length: 28}, (_, i) => (
            <div key={i} className={`aspect-square rounded text-[8px] flex items-center justify-center ${i === 14 ? 'bg-violet-500 text-white' : i === 15 || i === 16 ? 'bg-violet-100 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  // Automation Flow Mini UI
  Automation: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="space-y-2 h-full flex flex-col justify-center">
        <div className="bg-white rounded-lg p-2 border border-slate-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-amber-500"/>
          </div>
          <div className="flex-1">
            <div className="h-1.5 bg-slate-200 rounded w-20 mb-1"/>
            <div className="h-1 bg-slate-100 rounded w-14"/>
          </div>
        </div>
        <div className="flex justify-center">
          <svg className="w-3 h-4 text-slate-300" fill="none" viewBox="0 0 12 16"><path d="M6 0v16M3 13l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <div className="bg-violet-50 rounded-lg p-2 border border-violet-200 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-violet-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div className="flex-1">
            <div className="h-1.5 bg-violet-200 rounded w-24 mb-1"/>
            <div className="h-1 bg-violet-100 rounded w-16"/>
          </div>
        </div>
      </div>
    </div>
  ),
  // Team Chat Mini UI
  TeamChat: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="bg-white rounded-lg border border-slate-100 h-full p-2 flex flex-col">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2">
          <div className="w-5 h-5 rounded-full bg-violet-500"/>
          <span className="text-[10px] font-medium text-slate-700">#engineering</span>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { name: 'Sarah', msg: 'Pushed the new update', color: 'bg-blue-500' },
            { name: 'Alex', msg: 'Looks great! Merging now', color: 'bg-emerald-500' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <div className={`w-4 h-4 rounded-full ${m.color} shrink-0`}/>
              <div>
                <span className="text-[9px] font-medium text-slate-700">{m.name}</span>
                <div className="text-[9px] text-slate-500">{m.msg}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-2 border-t border-slate-100">
          <div className="h-5 bg-slate-50 rounded border border-slate-200 px-2 flex items-center">
            <span className="text-[9px] text-slate-400">Type a message...</span>
          </div>
        </div>
      </div>
    </div>
  ),
  // Integrations Mini UI
  Integrations: () => (
    <div className="bg-slate-50 rounded-lg p-3 h-40">
      <div className="grid grid-cols-3 gap-2 h-full">
        {[
          { icon: 'G', color: 'bg-blue-500', name: 'GitHub' },
          { icon: 'S', color: 'bg-green-500', name: 'Slack' },
          { icon: 'F', color: 'bg-blue-600', name: 'Figma' },
          { icon: 'N', color: 'bg-slate-800', name: 'Notion' },
          { icon: 'L', color: 'bg-indigo-500', name: 'Linear' },
          { icon: '+', color: 'bg-slate-200 text-slate-600', name: '200+' },
        ].map((app, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-100 p-2 flex flex-col items-center justify-center">
            <div className={`w-7 h-7 rounded-lg ${app.color} text-white flex items-center justify-center text-xs font-bold mb-1`}>
              {app.icon}
            </div>
            <span className="text-[8px] text-slate-500">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

// Feature cards with rich UI previews
const features = [
  { title: 'Project Management', desc: 'Organize work with kanban boards, lists, and timelines. Track progress in real-time.', ui: FeatureUIs.KanbanBoard, span: 'lg:col-span-2' },
  { title: 'Powerful Analytics', desc: 'Get insights into team performance and project health with beautiful dashboards.', ui: FeatureUIs.Analytics, span: '' },
  { title: 'Smart Scheduling', desc: 'Plan sprints and deadlines with an intuitive calendar that syncs everywhere.', ui: FeatureUIs.Calendar, span: '' },
  { title: 'Workflow Automation', desc: 'Automate repetitive tasks. When X happens, do Y. Save hours every week.', ui: FeatureUIs.Automation, span: '' },
  { title: 'Team Communication', desc: 'Built-in chat with threads, mentions, and reactions. No more context switching.', ui: FeatureUIs.TeamChat, span: '' },
  { title: '200+ Integrations', desc: 'Connect your favorite tools. GitHub, Slack, Figma, Notion, and more.', ui: FeatureUIs.Integrations, span: 'lg:col-span-2' },
]

// Pricing data
const pricing = [
  { name: 'Free', price: '0', desc: 'For small teams getting started', features: ['Up to 5 members', 'Unlimited projects', '5GB storage', 'Basic integrations'], popular: false },
  { name: 'Pro', price: '12', desc: 'For growing teams', features: ['Unlimited members', 'Advanced analytics', '100GB storage', 'Priority support', 'Custom workflows', 'SSO'], popular: true },
  { name: 'Enterprise', price: 'Custom', desc: 'For large organizations', features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'Custom contracts', 'SLA guarantee', 'On-premise'], popular: false },
]

// Testimonials
const testimonials = [
  { quote: "Arc transformed how our team works. We shipped 40% faster in the first month.", name: "Sarah Chen", role: "VP Engineering", company: "Stripe", color: 'bg-violet-500' },
  { quote: "Finally, a tool that doesn't get in the way. The UI is incredibly fast and intuitive.", name: "Marcus Williams", role: "Product Lead", company: "Vercel", color: 'bg-blue-500' },
  { quote: "We evaluated 10+ tools. Arc was the only one our entire team actually wanted to use.", name: "Emily Rodriguez", role: "CEO", company: "Linear", color: 'bg-pink-500' },
]

export default function App() {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-semibold text-slate-900">Arc</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {['Product', 'Pricing', 'Customers', 'Resources'].map((item) => (
                <a key={item} href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Log in</a>
            <button className="text-sm font-medium bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
              Get started free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Now with AI-powered project insights
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              Where teams build
              <br />
              <span className="text-violet-600">great products</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              The modern workspace that brings your projects, docs, and team together. Built for speed, designed for humans.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-medium text-lg hover:bg-slate-800 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                Start for free
                <Icons.Arrow />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icons.Play />
                </div>
                Watch demo
              </button>
            </div>
            <p className="text-sm text-slate-500">Free forever for teams up to 5. No credit card required.</p>
          </div>

          {/* Hero Product Screenshot */}
          <div className="relative">
            {/* Main screenshot container */}
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-300"/>
                  <div className="w-3 h-3 rounded-full bg-slate-300"/>
                  <div className="w-3 h-3 rounded-full bg-slate-300"/>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-lg border border-slate-200 text-sm text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    app.arc.dev
                  </div>
                </div>
              </div>
              
              {/* App UI */}
              <div className="flex h-[480px]">
                {/* Sidebar */}
                <div className="w-56 bg-slate-50 border-r border-slate-200 p-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-violet-600"/>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">Acme Inc</div>
                      <div className="text-xs text-slate-500">Pro Plan</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {['Home', 'Inbox', 'Projects', 'Roadmap', 'Reports'].map((item, i) => (
                      <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${i === 2 ? 'bg-violet-100 text-violet-700 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}>
                        <div className={`w-4 h-4 rounded ${i === 2 ? 'bg-violet-200' : 'bg-slate-200'}`}/>
                        {item}
                        {i === 1 && <span className="ml-auto text-xs bg-violet-500 text-white px-1.5 py-0.5 rounded-full animate-pulse-subtle">3</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="text-xs font-medium text-slate-400 uppercase mb-2 px-3">Teams</div>
                    {['Engineering', 'Design', 'Marketing'].map((team, i) => (
                      <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
                        <div className={`w-3 h-3 rounded-full ${['bg-blue-500', 'bg-pink-500', 'bg-amber-500'][i]}`}/>
                        {team}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 bg-white p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Product Launch</h2>
                      <p className="text-sm text-slate-500">Sprint 23 · Feb 1-14</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Filter</button>
                      <button className="px-4 py-1.5 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700">+ New Issue</button>
                    </div>
                  </div>
                  
                  {/* Kanban board */}
                  <div className="flex gap-4">
                    {[
                      { name: 'To Do', count: 8, color: 'bg-slate-400' },
                      { name: 'In Progress', count: 5, color: 'bg-amber-400' },
                      { name: 'Review', count: 3, color: 'bg-blue-400' },
                      { name: 'Done', count: 12, color: 'bg-emerald-400' },
                    ].map((col, colIdx) => (
                      <div key={colIdx} className="flex-1 bg-slate-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-2 h-2 rounded-full ${col.color}`}/>
                          <span className="text-sm font-medium text-slate-700">{col.name}</span>
                          <span className="text-xs text-slate-400 ml-auto">{col.count}</span>
                        </div>
                        {[0, 1, 2].slice(0, colIdx === 3 ? 2 : 3).map((_, i) => (
                          <div key={i} className="bg-white rounded-lg p-3 mb-2 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-xs text-slate-400 mb-1">ARC-{100 + colIdx * 10 + i}</div>
                            <div className="text-sm text-slate-700 mb-2 font-medium">
                              {['Implement auth flow', 'Design landing page', 'API optimization', 'Update docs'][i % 4]}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${['bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600', 'bg-emerald-100 text-emerald-600'][i]}`}>
                                {['High', 'Medium', 'Low'][i]}
                              </span>
                              <div className="w-5 h-5 rounded-full bg-violet-500"/>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right panel */}
                <div className="w-72 border-l border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">Activity</h3>
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle"/>
                        Live
                      </span>
                    </div>
                    <span className="text-xs text-violet-600 font-medium">View all</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { user: 'Sarah', action: 'completed "Auth flow"', time: '2m ago', color: 'bg-violet-500' },
                      { user: 'Alex', action: 'commented on ARC-112', time: '15m ago', color: 'bg-blue-500' },
                      { user: 'Maria', action: 'created new issue', time: '1h ago', color: 'bg-pink-500' },
                      { user: 'James', action: 'moved to Review', time: '2h ago', color: 'bg-emerald-500' },
                    ].map((activity, i) => (
                      <div key={i} className={`flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 animate-fade-in-${i + 1}`}>
                        <div className={`w-7 h-7 rounded-full ${activity.color} shrink-0`}/>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-700 truncate">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </div>
                          <div className="text-xs text-slate-400">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                    {/* Typing indicator */}
                    <div className="flex items-center gap-2.5 p-2 rounded-lg">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 shrink-0"/>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-slate-500">Tom is typing</span>
                        <span className="flex gap-0.5">
                          <span className="w-1 h-1 rounded-full bg-slate-400 typing-dot"/>
                          <span className="w-1 h-1 rounded-full bg-slate-400 typing-dot"/>
                          <span className="w-1 h-1 rounded-full bg-slate-400 typing-dot"/>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Sprint Progress</h4>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>28 of 40 tasks</span>
                        <span>70%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full animate-progress"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-16 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-slate-500 mb-10">Trusted by 10,000+ teams at</p>
          <div className="flex justify-center items-center gap-x-16 gap-y-8 flex-wrap">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'GitHub'].map((company) => (
              <span key={company} className="text-xl font-semibold text-slate-300 hover:text-slate-400 transition-colors">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks with UI */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything your team needs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Powerful features packed into a beautiful interface. Built for modern teams who care about their craft.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div key={i} className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300 ${feature.span}`}>
                <div className="p-5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
                <div className="px-5 pb-5">
                  <feature.ui />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by teams worldwide</h2>
            <p className="text-lg text-slate-600">See why thousands of teams choose Arc.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Icons.Star key={j} />)}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color}`}/>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600 mb-8">Start free. Upgrade when you're ready.</p>
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
              <button onClick={() => setBilling('monthly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>Monthly</button>
              <button onClick={() => setBilling('yearly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${billing === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                Yearly <span className="text-emerald-600 text-xs ml-1">-20%</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <div key={i} className={`relative bg-white rounded-2xl border-2 p-8 ${plan.popular ? 'border-violet-500 shadow-xl' : 'border-slate-200 hover:border-slate-300'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-500 text-white text-xs font-medium rounded-full">Most Popular</div>}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price === 'Custom' ? '' : '$'}{billing === 'yearly' && plan.price !== 'Custom' && plan.price !== '0' ? Math.round(parseInt(plan.price) * 0.8) : plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-500 ml-1">/user/mo</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Icons.Check /></div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${plan.popular ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform how your team works?</h2>
          <p className="text-lg text-slate-400 mb-10">Join 10,000+ teams shipping faster with Arc.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-medium text-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              Get started free
              <Icons.Arrow />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-xl font-medium text-lg hover:bg-slate-700 transition-colors border border-slate-700">
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <Logo />
                <span className="text-lg font-semibold text-white">Arc</span>
              </div>
              <p className="text-sm text-slate-400 max-w-xs">The modern workspace for teams who build great products.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Resources', links: ['Docs', 'Help', 'Community', 'Status'] },
            ].map((col, i) => (
              <div key={i}>
                <p className="font-medium text-white mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => <li key={j}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4">
            <p className="text-sm text-slate-500">© 2026 Arc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-white">Privacy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white">Terms</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
