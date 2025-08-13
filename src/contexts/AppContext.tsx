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
    name: 'University of Zimbabwe',
    location: 'Harare, Zimbabwe',
    logo: '/assets/uz-logo.jpg',
    description: 'The oldest and largest university in Zimbabwe offering a wide range of undergraduate and postgraduate programs.',
    requirements: [
      { type: 'high-school-transcript', required: true, description: 'Official high school transcript' },
      { type: 'recommendation-letter', required: true, description: 'Teacher recommendation letter' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'Why do you want to study at University of Zimbabwe?',
        type: 'essay',
        maxWords: 200,
        required: true
      }
    ],
    deadlines: {
      regular: '2025-09-01'
    },
    applicationFee: 30,
    acceptanceRate: 60,
    ranking: 1
  },
  {
    id: '2',
    name: 'National University of Science and Technology (NUST)',
    location: 'Bulawayo, Zimbabwe',
    logo: '/assets/nust-logo.jpg',
    description: 'Specializes in science, engineering, and technology programs in Zimbabwe.',
    requirements: [
      { type: 'high-school-transcript', required: true, description: 'Official high school transcript' },
      { type: 'recommendation-letter', required: true, description: 'Teacher recommendation letter' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'Why choose NUST for your studies?',
        type: 'essay',
        maxWords: 200,
        required: true
      }
    ],
    deadlines: {
      regular: '2025-08-31'
    },
    applicationFee: 25,
    acceptanceRate: 65,
    ranking: 2
  },
  {
    id: '3',
    name: 'Harare Institute of Technology (HIT)',
    location: 'Harare, Zimbabwe',
    logo: '/assets/hit-logo.jpg',
    description: 'Focused on engineering, technology, and applied sciences programs.',
    requirements: [
      { type: 'high-school-transcript', required: true, description: 'Official high school transcript' },
      { type: 'recommendation-letter', required: true, description: 'Teacher recommendation letter' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'What motivates you to study at HIT?',
        type: 'essay',
        maxWords: 150,
        required: true
      }
    ],
    deadlines: {
      regular: '2025-09-15'
    },
    applicationFee: 20,
    acceptanceRate: 70,
    ranking: 3
  },
  {
    id: '4',
    name: 'Zimbabwe Open University (ZOU)',
    location: 'Harare, Zimbabwe',
    logo: '/assets/zou-logo.jpg',
    description: 'Offers distance learning and open access programs for working adults and students.',
    requirements: [
      { type: 'high-school-transcript', required: true, description: 'Official high school transcript' },
      { type: 'recommendation-letter', required: false, description: 'Optional recommendation letter' }
    ],
    supplementalQuestions: [
      {
        id: '1',
        question: 'Why are you interested in ZOU’s distance learning programs?',
        type: 'essay',
        maxWords: 200,
        required: true
      }
    ],
    deadlines: {
      regular: '2025-09-10'
    },
    applicationFee: 15,
    acceptanceRate: 80,
    ranking: 4
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
