import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  // --- Dynamic States ---
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Foundation Concrete Pouring', role: 'Site Engineer', priority: 'High' },
    { id: 2, title: 'Steel Structure Fabrication', role: 'Project Manager', priority: 'Medium' }
  ]);
  const [newTask, setNewTask] = useState('');

  const [inventory, setInventory] = useState([
    { id: 1, item: 'Cement Bags', qty: '500 Bags' },
    { id: 2, item: 'Steel Rebar 12mm', qty: '2 Tons' }
  ]);
  const [newItem, setNewItem] = useState('');
  const [newQty, setNewQty] = useState('');

  const [workers, setWorkers] = useState([
    { id: 1, name: 'Ramesh Kumar', role: 'Site Engineer' },
    { id: 2, name: 'Suresh Sharma', role: 'Mason' }
  ]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Raw Material Delivery', amount: '$1,200' },
    { id: 2, title: 'Equipment Rental', amount: '$850' }
  ]);
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');

  // --- Handlers ---
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, role: 'Site Engineer', priority: 'Medium' }]);
    setNewTask('');
  };
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const addInventory = (e) => {
    e.preventDefault();
    if (!newItem.trim() || !newQty.trim()) return;
    setInventory([...inventory, { id: Date.now(), item: newItem, qty: newQty }]);
    setNewItem('');
    setNewQty('');
  };
  const removeInventory = (id) => setInventory(inventory.filter(i => i.id !== id));

  const addWorker = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) return;
    setWorkers([...workers, { id: Date.now(), name: newName, role: newRole }]);
    setNewName('');
    setNewRole('');
  };
  const removeWorker = (id) => setWorkers(workers.filter(w => w.id !== id));

  const addExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount.trim()) return;
    setExpenses([...expenses, { id: Date.now(), title: expTitle, amount: expAmount }]);
    setExpTitle('');
    setExpAmount('');
  };
  const removeExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">ConstructionOS</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Full-Stack Suite</span>
      </header>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b pb-2">
        {['tasks', 'inventory', 'labour', 'expenses'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded capitalize font-medium ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <main className="bg-white p-6 rounded shadow">
        {/* TASKS */}
        {activeTab === 'tasks' && (
          <div>
            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter new task description..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                + Create Task
              </button>
            </form>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">Assigned: {task.role}</p>
                  </div>
                  <button onClick={() => removeTask(task.id)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-gray-500 text-center py-4">No tasks found.</p>}
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {activeTab === 'inventory' && (
          <div>
            <form onSubmit={addInventory} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Item Name (e.g. Bricks)"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Quantity (e.g. 1000)"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                className="w-1/3 p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                + Add Item
              </button>
            </form>

            <div className="space-y-3">
              {inventory.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{item.item}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
                  </div>
                  <button onClick={() => removeInventory(item.id)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
              {inventory.length === 0 && <p className="text-gray-500 text-center py-4">No inventory items.</p>}
            </div>
          </div>
        )}

        {/* LABOUR */}
        {activeTab === 'labour' && (
          <div>
            <form onSubmit={addWorker} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Worker Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role (e.g. Mason, Helper)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-1/3 p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                + Add Worker
              </button>
            </form>

            <div className="space-y-3">
              {workers.map((worker) => (
                <div key={worker.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{worker.name}</p>
                    <p className="text-xs text-gray-500">Role: {worker.role}</p>
                  </div>
                  <button onClick={() => removeWorker(worker.id)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
              {workers.length === 0 && <p className="text-gray-500 text-center py-4">No workers available.</p>}
            </div>
          </div>
        )}

        {/* EXPENSES */}
        {activeTab === 'expenses' && (
          <div>
            <form onSubmit={addExpense} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Expense Description"
                value={expTitle}
                onChange={(e) => setExpTitle(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Amount (e.g. $500)"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                className="w-1/3 p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                + Add Expense
              </button>
            </form>

            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{exp.title}</p>
                    <p className="text-xs text-gray-500">Amount: {exp.amount}</p>
                  </div>
                  <button onClick={() => removeExpense(exp.id)} className="bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-600">
                    Remove
                  </button>
                </div>
              ))}
              {expenses.length === 0 && <p className="text-gray-500 text-center py-4">No expenses recorded.</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}