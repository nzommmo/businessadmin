import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axiosInstance from '@/constants/axiosInstance';
import { format } from "date-fns"; // Import format from date-fns
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

const TaskModal = ({ task, isOpen, onClose, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <p><strong>Task Name:</strong> {task.name}</p>
        <p><strong>Assigned By:</strong> {users[task.assigned_by] || 'Unknown'}</p>
        <p><strong>Due Date:</strong> {format(new Date(task.due_date), "MMMM d, yyyy")}</p>
        <p><strong>Description:</strong> {task.description || 'No description provided.'}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </div>
    </div>
  );
};

const Pending = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      
      const pendingTasks = tasksRes.data.filter(task => task.status === 'pending');
      setTasks(pendingTasks);
      setUsers(usersMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkComplete = async (taskId) => {
    try {
      await axiosInstance.patch(`/tasks/${taskId}/`, {
        status: 'completed'
      });
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) return <div className="flex items-center justify-center mt-20">Loading tasks...</div>;
  if (error) return <div className="flex items-center justify-center mt-20 text-red-500">Error: {error}</div>;
  if (tasks.length === 0) return <div className="flex items-center justify-center mt-20">No pending tasks</div>;

  return (
    <div className='flex items-center justify-center mt-20'>
      <Card>
        <Table className='lg:w-[800px]'>
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
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell className="font-medium">{users[task.assigned_by] || 'Unknown'}</TableCell>
                <TableCell className="md:table-cell">{format(new Date(task.due_date), "MMMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge variant="outline" className='bg-red-500'>Pending</Badge>
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
                      <DropdownMenuItem onClick={() => handleShowDetails(task)}>
                        Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMarkComplete(task.id)}>
                        Mark As Complete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal for Task Details */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        users={users}
      />
    </div>
  );
};

export default Pending;
