import React from 'react'
import {
   
    MoreHorizontal,
   
  } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card } from '../ui/card'
const Tasks = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
    <Card>
    <Table className='lg:w-[800px]'>
    <TableHeader>
                    <TableRow>
                      
                      <TableHead>Task</TableHead>
                      <TableHead>Assigned By</TableHead>
                      <TableHead className=" md:table-cell">
                      Due Date
                      </TableHead>
                      <TableHead>Status</TableHead>

                                          
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">
                      Order Stationery
                      </TableCell>
                      <TableCell className="font-medium">
                      Lewis
                      </TableCell>
                      <TableCell className=" md:table-cell">
                        25/8/2024
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline"className='bg-red-500'>Pending</Badge>
                      </TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Details</DropdownMenuItem>
                            <DropdownMenuItem>Submit</DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>

                    </TableRow>
                    <TableRow>
                    <TableCell className="font-medium">
                        Renew Business Permit
                      </TableCell>
                      <TableCell className="font-medium">
                      Mary
                      </TableCell>
                      <TableCell className=" md:table-cell">
                      15/8/2024

                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className='bg-green-500'>Submitted</Badge>
                      </TableCell>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Details</DropdownMenuItem>
                            <DropdownMenuItem>Submit</DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>

                    </TableRow>

                  </TableBody>

  </Table>
  </Card>
  </div>
  )
}

export default Tasks