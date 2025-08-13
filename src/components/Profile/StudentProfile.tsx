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
  BookOpen
} from 'lucide-react';

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
    {
      id: '1',
      schoolName: 'Central High School',
      location: 'Anytown, CA',
      startDate: '2021-08',
      endDate: '2025-06',
      gpa: '3.85',
      maxGpa: '4.0'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      name: 'Student Government',
      role: 'Vice President',
      description: 'Led student initiatives and represented student body in school board meetings.',
      startDate: '2022-09',
      endDate: '2024-06',
      hoursPerWeek: 10
    },
    {
      id: '2',
      name: 'Math Tutoring',
      role: 'Volunteer Tutor',
      description: 'Tutored underclassmen in algebra and calculus.',
      startDate: '2023-01',
      hoursPerWeek: 5
    }
  ]);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Award },
    { id: 'essays', label: 'Essays', icon: Edit }
  ];

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Profile saved successfully!');
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Citizenship *
          </label>
          <select
            value={personalInfo.citizenship}
            onChange={(e) => handlePersonalInfoChange('citizenship', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="US Citizen">US Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="International">International Student</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Home Address *
        </label>
        <div className="relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <textarea
            value={personalInfo.address}
            onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            rows={3}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Street address, city, state, zip code"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderEducationHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Education History</h3>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add School</span>
        </button>
      </div>

      {educationHistory.map((education) => (
        <div key={education.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{education.schoolName}</h4>
              <p className="text-gray-600">{education.location}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Duration</p>
              <p className="text-gray-600">
                {new Date(education.startDate).toLocaleDateString()} - {new Date(education.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">GPA</p>
              <p className="text-gray-600">{education.gpa}/{education.maxGpa}</p>
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
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{activity.name}</h4>
              <p className="text-blue-600 font-medium">{activity.role}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{activity.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Duration</p>
              <p className="text-gray-600">
                {new Date(activity.startDate).toLocaleDateString()} - {activity.endDate ? new Date(activity.endDate).toLocaleDateString() : 'Present'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Time Commitment</p>
              <p className="text-gray-600">{activity.hoursPerWeek} hours/week</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEssays = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Personal Statement & Essays</h3>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Essay</span>
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Personal Statement</h4>
        <p className="text-gray-600 mb-4">Main essay for all applications (650 words max)</p>
        
        <div className="mb-4">
          <textarea
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about yourself, your background, interests, and goals..."
          />
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Last saved: 2 hours ago</span>
          <span>Word count: 0/650</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Complete your profile to enhance your applications
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-sm text-gray-600">75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Complete all sections to maximize your application impact
        </p>
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
                  className={`
                    flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                    ${isActive 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
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