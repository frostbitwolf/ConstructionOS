import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  // --- States for All Modules ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Foundation Concrete Pouring', role: 'Site Engineer', priority: 'High' },
    { id: 2, title: 'Steel Structure Fabrication', role: 'Project Manager', priority: 'Medium' }
  ]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskRole, setTaskRole] = useState('Site Engineer');

  const [inventory, setInventory] = useState([
    { id: 1, item: 'Cement Bags', qty: '500 Bags' },
    { id: 2, item: 'Steel Rebar 12mm', qty: '2 Tons' }
  ]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');

  const [workers, setWorkers] = useState([
    { id: 1, name: "Ramesh Kumar", role: "Mason", wage: "₹800/day", status: "Present" },
    { id: 2, name: "Sravant", role: "Steel Fixer", wage: "₹1000/day", status: "Present" }
  ]);
  const [workerName, setWorkerName] = useState('');
  const [workerRole, setWorkerRole] = useState('Mason');
  const [workerWage, setWorkerWage] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Raw Material Delivery', amount: '₹45,000' },
    { id: 2, title: 'Equipment Rental', amount: '₹12,500' }
  ]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');

  // --- Handlers ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: taskTitle, role: taskRole, priority: 'Medium' }]);
    setTaskTitle('');
  };
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemQty.trim()) return;
    setInventory([...inventory, { id: Date.now(), item: itemName, qty: itemQty }]);
    setItemName('');
    setItemQty('');
  };
  const removeInventory = (id) => setInventory(inventory.filter(i => i.id !== id));

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

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount.trim()) return;
    setExpenses([...expenses, { id: Date.now(), title: expTitle, amount: `₹${expAmount}` }]);
    setExpTitle('');
    setExpAmount('');
  };
  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6 font-sans">
      {/* Header */}
      <header className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 p-2 rounded-lg text-white font-bold">🏗️</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">ConstructionOS</h1>
            <p className="text-xs text-slate-500">Full-Stack Management Suite</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600">Active Role:</span>
          <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Project Manager</option>
            <option>Site Engineer</option>
            <option>Operations</option>
          </select>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto flex space-x-2 mb-6 border-b pb-3 overflow-x-auto">
        {['tasks', 'inventory', 'labour', 'expenses', 'documents', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize font-medium text-sm transition shadow-sm ${
              activeTab === tab 
                ? 'bg-blue-600 text-white shadow-blue-200' 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto space-y-6">
        
        {/* --- TASKS TAB --- */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Create New Task</h2>
              <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
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
                  <option>Operations Team</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition shadow-sm">
                  + Add Task
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Active Tasks</h2>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-800">{task.title}</p>
                      <p className="text-xs text-slate-500">Assigned: {task.role}</p>
                    </div>
                    <button onClick={() => removeTask(task.id)} className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm">
                      Remove
                    </button>
                  </div>
                ))}
                {tasks.length === 0 && <p className="text-center text-slate-400 py-4">No tasks available.</p>}
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Site Inventory Stock</h2>
              <div className="space-y-3">
                {inventory.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-800">{inv.item}</p>
                      <p className="text-xs text-slate-500">Quantity: {inv.qty}</p>
                    </div>
                    <button onClick={() => removeInventory(inv.id)} className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm">
                      Remove
                    </button>
                  </div>
                ))}
                {inventory.length === 0 && <p className="text-center text-slate-400 py-4">No inventory items found.</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- LABOUR TAB --- */}
        {activeTab === 'labour' && (
          <>
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
                  <option>Mason</option>
                  <option>Steel Fixer</option>
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
                          <button onClick={() => removeWorker(worker.id)} className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm">
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
          </>
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">Recorded Expenses</h2>
              <div className="space-y-3">
                {expenses.map((exp) => (
                  <div key={exp.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-800">{exp.title}</p>
                      <p className="text-xs text-slate-500">Amount: {exp.amount}</p>
                    </div>
                    <button onClick={() => removeExpense(exp.id)} className="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-sm">
                      Remove
                    </button>
                  </div>
                ))}
                {expenses.length === 0 && <p className="text-center text-slate-400 py-4">No expenses recorded.</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- DOCUMENTS & ANALYTICS PLACEHOLDERS --- */}
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