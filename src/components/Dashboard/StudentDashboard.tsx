import React from 'react';
import { 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  MessageSquare,
  Upload
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const StudentDashboard: React.FC = () => {
  const { universities, applications } = useApp();

  const stats = [
    {
      label: 'Applications Started',
      value: '5',
      change: '+2 this week',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'blue'
    },
    {
      label: 'Applications Submitted',
      value: '3',
      change: '+1 this week',
      changeType: 'positive' as const,
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Pending Documents',
      value: '4',
      change: 'Due this week',
      changeType: 'warning' as const,
      icon: Upload,
      color: 'orange'
    },
    {
      label: 'Upcoming Deadlines',
      value: '2',
      change: 'Next 30 days',
      changeType: 'warning' as const,
      icon: Clock,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'document',
      title: 'Transcript uploaded',
      subtitle: 'Harvard University application',
      timestamp: '2 hours ago',
      icon: Upload,
      color: 'green'
    },
    {
      id: '2',
      type: 'application',
      title: 'Application submitted',
      subtitle: 'Stanford University',
      timestamp: '1 day ago',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: '3',
      type: 'message',
      title: 'New message received',
      subtitle: 'From MIT Admissions',
      timestamp: '2 days ago',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      id: '4',
      type: 'deadline',
      title: 'Deadline reminder',
      subtitle: 'Harvard EA deadline in 15 days',
      timestamp: '3 days ago',
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      university: 'Harvard University',
      type: 'Early Decision',
      date: '2024-11-01',
      daysLeft: 15
    },
    {
      id: '2',
      university: 'Stanford University',
      type: 'Early Action',
      date: '2024-11-01',
      daysLeft: 15
    },
    {
      id: '3',
      university: 'MIT',
      type: 'Early Action',
      date: '2024-11-01',
      daysLeft: 15
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      purple: 'bg-purple-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100">
          You have 2 deadlines approaching and 4 pending documents. Let's keep the momentum going!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getColorClasses(activity.color)}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.subtitle}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{deadline.university}</p>
                    <p className="text-sm text-gray-500">{deadline.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      deadline.daysLeft <= 7 ? 'text-red-600' : 
                      deadline.daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {deadline.daysLeft} days
                    </p>
                    <p className="text-xs text-gray-500">{deadline.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Start New Application</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Upload className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Upload Documents</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Check Messages</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">View Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;