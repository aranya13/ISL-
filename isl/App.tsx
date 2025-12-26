import React, { useState } from 'react';
import {
  Plane,
  Cpu,
  Satellite,
  BookOpen,
  Menu,
  X,
  ArrowRight,
  Activity,
  Map,
  Wind,
  Award
} from 'lucide-react';

import InteractiveModel from './components/InteractiveModel';
import { MODELS, COURSE_MODULES } from './constants';
import { TechModel } from './types';

function App() {
  const [activeModel, setActiveModel] = useState<TechModel>(MODELS[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'lab'>('learn');

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-2 rounded-md">
              <Satellite className="text-white h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold">ISL Space Lab</p>
              <p className="text-xs text-slate-500">Training Portal</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('learn')}
              className={`text-sm px-3 py-1.5 rounded-md ${
                activeTab === 'learn'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Course Material
            </button>

            <button
              onClick={() => setActiveTab('lab')}
              className={`text-sm px-3 py-1.5 rounded-md ${
                activeTab === 'lab'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Virtual Lab
            </button>

            <span className="text-sm text-slate-400">ISL Internal</span>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setActiveTab('learn');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-700"
            >
              Course Material
            </button>
            <button
              onClick={() => {
                setActiveTab('lab');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-700"
            >
              Virtual Lab
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4">

        {/* LEARN TAB */}
        {activeTab === 'learn' && (
          <div className="space-y-14">

            {/* Hero */}
            <section className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Drone & Space Technology Training
              </h1>
              <p className="max-w-2xl mx-auto text-slate-600">
                A hands-on learning environment designed for students and interns
                to understand UAV systems, mission planning, and satellite fundamentals.
              </p>

              <button
                onClick={() => setActiveTab('lab')}
                className="mt-6 inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800"
              >
                Open Virtual Lab <ArrowRight size={18} />
              </button>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-6">
              <Feature
                icon={<Activity />}
                title="Flight Control Systems"
                text="Understand PID tuning, stability logic, and onboard flight controllers."
              />
              <Feature
                icon={<Map />}
                title="Mission Planning"
                text="Design waypoint missions, geofencing, and fail-safe behaviors."
              />
              <Feature
                icon={<Wind />}
                title="Remote Sensing"
                text="Learn basics of LiDAR, multispectral imaging, and aerial mapping."
              />
            </section>

            {/* Curriculum */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen />
                <h2 className="text-2xl font-semibold">Course Curriculum</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {COURSE_MODULES.map(module => (
                  <div
                    key={module.id}
                    className="bg-white border border-slate-200 rounded-xl p-6"
                  >
                    <div className="flex justify-between mb-3">
                      <h3 className="font-semibold">{module.title}</h3>
                      <span className="text-xs text-slate-500">
                        {module.duration}
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm text-slate-600">
                      {module.topics.map((t, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 w-1.5 h-1.5 bg-slate-500 rounded-full" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* LAB TAB */}
        {activeTab === 'lab' && (
          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-10rem)]">

            {/* Sidebar */}
            <aside className="md:w-64 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b bg-slate-50 font-semibold">
                Lab Models
              </div>

              <div className="p-2 space-y-1">
                {MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setActiveModel(model)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                      activeModel.id === model.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {model.type === 'drone' && <Plane size={16} />}
                    {model.type === 'cubesat' && <Satellite size={16} />}
                    {model.type === 'cansat' && <Cpu size={16} />}
                    {model.name}
                  </button>
                ))}
              </div>
            </aside>

            {/* Lab Area */}
            <div className="flex-1 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h2 className="text-xl font-semibold">{activeModel.name}</h2>
                <p className="text-sm text-slate-500">
                  {activeModel.description}
                </p>
              </div>

              <div className="h-[500px]">
                <InteractiveModel model={activeModel} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Indian Space Lab — Training & Education Division
      </footer>
    </div>
  );
}

/* Helper Component */
const Feature = ({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6">
    <div className="mb-3 text-slate-700">{icon}</div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);

export default App;
