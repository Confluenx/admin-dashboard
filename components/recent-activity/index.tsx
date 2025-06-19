import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    type: 'application',
    message: 'New trial application from John Smith',
    time: '2 minutes ago',
    status: 'pending',
  },
  {
    id: 2,
    type: 'trial',
    message: 'Soccer trial in Manchester created',
    time: '15 minutes ago',
    status: 'active',
  },
  {
    id: 3,
    type: 'user',
    message: 'Scout profile verified: Elite Sports FC',
    time: '1 hour ago',
    status: 'completed',
  },
  {
    id: 4,
    type: 'content',
    message: 'Flagged content reported by user',
    time: '2 hours ago',
    status: 'review',
  },
  {
    id: 5,
    type: 'payment',
    message: 'Premium subscription renewed',
    time: '3 hours ago',
    status: 'completed',
  },
];

export const RecentActivity = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-gray-600">Latest platform updates</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all activity
        </button>
      </CardContent>
    </Card>
  );
};
