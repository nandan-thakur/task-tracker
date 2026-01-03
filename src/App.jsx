import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, XCircle, Save, X, Search, LayoutList, Calendar } from 'lucide-react';

// --- Components ---

// Simple UI Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ onClick, children, variant = "primary", className = "", type = "button", disabled = false }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-500",
    success: "bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-500"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Main App Component
export default function App() {
  // State
  const [tasks, setTasks] = useState(() => {
    // Load from local storage on initial render
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crud_tasks_app_v1');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [view, setView] = useState('list'); // 'list' or 'form'
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Save to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('crud_tasks_app_v1', JSON.stringify(tasks));
  }, [tasks]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsEditing(false);
    setCurrentTask(null);
    setView('list');
  };

  const handleCreateClick = () => {
    resetForm();
    setView('form');
  };

  const handleEditClick = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate || ''
    });
    setCurrentTask(task);
    setIsEditing(true);
    setView('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    if (isEditing && currentTask) {
      // Update existing
      setTasks(prev => prev.map(t => 
        t.id === currentTask.id 
          ? { ...t, ...formData, updatedAt: new Date().toISOString() } 
          : t
      ));
    } else {
      // Create new
      const newTask = {
        id: crypto.randomUUID(),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTasks(prev => [newTask, ...prev]);
    }
    
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Derived State
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'completed' 
        ? task.completed 
        : !task.completed;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  // Priority Badge Color
  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <LayoutList className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex text-sm text-gray-500 gap-4">
                <span>Total: <span className="font-semibold text-gray-900">{stats.total}</span></span>
                <span>Done: <span className="font-semibold text-green-600">{stats.completed}</span></span>
              </div>
              {view === 'list' && (
                <Button onClick={handleCreateClick} className="shadow-sm">
                  <Plus className="h-4 w-4 mr-2" /> New Task
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === 'form' ? (
          /* --- Form View --- */
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
              <Button variant="ghost" onClick={resetForm}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Review Q3 Marketing Plan"
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Add details about this task..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 border"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <Button variant="secondary" onClick={resetForm}>Cancel</Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Save Changes' : 'Create Task'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

        ) : (
          /* --- List View --- */
          <div className="space-y-6">
            
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2"
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                {['all', 'active', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                      filter === f 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LayoutList className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                <p className="text-gray-500 mt-1">
                  {searchTerm 
                    ? "Try adjusting your search terms." 
                    : "Get started by creating a new task."}
                </p>
                {!searchTerm && (
                  <Button onClick={handleCreateClick} className="mt-6">
                    Create your first task
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className={`transition-all hover:shadow-md ${task.completed ? 'bg-gray-50/80' : 'bg-white'}`}>
                    <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                      
                      {/* Checkbox Area */}
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`flex-shrink-0 rounded-full p-1 transition-colors ${
                          task.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        {task.completed ? (
                          <CheckCircle className="h-8 w-8" />
                        ) : (
                          <div className="h-8 w-8 rounded-full border-2 border-current" />
                        )}
                      </button>

                      {/* Content Area */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className={`text-lg font-semibold truncate pr-4 ${task.completed ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-2 line-clamp-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                          {task.description || "No description provided."}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {task.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Due: {formatDate(task.dueDate)}
                            </span>
                          )}
                          <span>Created: {formatDate(task.createdAt)}</span>
                        </div>
                      </div>

                      {/* Actions Area */}
                      <div className="flex items-center gap-2 md:self-center self-end mt-2 md:mt-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                        <Button 
                          variant="secondary" 
                          onClick={() => handleEditClick(task)}
                          className="!p-2"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => handleDelete(task.id)}
                          className="!p-2 bg-white border-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}