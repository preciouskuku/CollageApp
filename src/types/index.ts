export interface User {
  id: string;
  email: string;
  role: 'student' | 'recommender' | 'admin';
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  profile: StudentProfile;
  applications: Application[];
}

export interface StudentProfile {
  personalInfo: PersonalInfo;
  educationHistory: EducationEntry[];
  extracurriculars: ExtracurricularActivity[];
  essays: Essay[];
  documents: Document[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: Address;
  citizenship: string;
  ethnicity?: string;
  gender?: string;
  parentInfo: ParentInfo[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ParentInfo {
  firstName: string;
  lastName: string;
  occupation: string;
  education: string;
  email?: string;
  phone?: string;
}

export interface EducationEntry {
  id: string;
  schoolName: string;
  schoolType: 'high-school' | 'college' | 'university';
  location: string;
  startDate: string;
  endDate: string;
  gpa: number;
  maxGpa: number;
  coursework: string[];
  honors: string[];
}

export interface ExtracurricularActivity {
  id: string;
  name: string;
  type: string;
  description: string;
  role: string;
  startDate: string;
  endDate?: string;
  hoursPerWeek: number;
  weeksPerYear: number;
  achievements: string[];
}

export interface Essay {
  id: string;
  prompt: string;
  content: string;
  wordCount: number;
  maxWords: number;
  type: 'personal-statement' | 'supplemental';
  universityId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'transcript' | 'recommendation' | 'test-score' | 'other';
  url: string;
  uploadDate: string;
  size: number;
  status: 'pending' | 'verified' | 'rejected';
}

export interface University {
  id: string;
  name: string;
  location: string;
  logo: string;
  description: string;
  requirements: ApplicationRequirement[];
  supplementalQuestions: SupplementalQuestion[];
  deadlines: {
    earlyDecision?: string;
    earlyAction?: string;
    regular: string;
  };
  applicationFee: number;
  acceptanceRate: number;
  ranking?: number;
}

export interface ApplicationRequirement {
  type: string;
  required: boolean;
  description: string;
}

export interface SupplementalQuestion {
  id: string;
  question: string;
  type: 'essay' | 'short-answer' | 'multiple-choice';
  maxWords?: number;
  required: boolean;
}

export interface Application {
  id: string;
  studentId: string;
  universityId: string;
  status: 'draft' | 'submitted' | 'under-review' | 'accepted' | 'rejected' | 'waitlisted';
  submittedAt?: string;
  reviewedAt?: string;
  decision?: string;
  decisionDate?: string;
  completionPercentage: number;
  requiredDocuments: string[];
  submittedDocuments: string[];
  supplementalAnswers: { [key: string]: string };
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'student-to-university' | 'university-to-student' | 'system';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'deadline' | 'document' | 'decision' | 'message';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}