import React, { createContext, useContext, useState, ReactNode } from 'react';
import { University, Application, Message, Notification } from '../types';

interface AppContextType {
  universities: University[];
  applications: Application[];
  messages: Message[];
  notifications: Notification[];
  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  addMessage: (message: Message) => void;
  markMessageAsRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
    requirements: [
      { type: 'transcript', required: true, description: 'Official high school transcript' },
      { type: 'sat-score', required: true, description: 'SAT or ACT scores' },
      { type: 'recommendation', required: true, description: '2 teacher recommendations' },
      { type: 'essay', required: true, description: 'Personal statement' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'What would you want your future college roommate to know about you?',
        type: 'essay',
        maxWords: 150,
        required: true
      },
      {
        id: '2',
        question: 'How do you hope to use your college education?',
        type: 'essay',
        maxWords: 200,
        required: true
      }
    ],
    deadlines: {
      earlyDecision: '2024-11-01',
      regular: '2024-01-01'
    },
    applicationFee: 85,
    acceptanceRate: 3.4,
    ranking: 2
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    logo: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Stanford University is a private research university in Stanford, California.',
    requirements: [
      { type: 'transcript', required: true, description: 'Official high school transcript' },
      { type: 'sat-score', required: false, description: 'SAT or ACT scores (test-optional)' },
      { type: 'recommendation', required: true, description: '3 teacher recommendations' },
      { type: 'essay', required: true, description: 'Personal statement and supplemental essays' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'What matters to you, and why?',
        type: 'essay',
        maxWords: 250,
        required: true
      },
      {
        id: '2',
        question: 'Tell us about something that is meaningful to you and why.',
        type: 'short-answer',
        maxWords: 100,
        required: true
      }
    ],
    deadlines: {
      earlyAction: '2024-11-01',
      regular: '2024-01-05'
    },
    applicationFee: 90,
    acceptanceRate: 3.9,
    ranking: 6
  },
  {
    id: '3',
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    logo: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'MIT is a private research university in Cambridge, Massachusetts.',
    requirements: [
      { type: 'transcript', required: true, description: 'Official high school transcript' },
      { type: 'sat-score', required: true, description: 'SAT Subject Tests recommended' },
      { type: 'recommendation', required: true, description: '2 teacher recommendations + 1 counselor' },
      { type: 'essay', required: true, description: 'Personal statement and short answers' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'Describe the world you come from; for example, your family, clubs, school, community, city, or town.',
        type: 'essay',
        maxWords: 300,
        required: true
      }
    ],
    deadlines: {
      earlyAction: '2024-11-01',
      regular: '2024-01-01'
    },
    applicationFee: 75,
    acceptanceRate: 4.1,
    ranking: 2
  }
];

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [universities] = useState<University[]>(mockUniversities);
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addApplication = (application: Application) => {
    setApplications(prev => [...prev, application]);
  };

  const updateApplication = (id: string, updates: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, ...updates } : app)
    );
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, read: true } : msg)
    );
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const value = {
    universities,
    applications,
    messages,
    notifications,
    addApplication,
    updateApplication,
    addMessage,
    markMessageAsRead,
    addNotification,
    markNotificationAsRead
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};