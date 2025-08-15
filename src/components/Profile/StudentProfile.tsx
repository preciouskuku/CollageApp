import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Plus,
  Edit,
  Trash2,
  Award,
  BookOpen,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  citizenship: string;
}

interface EducationEntry {
  id: string;
  schoolName: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  maxGpa: string;
}

interface Activity {
  id: string;
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  hoursPerWeek: number;
}

const StudentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '2005-06-15',
    address: '123 Main St, Anytown, CA 90210',
    citizenship: 'US Citizen'
  });

  const [educationHistory, setEducationHistory] = useState<EducationEntry[]>([
    { id: '1', schoolName: 'Central High School', location: 'Anytown, CA', startDate: '2021-08', endDate: '2025-06', gpa: '3.85', maxGpa: '4.0' }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', name: 'Student Government', role: 'Vice President', description: 'Led student initiatives and represented student body in school board meetings.', startDate: '2022-09', endDate: '2024-06', hoursPerWeek: 10 },
    { id: '2', name: 'Math Tutoring', role: 'Volunteer Tutor', description: 'Tutored underclassmen in algebra and calculus.', startDate: '2023-01', hoursPerWeek: 5 }
  ]);

  const [essayContent, setEssayContent] = useState('');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Award },
    { id: 'essays', label: 'Essays', icon: FileText }
  ];

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert('Profile saved successfully!');
  };

  const calculateCompletion = () => {
    let total = 4;
    let filled = 0;
    if (personalInfo.firstName && personalInfo.lastName && personalInfo.email) filled++;
    if (educationHistory.length > 0) filled++;
    if (activities.length > 0) filled++;
    if (essayContent.trim().length > 0) filled++;
    return Math.round((filled / total) * 100);
  };

  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: Date.now().toString(),
      schoolName: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      maxGpa: '4.0'
    };
    setEducationHistory(prev => [...prev, newEdu]);
  };

  const deleteEducation = (id: string) => {
    setEducationHistory(prev => prev.filter(e => e.id !== id));
  };

  const addActivity = () => {
    const newAct: Activity = {
      id: Date.now().toString(),
      name: '',
      role: '',
      description: '',
      startDate: '',
      hoursPerWeek: 0
    };
    setActivities(prev => [...prev, newAct]);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${personalInfo.firstName} ${personalInfo.lastName}`, 10, 10);
    doc.text(`Email: ${personalInfo.email}`, 10, 20);
    doc.text(`Phone: ${personalInfo.phone}`, 10, 30);
    doc.text(`Address: ${personalInfo.address}`, 10, 40);
    doc.save('StudentProfile.pdf');
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* ...same personal info fields as your previous code... */}
    </div>
  );

  const renderEducationHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education History</h3>
        <button onClick={addEducation} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add School</span>
        </button>
      </div>
      {educationHistory.map((education) => (
        <div key={education.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{education.schoolName || 'New School'}</h4>
              <p className="text-gray-600">{education.location}</p>
            </div>
            <div className="flex space-x-2">
              <button title="Edit" className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button onClick={() => deleteEducation(education.id)} title="Delete" className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Extracurricular Activities</h3>
        <button onClick={addActivity} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>
      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{activity.name || 'New Activity'}</h4>
              <p className="text-blue-600 font-medium">{activity.role}</p>
            </div>
            <div className="flex space-x-2">
              <button title="Edit" className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button onClick={() => deleteActivity(activity.id)} title="Delete" className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEssays = () => (
    <div className="space-y-6">
      <div className="mb-4">
        <textarea
          value={essayContent}
          onChange={(e) => setEssayContent(e.target.value)}
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell us about yourself, your background, interests, and goals..."
        />
        <p className="text-sm text-gray-500 mt-1">{essayContent.split(' ').filter(Boolean).length}/650 words</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        </div>
        <div className="flex space-x-2">
          <button onClick={exportPDF} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button onClick={handleSave} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-sm text-gray-600">{calculateCompletion()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${calculateCompletion()}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">Complete all sections to maximize your application impact</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'education' && renderEducationHistory()}
          {activeTab === 'activities' && renderActivities()}
          {activeTab === 'essays' && renderEssays()}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
