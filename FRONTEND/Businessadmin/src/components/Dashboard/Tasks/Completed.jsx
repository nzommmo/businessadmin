import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  if (isLoading) return <div className="flex items-center justify-center mt-20">Loading tasks...</div>;
  if (error) return <div className="flex items-center justify-center mt-20 text-red-500">Error: {error}</div>;
  if (tasks.length === 0) return <div className="flex items-center justify-center mt-20">No completed tasks</div>;

  return (
    <div className="flex items-center justify-center mt-20">
      <Card>
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
                      <DropdownMenuItem>Details</DropdownMenuItem>
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
