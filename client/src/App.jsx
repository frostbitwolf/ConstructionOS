import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [activeRole, setActiveRole] = useState('Project Manager');

  // --- States & Handlers ---
  
  // 1. Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Foundation Concrete Pouring', role: 'Site Engineer', priority: 'Medium', status: 'Completed' }
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskRole, setTaskRole] = useState('Site Engineer');
  const [taskPriority, setTaskPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: taskTitle, role: taskRole, priority: taskPriority, status: 'Completed' }]);
    setTaskTitle('');
  };
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  // 2. Inventory
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Cement Bags', qty: '500 Bags' },
    { id: 2, item: 'Steel Rebar 12mm', qty: '2 Tons' }
  ]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemQty.trim()) return;
    setInventory([...inventory, { id: Date.now(), item: itemName, qty: itemQty }]);
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
    { id: 1, title: 'Raw Material Delivery', amount: '₹45,000' },
    { id: 2, title: 'Equipment Rental', amount: '₹12,500' }
  ]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount.trim()) return;
    setExpenses([...expenses, { id: Date.now(), title: expTitle, amount: `₹${expAmount}` }]);
    setExpTitle('');
    setExpAmount('');
  };
  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }} className="p-6 font-sans">
      
      {/* Top Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🏗️</span>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              ConstructionOS <span className="text-slate-500 text-lg font-bold ml-2">- Full Stack Suite</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-slate-700">Active Role:</span>
          <select 
            value={activeRole} 
            onChange={(e) => setActiveRole(e.target.value)}
            className="bg-[#2d3748] text-white text-sm font-semibold rounded-md px-3 py-2 focus:outline-none"
          >
            <option>Project Manager</option>
            <option>Site Engineer</option>
            <option>Operations Head</option>
          </select>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-2 mb-6">
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto space-y-6">

        {/* --- TASKS MODULE --- */}
        {activeTab === 'tasks' && (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-4 text-center">Assign New Task</h2>
              <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="flex-1 bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <select
                  value={taskRole}
                  onChange={(e) => setTaskRole(e.target.value)}
                  className="bg-[#2d3748] text-white rounded-md p-2.5 text-sm font-medium focus:outline-none"
                >
                  <option>Site Engineer</option>
                  <option>Project Manager</option>
                </select>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="bg-[#2d3748] text-white rounded-md p-2.5 text-sm font-medium focus:outline-none"
                >
                  <option>Medium</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Create Task
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-6 text-center">Task List ({tasks.length})</h2>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-3 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-900 text-base">{task.title}</span>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded">
                        Assigned: {task.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-md">
                        Status: {task.status}
                      </span>
                      <button 
                        onClick={() => removeTask(task.id)}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4 font-bold">No active tasks.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- INVENTORY MODULE --- */}
        {activeTab === 'inventory' && (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-4 text-center">Add Inventory Item</h2>
              <form onSubmit={handleAddInventory} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Item Name (e.g. Bricks)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="flex-1 bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g. 1000 Units)"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                  className="bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Add Item
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-6 text-center">Inventory Stock ({inventory.length})</h2>
              <div className="space-y-4">
                {inventory.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center p-3 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{inv.item}</p>
                      <p className="text-xs text-slate-500 font-bold">Quantity: {inv.qty}</p>
                    </div>
                    <button 
                      onClick={() => removeInventory(inv.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {inventory.length === 0 && <p className="text-center text-slate-400 py-4 font-bold">No inventory items.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- LABOUR MODULE --- */}
        {activeTab === 'labour' && (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-4 text-center">Register New Worker</h2>
              <form onSubmit={handleRegisterWorker} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Worker Full Name"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="flex-1 bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <select
                  value={workerRole}
                  onChange={(e) => setWorkerRole(e.target.value)}
                  className="bg-[#2d3748] text-white rounded-md p-2.5 text-sm font-medium focus:outline-none"
                >
                  <option>Steel Fixer</option>
                  <option>Mason</option>
                  <option>Electrician</option>
                </select>
                <input
                  type="number"
                  placeholder="Daily Wage (₹)"
                  value={workerWage}
                  onChange={(e) => setWorkerWage(e.target.value)}
                  className="bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Register Worker
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <h2 className="text-xl font-black text-slate-800 mb-6 text-center">Daily Attendance Roster</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-xs font-black uppercase border-b">
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Rate</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {workers.map((worker) => (
                    <tr key={worker.id}>
                      <td className="p-3 font-bold text-slate-900">{worker.name}</td>
                      <td className="p-3 text-slate-600 font-bold">{worker.role}</td>
                      <td className="p-3 text-slate-600 font-bold">{worker.wage}</td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded font-bold">
                          {worker.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded font-bold transition">
                          Mark Absent
                        </button>
                        <button 
                          onClick={() => removeWorker(worker.id)}
                          className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded font-bold transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {workers.length === 0 && (
                    <tr><td colSpan="5" className="p-6 text-center text-slate-400 font-bold">No workers registered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- EXPENSES MODULE --- */}
        {activeTab === 'expenses' && (
          <>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-4 text-center">Log New Expense</h2>
              <form onSubmit={handleAddExpense} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Expense Description"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="flex-1 bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className="bg-[#2d3748] text-white placeholder-slate-400 rounded-md p-2.5 text-sm font-medium focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Add Expense
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 mb-6 text-center">Recorded Expenses ({expenses.length})</h2>
              <div className="space-y-4">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-3 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{exp.title}</p>
                      <p className="text-xs text-slate-500 font-bold">Amount: {exp.amount}</p>
                    </div>
                    <button 
                      onClick={() => removeExpense(exp.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {expenses.length === 0 && <p className="text-center text-slate-400 py-4 font-bold">No recorded expenses.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- DOCUMENTS & AI ANALYTICS --- */}
        {(activeTab === 'documents' || activeTab === 'analytics') && (
          <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
            <h2 className="text-xl font-black text-slate-800 mb-2 capitalize">{activeTab} Dashboard</h2>
            <p className="text-sm font-bold text-slate-500">Module view is active and ready.</p>
          </div>
        )}

      </main>
    </div>
  );
}