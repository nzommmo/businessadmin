import React, { useEffect, useState } from 'react';
import { MoreHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axiosInstance from '@/constants/axiosInstance';
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

// Function to format the date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const Completed = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
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
        
        const completedTasks = tasksRes.data.filter(task => task.status === 'completed');
        setTasks(completedTasks);
        setUsers(usersMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  if (isLoading) return <div className="flex items-center justify-center mt-20">Loading tasks...</div>;
  if (error) return <div className="flex items-center justify-center mt-20 text-red-500">Error: {error}</div>;
  if (tasks.length === 0) return <div className="flex items-center justify-center mt-20">No completed tasks</div>;

  return (
    <div className="flex items-center justify-center mt-20">
      <Card>
        {showDetailsModal && (
          <div className="fixed inset-0 text-black bg-black/50 z-50">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedTask?.name}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedTask(null);
                  }}
                >
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
                <div className="flex items-center gap-2">
                  <Label className="font-semibold">Status</Label>
                  <Badge variant="outline" className="bg-green-500">
                    Completed
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Due Date</Label>
                  <p className="mt-2">
                    {selectedTask?.due_date ? formatDate(selectedTask.due_date) : 'Not Set'}
                  </p>
                </div>
                <div>
                 
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
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell className="font-medium">{users[task.assigned_by] || 'Unknown'}</TableCell>
                <TableCell className="md:table-cell">{formatDate(task.due_date)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500">Completed</Badge>
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
                      <DropdownMenuItem onClick={() => handleDetailsClick(task)}>
                        Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Completed;