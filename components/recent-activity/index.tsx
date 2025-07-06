import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchNotifications } from "../dashboard-sections/services/notifications";

interface Notification {
  _id: string;
  user: string;
  title: string;
  description: string;
  seen: boolean;
  type: string;
  updatedAt: string;
  createdAt: string;
}

export function NotificationsSection() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    const notificationsData = await fetchNotifications()
    setNotifications(notificationsData)
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getData()
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start space-x-4 p-4 rounded-lg border ${
                  !notification.seen ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 rounded-full mt-1 bg-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 capitalize">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {notification.type}
                    </Badge>
                    {!notification.seen && (
                      <Button size="sm" variant="ghost" className="text-xs">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
