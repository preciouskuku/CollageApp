import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AuthForms from './components/Auth/AuthForms';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import StudentProfile from './components/Profile/StudentProfile';
import ApplicationList from './components/Applications/ApplicationList';
import UniversityList from './components/Universities/UniversityList';
import MessageCenter from './components/Messages/MessageCenter';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <AuthForms />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'profile':
        return <StudentProfile />;
      case 'applications':
        return <ApplicationList />;
      case 'universities':
        return <UniversityList />;
      case 'messages':
        return <MessageCenter />;
      case 'documents':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Documents</h2>
            <p className="text-gray-600">Document management feature coming soon...</p>
          </div>
        );
      case 'deadlines':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deadlines</h2>
            <p className="text-gray-600">Deadline calendar feature coming soon...</p>
          </div>
        );
      case 'recommendations':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
            <p className="text-gray-600">Recommendation management for recommenders coming soon...</p>
          </div>
        );
      case 'students':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Students</h2>
            <p className="text-gray-600">Student management feature coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;