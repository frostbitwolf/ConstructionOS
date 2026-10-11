import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [activeRole, setActiveRole] = useState('Project Manager');

  // --- States & Add/Remove Handlers for All Modules ---
  
  // 1. Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Foundation Concrete Pouring', role: 'Site Engineer', priority: 'High', status: 'Completed' }
  ]);
  const [taskDesc, setTaskDesc] = useState('');
  const [taskRole, setTaskRole] = useState('Site Engineer');
  const [taskPriority, setTaskPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskDesc.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: taskDesc, role: taskRole, priority: taskPriority, status: 'Pending' }]);
    setTaskDesc('');
  };
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  // 2. Inventory
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Cement Bags', qty: '500 Bags', category: 'Raw Material' },
    { id: 2, name: 'Steel Rebar 12mm', qty: '2 Tons', category: 'Structure' }
  ]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemQty.trim()) return;
    setInventory([...inventory, { id: Date.now(), name: itemName, qty: itemQty, category: 'General' }]);
    setItemName('');
    setItemQty('');
  };
  const removeInventory = (id) => setInventory(inventory.filter(i => i.id !== id));

  // 3. Labour
  const [workers, setWorkers] = useState([
    { id: 1, name: "Ramesh Kumar", role: "Mason", wage: "₹800/day", status: "Present" },
    { id: 2, name: "Sravant", role: "Steel Fixer", wage: "₹1000/day", status: "Present" }
  ]);
  const [workerName, setWorkerName] = useState('');
  const [workerRole, setWorkerRole] = useState('Steel Fixer');
  const [workerWage, setWorkerWage] = useState('');

  const handleRegisterWorker = (e) => {
    e.preventDefault();
    if (!workerName.trim()) return;
    setWorkers([...workers, {
      id: Date.now(),
      name: workerName,
      role: workerRole,
      wage: workerWage ? `₹${workerWage}/day` : '₹750/day',
      status: 'Present'
    }]);
    setWorkerName('');
    setWorkerWage('');
  };
  const removeWorker = (id) => setWorkers(workers.filter(w => w.id !== id));

  // 4. Expenses
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Raw Material Delivery', amount: '₹45,000', category: 'Logistics' },
    { id: 2, title: 'Equipment Rental', amount: '₹12,500', category: 'Machinery' }
  ]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount.trim()) return;
    setExpenses([...expenses, { id: Date.now(), title: expTitle, amount: `₹${expAmount}`, category: 'General' }]);
    setExpTitle('');
    setExpAmount('');
  };
  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 p-6">
      
      {/* Top Header matching original UI */}
      <header className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl p-4 mb-6 flex justify-between items-center border border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 p-2 rounded-lg text-white font-bold text-lg">🏗️</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ConstructionOS</h1>
            <p className="text-xs text-slate-400 font-medium">Full-Stack Suite</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600">Active Role:</span>
          <select 
            value={activeRole} 
            onChange={(e) => setActiveRole(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Project Manager</option>
            <option>Site Engineer</option>
            <option>Operations Head</option>
          </select>
        </div>
      </header>

      {/* Navigation Tabs matching original UI */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-3">
        {[
          { id: 'tasks', label: 'Tasks', icon: '📋' },
          { id: 'inventory', label: 'Inventory', icon: '📦' },
          { id: 'labour', label: 'Labour', icon: '👷' },
          { id: 'expenses', label: 'Expenses', icon: '💰' },
          { id: 'documents', label: 'Documents', icon: '📁' },
          { id: 'analytics', label: 'AI Analytics', icon: '✨' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto space-y-6">

        {/* --- TASKS TAB --- */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Assign New Task</h2>
              <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  value={taskRole}
                  onChange={(e) => setTaskRole(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none"
                >
                  <option>Site Engineer</option>
                  <option>Project Manager</option>
                  <option>Safety Inspector</option>
                </select>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm">
                  + Create Task
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Task List ({tasks.length})</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition">
                    <div>
                      <p className="font-semibold text-slate-800">{task.title}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded font-medium">Assigned: {task.role}</span>
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-medium">Priority: {task.priority}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">Status: {task.status}</span>
                      <button 
                        onClick={() => removeTask(task.id)}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4">No tasks found.</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Add Inventory Item</h2>
              <form onSubmit={handleAddInventory} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="text"
                  placeholder="Item Name (e.g. Bricks)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g. 1000 Units)"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm">
                  + Add Item
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Inventory Stock ({inventory.length})</h2>
              <div className="space-y-3">
                {inventory.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                    <div>
                      <p className="font-semibold text-slate-800">{inv.name}</p>
                      <p className="text-xs text-slate-500 mt-1">Quantity: {inv.qty}</p>
                    </div>
                    <button 
                      onClick={() => removeInventory(inv.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {inventory.length === 0 && <p className="text-center text-slate-400 py-4">No inventory items available.</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- LABOUR TAB --- */}
        {activeTab === 'labour' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Register New Worker</h2>
              <form onSubmit={handleRegisterWorker} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <input
                  type="text"
                  placeholder="Worker Full Name"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                  required
                />
                <select
                  value={workerRole}
                  onChange={(e) => setWorkerRole(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none"
                >
                  <option>Steel Fixer</option>
                  <option>Mason</option>
                  <option>Electrician</option>
                  <option>Site Helper</option>
                </select>
                <input
                  type="number"
                  placeholder="Daily Wage (₹)"
                  value={workerWage}
                  onChange={(e) => setWorkerWage(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm">
                  + Register Worker
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">Daily Attendance Roster</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">Role</th>
                      <th className="p-4 font-semibold">Rate</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {workers.map((worker) => (
                      <tr key={worker.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-4 font-medium text-slate-700">{worker.name}</td>
                        <td className="p-4 text-slate-500">{worker.role}</td>
                        <td className="p-4 text-slate-500">{worker.wage}</td>
                        <td className="p-4">
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                            {worker.status}
                          </span>
                        </td>
                        <td className="p-4 flex gap-2 items-center">
                          <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm">
                            Mark Absent
                          </button>
                          <button 
                            onClick={() => removeWorker(worker.id)}
                            className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                    {workers.length === 0 && (
                      <tr><td colSpan="5" className="p-6 text-center text-slate-400">No workers registered.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- EXPENSES TAB --- */}
        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Log New Expense</h2>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="text"
                  placeholder="Expense Description"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className="border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm">
                  + Add Expense
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Recorded Expenses ({expenses.length})</h2>
              <div className="space-y-3">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                    <div>
                      <p className="font-semibold text-slate-800">{exp.title}</p>
                      <p className="text-xs text-slate-500 mt-1">Amount: {exp.amount}</p>
                    </div>
                    <button 
                      onClick={() => removeExpense(exp.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {expenses.length === 0 && <p className="text-center text-slate-400 py-4">No expenses recorded.</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- DOCUMENTS & AI ANALYTICS TABS --- */}
        {(activeTab === 'documents' || activeTab === 'analytics') && (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center text-slate-500">
            <h3 className="text-lg font-semibold mb-2 capitalize">{activeTab} Suite</h3>
            <p className="text-sm">Module view is active and ready.</p>
          </div>
        )}

      </main>
    </div>
  );
}