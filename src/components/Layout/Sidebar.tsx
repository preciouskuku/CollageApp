import React from 'react';
import { 
  Home, 
  User, 
  FileText, 
  GraduationCap, 
  Upload, 
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const { user } = useAuth();

  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'universities', label: 'Find Schools', icon: GraduationCap },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'deadlines', label: 'Deadlines', icon: Calendar },
  ];

  const recommenderMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'recommendations', label: 'Recommendations', icon: BookOpen },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return studentMenuItems;
      case 'recommender':
        return recommenderMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const handleMenuClick = (viewId: string) => {
    setCurrentView(viewId);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center space-x-2 p-6 border-b border-gray-200">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">ApplyIQ</h1>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {getMenuItems().map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors mb-1
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {user?.role === 'student' && (
          <div className="absolute bottom-6 left-3 right-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Applications: 3/5</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Keep up the great work!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;