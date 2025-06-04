"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, MoreHorizontal, Calendar, User, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TaskBoard() {
  const [tasks] = useState({
    todo: [
      {
        id: 1,
        title: "Implement user authentication",
        description: "Add login/logout functionality with JWT tokens",
        assignee: { name: "Alex Rivera", avatar: "AR" },
        priority: "high",
        dueDate: "2024-01-15",
        tags: ["frontend", "auth"],
      },
      {
        id: 2,
        title: "Design user dashboard",
        description: "Create wireframes and mockups for the main dashboard",
        assignee: { name: "Sarah Wilson", avatar: "SW" },
        priority: "medium",
        dueDate: "2024-01-18",
        tags: ["design", "ui"],
      },
    ],
    inProgress: [
      {
        id: 3,
        title: "API integration",
        description: "Connect frontend with backend API endpoints",
        assignee: { name: "Mike Chen", avatar: "MC" },
        priority: "high",
        dueDate: "2024-01-12",
        tags: ["backend", "api"],
      },
    ],
    done: [
      {
        id: 4,
        title: "Setup project structure",
        description: "Initialize React app with necessary dependencies",
        assignee: { name: "Alex Rivera", avatar: "AR" },
        priority: "low",
        dueDate: "2024-01-05",
        tags: ["setup"],
      },
    ],
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const renderTaskList = (title, taskList, columnColor) => (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${columnColor}`}></div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <Badge variant="outline" className="text-xs">
            {taskList.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3">
        {taskList.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm text-white">{task.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <p className="text-xs text-gray-400 mb-3">{task.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-gray-700/50">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-blue-500 text-[10px]">{task.assignee.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{task.assignee.name}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white">Sprint Tasks</h3>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Add Task
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Sprint 23 • Jan 5 - Jan 19</span>
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>5 assignees</span>
          </div>
          <div className="flex items-center">
            <Flag className="h-3 w-3 mr-1" />
            <span>7 tasks</span>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="flex-1 overflow-x-auto p-3">
        <div className="flex space-x-4 h-full">
          {renderTaskList("To Do", tasks.todo, "bg-gray-500")}
          {renderTaskList("In Progress", tasks.inProgress, "bg-blue-500")}
          {renderTaskList("Done", tasks.done, "bg-green-500")}

          {/* Add Column Button */}
          <div className="min-w-[200px] flex items-start">
            <Button variant="outline" className="border-dashed border-gray-600 text-gray-400 hover:text-white w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
