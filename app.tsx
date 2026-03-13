import React, { useState, useEffect, useRef } from 'react';
import { 
  Beaker, 
  Plus, 
  Trash2,
  Play,
  HelpCircle,
  X,
  Activity,
  Layers
} from 'lucide-react';
import { PINNSolver, TrainingProgress } from './pinn';

// --- Types ---
type Condition = {
  id: string;
  type: 'Boundary' | 'Initial';
  location: string;
  value: string;
};

const HelpModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-300 p-4 flex justify-between items-center bg-gray-50 sticky top-0">
          <h2 className="font-bold uppercase text-sm tracking-tight">Руководство пользователя / Справка</h2>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6 text-sm leading-relaxed">
          <section>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">1. Определение УЧП (PDE)</h3>
            <p>
              Определите невязку вашего уравнения в частных производных на языке Python. 
              Функция <code>pde(x, t, u)</code> должна возвращать значение невязки, которую нейронная сеть будет минимизировать.
            </p>
          </section>

          <section>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">2. Параметры области (Domain)</h3>
            <p>
              Укажите пространственные (X) и временные (T) диапазоны для симуляции.
            </p>
          </section>

          <section>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">3. Архитектура сети</h3>
            <p>
              Настройте многослойный перцептрон (MLP), который аппроксимирует решение.
            </p>
          </section>

          <section>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">4. Граничные и начальные условия</h3>
            <p>
              Для нахождения уникального решения PINN требуются ограничения на основе данных.
            </p>
          </section>

          <section>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">5. Выполнение</h3>
            <p>
              Нажмите кнопку <strong>RUN</strong>, чтобы начать процесс обучения. В разделе "Training Logs" будет отображаться сходимость функции потерь (loss), а область визуализации обновится графиком сравнения PINN и точного решения.
            </p>
          </section>
        </div>
        <div className="border-t border-gray-300 p-4 bg-gray-50 flex justify-end">
          <button onClick={onClose} className="border border-black px-6 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors">
            ЗАКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data }: { data: { x: number[]; pinn: number[]; exact: number[]; t: number } }) => {
  const width = 600;
  const height = 300;
  const padding = 40;

  const minX = Math.min(...data.x);
  const maxX = Math.max(...data.x);
  const minY = -1.2;
  const maxY = 1.2;

  const scaleX = (val: number) => padding + ((val - minX) / (maxX - minX)) * (width - 2 * padding);
  const scaleY = (val: number) => height - padding - ((val - minY) / (maxY - minY)) * (height - 2 * padding);

  const pinnPath = data.pinn.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(data.x[i])} ${scaleY(y)}`).join(' ');
  const exactPath = data.exact.map((y, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(data.x[i])} ${scaleY(y)}`).join(' ');

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-[10px] font-bold uppercase text-gray-400">Slice at t = {data.t.toFixed(2)}</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-black"></div>
            <span className="text-[10px] font-bold uppercase">PINN</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-gray-400 border-t border-dashed border-gray-400"></div>
            <span className="text-[10px] font-bold uppercase text-gray-400">Exact</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grid */}
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#e5e7eb" strokeWidth="1" />
          <line x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
          
          {/* Exact Solution (Dashed) */}
          <path d={exactPath} fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* PINN Solution (Solid) */}
          <path d={pinnPath} fill="none" stroke="#000" strokeWidth="2" />

          {/* Axis Labels */}
          <text x={width - padding} y={height / 2 + 15} fontSize="10" className="fill-gray-400 font-bold">X</text>
          <text x={width / 2 + 5} y={padding + 10} fontSize="10" className="fill-gray-400 font-bold">U</text>
        </svg>
      </div>
    </div>
  );
};

