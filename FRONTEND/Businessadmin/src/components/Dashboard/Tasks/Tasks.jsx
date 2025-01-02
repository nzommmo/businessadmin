import React, { useEffect, useState } from 'react';
import { MoreHorizontal, PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from '@/constants/axiosInstance';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/ui/card';
import { Textarea } from "@/components/ui/textarea";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assigned_to: '',
    due_date: '',
    status: 'pending'
  });

  const fetchData = async () => {
    try {
      const [tasksRes, usersRes] = await Promise.all([
        axiosInstance.get('/tasks/'),
        axiosInstance.get('/users/')
      ]);
      
      const usersMap = {};
      usersRes.data.forEach(user => {
        usersMap[user.id] = user.username;
      });
      
      setUsers(usersMap);
      setTasks(tasksRes.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/tasks/', formData);
      setTasks([...tasks, response.data]);
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        assigned_to: '',
        due_date: '',
        status: 'pending'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkAsCompleted = async (taskId) => {
    try {
      // Update the status of the task to "completed"
      const updatedTask = { ...tasks.find((task) => task.id === taskId), status: 'completed' };
      
      // Send the update request to the backend
      await axiosInstance.put(`/tasks/${taskId}/`, updatedTask);
  
      // Update the state with the new task list
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDetailsClick = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  // Function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

  if (isLoading) return <div className="flex items-center justify-center mt-20">Loading tasks...</div>;
  if (error) return <div className="flex items-center justify-center mt-20 text-red-500">Error: {error}</div>;
  if (tasks.length === 0) return <div className="flex items-center justify-center mt-20">No tasks available</div>;

  return (
    <div className="flex items-center justify-center mt-20">
      <Card>
        <div className="flex items-end p-5 justify-end">
          <Button size="sm" className="h-8 gap-1" onClick={() => setShowCreateModal(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            Assign Task
          </Button>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 z-50">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">Assign New Task</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Task Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assigned_to">Assigned To</Label>
                  <Select 
                    value={formData.assigned_to}
                    onValueChange={(value) => setFormData({...formData, assigned_to: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(users).map(([id, name]) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Create Task</Button>
              </form>
            </div>
          </div>
        )}

        {showDetailsModal && (
          
          <div className="fixed inset-0 text-black bg-black/50 z-50">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedTask?.name}</h3>
                <Button variant="ghost" size="icon" onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedTask(null);
                }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="mt-2">{selectedTask?.description}</p>
                </div>
                <div>
                  <Label className="font-semibold">Assigned By</Label>
                  <p className="mt-2">{users[selectedTask?.assigned_by] || 'Unknown'}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Label className="font-semibold">Status</Label>
                  <Badge
                    variant="outline"
                    className={` ${
                      selectedTask?.status === 'completed'
                        ? 'bg-green-500'
                        : selectedTask?.status === 'in-progress'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {selectedTask?.status}
                  </Badge>
                </div>
                <div>
              <Label className="font-semibold">Due Date</Label>
              <p className="mt-2">{selectedTask?.due_date ? 
              formatDate(selectedTask?.due_date)
            : 'Not Set'}
              </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Table className="lg:w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead className="md:table-cell">Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {tasks.map((task) => {
    const formattedDueDate = task.due_date
    ? formatDate(task.due_date)
    : 'Not Set';
  

    return (
      <TableRow key={task.id}>
        <TableCell className="font-medium">{task.name}</TableCell>
        <TableCell className="font-medium">{users[task.assigned_by] || 'Unknown'}</TableCell>
        <TableCell className="md:table-cell">{formattedDueDate}</TableCell>
        <TableCell>
          <Badge 
            variant="outline" 
            className={
              task.status === 'completed' 
                ? 'bg-green-500' 
                : task.status === 'in-progress'
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            }
          >
            {task.status}
          </Badge>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleDetailsClick(task)}>Details</DropdownMenuItem>

              {/* Show "Mark as Completed" only if the task's status is "pending" */}
              {task.status === 'pending' && (
                <DropdownMenuItem onClick={() => handleMarkAsCompleted(task.id)}>
                  Mark as Completed
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

   </Table>
      </Card>
    </div>
  );
};

export default Tasks;