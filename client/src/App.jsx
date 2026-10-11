import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [activeRole, setActiveRole] = useState('Project Manager');

  // --- States & Handlers ---
  
  // Tasks
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

  // Inventory
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

  // Labour
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

  // Expenses
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
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 p-6 font-sans">
      
      {/* Top Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 p-2 rounded-md text-white font-bold text-lg">🏗️</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">ConstructionOS</h1>
            <p className="text-xs font-semibold text-slate-500">Full-Stack Suite</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-slate-700">Active Role:</span>
          <select 
            value={activeRole} 
            onChange={(e) => setActiveRole(e.target.value)}
            className="bg-[#2d3748] text-white text-sm font-medium rounded-md px-3 py-2 focus:outline-none"
          >
            <option>Project Manager</option>
            <option>Site Engineer</option>
            <option>Operations Head</option>
          </select>
        </div>
      </header>

      {/* Tab Navigation */}
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
                : 'bg-[#e2e8f0] text-slate-700 hover:bg-slate-300'
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
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Assign New Task</h2>
              <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="flex-1 bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <select
                  value={taskRole}
                  onChange={(e) => setTaskRole(e.target.value)}
                  className="bg-[#333d42] text-white rounded-md p-2.5 text-sm focus:outline-none"
                >
                  <option>Site Engineer</option>
                  <option>Project Manager</option>
                </select>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                  className="bg-[#333d42] text-white rounded-md p-2.5 text-sm focus:outline-none"
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

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Task List ({tasks.length})</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-4 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-800 text-base">{task.title}</span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded">
                        Assigned: {task.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
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
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4">No tasks found.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- INVENTORY MODULE --- */}
        {activeTab === 'inventory' && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Add Inventory Item</h2>
              <form onSubmit={handleAddInventory} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Item Name (e.g. Bricks)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="flex-1 bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity (e.g. 1000 Units)"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                  className="bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Add Item
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Inventory Stock ({inventory.length})</h2>
              <div className="space-y-3">
                {inventory.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center p-4 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{inv.item}</p>
                      <p className="text-xs text-slate-500 font-medium">Quantity: {inv.qty}</p>
                    </div>
                    <button 
                      onClick={() => removeInventory(inv.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {inventory.length === 0 && <p className="text-center text-slate-400 py-4">No inventory items available.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- LABOUR MODULE --- */}
        {activeTab === 'labour' && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Register New Worker</h2>
              <form onSubmit={handleRegisterWorker} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Worker Full Name"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="flex-1 bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <select
                  value={workerRole}
                  onChange={(e) => setWorkerRole(e.target.value)}
                  className="bg-[#333d42] text-white rounded-md p-2.5 text-sm focus:outline-none"
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
                  className="bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Register Worker
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Daily Attendance Roster</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase border-b">
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
                      <td className="p-3 font-bold text-slate-800">{worker.name}</td>
                      <td className="p-3 text-slate-500">{worker.role}</td>
                      <td className="p-3 text-slate-500">{worker.wage}</td>
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
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- EXPENSES MODULE --- */}
        {activeTab === 'expenses' && (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Log New Expense</h2>
              <form onSubmit={handleAddExpense} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Expense Description"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="flex-1 bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className="bg-[#333d42] text-white placeholder-slate-400 rounded-md p-2.5 text-sm focus:outline-none"
                  required
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-md transition">
                  + Add Expense
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">Recorded Expenses ({expenses.length})</h2>
              <div className="space-y-3">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-4 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{exp.title}</p>
                      <p className="text-xs text-slate-500 font-medium">Amount: {exp.amount}</p>
                    </div>
                    <button 
                      onClick={() => removeExpense(exp.id)}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {expenses.length === 0 && <p className="text-center text-slate-400 py-4">No expenses recorded.</p>}
              </div>
            </div>
          </>
        )}

        {/* --- DOCUMENTS & AI ANALYTICS --- */}
        {(activeTab === 'documents' || activeTab === 'analytics') && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center text-slate-500">
            <h2 className="text-xl font-bold text-slate-800 mb-2 capitalize">{activeTab} Dashboard</h2>
            <p className="text-sm font-medium">Module view is active and ready.</p>
          </div>
        )}

      </main>
    </div>
  );
}