export default function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [solution, setSolution] = useState<{ x: number[]; pinn: number[]; exact: number[]; t: number } | null>(null);

  const [code, setCode] = useState(`def pde(x, t, u):
    u_t = gradient(u, t)
    u_x = gradient(u, x)
    u_xx = gradient(u_x, x)
    return u_t + u * u_x - (0.01 / np.pi) * u_xx`);

  const [conditions, setConditions] = useState<Condition[]>([
    { id: '1', type: 'Initial', location: 't = 0', value: '-sin(pi * x)' },
    { id: '2', type: 'Boundary', location: 'x = -1', value: '0' },
    { id: '3', type: 'Boundary', location: 'x = 1', value: '0' },
  ]);

  const addCondition = () => {
    setConditions([...conditions, {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Boundary',
      location: '',
      value: ''
    }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const handleRun = async () => {
    setIsTraining(true);
    setProgress([]);
    setSolution(null);

    const solver = new PINNSolver({
      layers: 4,
      neurons: 20,
      epochs: 100,
      learningRate: 0.001
    });

    await solver.train((p) => {
      setProgress(prev => [...prev.slice(-19), p]);
    });

    const result = await solver.predict([-1, 1], [0, 1], 50);
    setSolution(result);
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-8">
      <div className="max-w-5xl mx-auto border border-gray-300">
        <div className="border-b border-gray-300 p-4 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <Beaker size={20} />
            <span className="font-bold uppercase tracking-tight">PINN Solver Interface</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsHelpOpen(true)} className="text-gray-400 hover:text-black transition-colors flex items-center gap-1 text-xs font-bold uppercase">
              <HelpCircle size={16} /> Help
            </button>
            <button onClick={handleRun} disabled={isTraining} className={`border border-black px-4 py-1 text-sm font-bold transition-colors flex items-center gap-2 ${isTraining ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}>
              {isTraining ? <Activity size={14} className="animate-spin" /> : <Play size={14} />}
              {isTraining ? 'TRAINING...' : 'RUN'}
            </button>
          </div>
        </div>

        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
          <div className="p-4 border-r border-gray-300">
            <label className="block text-xs font-bold mb-2 uppercase text-gray-500">PDE Definition (on Python)</label>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-64 p-3 font-mono text-sm border border-gray-300 focus:outline-none bg-gray-50" spellCheck={false} />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2 uppercase text-gray-500">DomainParameters</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">x-range</label>
                  <input type="text" placeholder="X range" defaultValue="-1.0, 1.0" className="w-full border border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">t-range</label>
                  <input type="text" placeholder="T range" defaultValue="0.0, 1.0" className="w-full border border-gray-300 p-2 text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-2 uppercase text-gray-500">Network Architecture</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Hidden layers</label>
                  <div className="flex items-center gap-2 border border-gray-300 p-2">
                    <Layers size={14} className="text-gray-400" />
                    <input type="number" defaultValue="4" className="w-full text-sm focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Neurons per layer</label>
                  <div className="flex items-center gap-2 border border-gray-300 p-2">
                    <Activity size={14} className="text-gray-400" />
                    <input type="number" defaultValue="20" className="w-full text-sm focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-300">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase text-gray-500">Boundary & Initial Conditions</label>
            <button onClick={addCondition} className="text-xs border border-gray-300 px-2 py-1 hover:bg-gray-100 flex items-center gap-1">
              <Plus size={12} /> Add
            </button>
          </div>
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left font-bold text-xs uppercase">Type</th>
                <th className="border border-gray-300 p-2 text-left font-bold text-xs uppercase">Location</th>
                <th className="border border-gray-300 p-2 text-left font-bold text-xs uppercase">Value</th>
                <th className="border border-gray-300 p-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {conditions.map((c) => (
                <tr key={c.id}>
                  <td className="border border-gray-300 p-1">
                    <select className="w-full p-1 bg-transparent" defaultValue={c.type}>
                      <option>Boundary</option>
                      <option>Initial</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" defaultValue={c.location} className="w-full p-1 bg-transparent focus:outline-none" />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" defaultValue={c.value} className="w-full p-1 bg-transparent focus:outline-none" />
                  </td>
                  <td className="border border-gray-300 p-1 text-center">
                    <button onClick={() => removeCondition(c.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 p-4 border-r border-gray-300">
            <label className="block text-xs font-bold mb-2 uppercase text-gray-500">Solution Comparison (PINN vs Exact)</label>
            <div className="aspect-video bg-gray-100 border border-gray-300 flex items-center justify-center relative overflow-hidden">
              {solution ? (
                <LineChart data={solution} />
              ) : (
                <div className="text-gray-400 text-xs uppercase font-bold">No data. Click RUN to solve.</div>
              )}
              {isTraining && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <div className="text-xs font-bold uppercase animate-pulse">Computing...</div>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 bg-gray-50">
            <label className="block text-xs font-bold mb-2 uppercase text-gray-500">Training Logs</label>
            <div className="font-mono text-[10px] space-y-1 h-48 overflow-y-auto">
              {progress.length === 0 && <div className="text-gray-400 italic">Waiting for execution...</div>}
              {progress.map((p, i) => (
                <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                  <span>EPOCH {p.epoch.toString().padStart(3, '0')}</span>
                  <span className="font-bold text-blue-600">LOSS: {p.loss.toFixed(6)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
