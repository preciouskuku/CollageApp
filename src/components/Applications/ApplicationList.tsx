import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  FileText
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ApplicationList: React.FC = () => {
  const { universities, applications, addApplication } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);

  // Zimbabwean universities applications mock
  const mockApplications = [
    {
      id: '1',
      studentId: '1',
      universityId: '1',
      universityName: 'University of Zimbabwe',
      status: 'submitted' as const,
      submittedAt: '2025-08-01',
      completionPercentage: 100,
      deadline: '2025-09-30',
      type: 'Early Decision'
    },
    {
      id: '2',
      studentId: '1',
      universityId: '2',
      universityName: 'National University of Science and Technology (NUST)',
      status: 'draft' as const,
      completionPercentage: 60,
      deadline: '2025-10-05',
      type: 'Early Action'
    },
    {
      id: '3',
      studentId: '1',
      universityId: '3',
      universityName: 'Africa University',
      status: 'under-review' as const,
      submittedAt: '2025-08-05',
      completionPercentage: 100,
      deadline: '2025-10-10',
      type: 'Early Action'
    },
    {
      id: '4',
      studentId: '1',
      universityId: '4',
      universityName: 'Midlands State University',
      status: 'draft' as const,
      completionPercentage: 40,
      deadline: '2025-10-15',
      type: 'Regular'
    },
    {
      id: '5',
      studentId: '1',
      universityId: '5',
      universityName: 'Great Zimbabwe University',
      status: 'submitted' as const,
      submittedAt: '2025-08-07',
      completionPercentage: 100,
      deadline: '2025-10-20',
      type: 'Regular'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'under-review':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'draft':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'under-review':
        return 'Under Review';
      case 'draft':
        return 'Draft';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'waitlisted':
        return 'Waitlisted';
      default:
        return 'Unknown';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.universityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your Zimbabwean university applications
          </p>
        </div>
        <button
          onClick={() => setShowNewApplicationModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="waitlisted">Waitlisted</option>
          </select>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApplications.map((app) => {
          const daysLeft = getDaysUntilDeadline(app.deadline);
          
          return (
            <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {app.universityName}
                  </h3>
                  <p className="text-sm text-gray-600">{app.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(app.status)}
                  <span className="text-sm font-medium text-gray-700">
                    {getStatusText(app.status)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{app.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      app.completionPercentage === 100 
                        ? 'bg-green-500' 
                        : app.completionPercentage >= 50 
                        ? 'bg-blue-500' 
                        : 'bg-orange-500'
                    }`}
                    style={{ width: `${app.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Deadline</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{app.deadline}</p>
                  <p className={`text-xs ${
                    daysLeft <= 7 ? 'text-red-600' : 
                    daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                {app.status === 'draft' && (
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm">
                    Continue
                  </button>
                )}
              </div>

              {app.submittedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Submitted on {new Date(app.submittedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search criteria'
              : 'Start your Zimbabwean university journey by creating your first application'
            }
          </p>
          <button
            onClick={() => setShowNewApplicationModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create Application
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
