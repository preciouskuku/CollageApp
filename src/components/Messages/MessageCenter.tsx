import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Mail, 
  MailOpen,
  Reply,
  Archive,
  Trash2,
  Send,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Message {
  id: string;
  from: {
    name: string;
    email: string;
    role: string;
  };
  to: {
    name: string;
    email: string;
  };
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'received' | 'sent';
}

const MessageCenter: React.FC = () => {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock messages
  const mockMessages: Message[] = [
    {
      id: '1',
      from: {
        name: 'Harare Institute of technology Admissions',
        email: 'admissions@hit.edu',
        role: 'University'
      },
      to: {
        name: 'John Smith',
        email: 'john.smith@email.com'
      },
      subject: 'Application Status Update',
      content: `Dear John,

We wanted to update you on the status of your Early Decision application. We have received all of your required materials and your application is now under review.

Our admissions committee will be reviewing applications over the next few weeks. You can expect to receive our decision by December 15th.

If you have any questions, please don't hesitate to reach out.

Best regards,
Harare Institute of Technology Admissions Office`,
      timestamp: '2024-10-20T10:30:00Z',
      read: false,
      type: 'received'
    },
    {
      id: '2',
      from: {
        name: 'University of Zimbabwe Admissions',
        email: 'admissions@uz.edu',
        role: 'University'
      },
      to: {
        name: 'John Smith',
        email: 'john.smith@email.com'
      },
      subject: 'Missing Document - Transcript',
      content: `Hello John,

We are currently reviewing your application for admission and noticed that we have not yet received your official high school transcript.

Please have your high school send your transcript directly to our admissions office as soon as possible to ensure your application can be processed on time.

Thank you,
university of zimbabwe Admissions`,
      timestamp: '2024-10-19T14:15:00Z',
      read: true,
      type: 'received'
    },
    {
      id: '3',
      from: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        role: 'Student'
      },
      to: {
        name: 'Stanford Admissions',
        email: 'admissions@stanford.edu'
      },
      subject: 'Question about Supplemental Essays',
      content: `Dear Stanford Admissions,

I have a question about one of the supplemental essay prompts. For the "What matters to you and why?" essay, are you looking for personal experiences or can I discuss broader topics like social issues?

I want to make sure I'm addressing the prompt correctly.

Thank you for your time,
John Smith`,
      timestamp: '2024-10-18T09:20:00Z',
      read: true,
      type: 'sent'
    }
  ];

  const [messages, setMessages] = useState(mockMessages);
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !message.read) ||
      (filter === 'sent' && message.type === 'sent') ||
      (filter === 'received' && message.type === 'received');
    
    return matchesSearch && matchesFilter;
  });

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
  };

  const handleSendMessage = () => {
    if (!composeData.to || !composeData.subject || !composeData.content) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: {
        name: user?.firstName + ' ' + user?.lastName || 'User',
        email: user?.email || '',
        role: user?.role || 'Student'
      },
      to: {
        name: composeData.to,
        email: composeData.to
      },
      subject: composeData.subject,
      content: composeData.content,
      timestamp: new Date().toISOString(),
      read: true,
      type: 'sent'
    };

    setMessages(prev => [newMessage, ...prev]);
    setComposeData({ to: '', subject: '', content: '' });
    setShowCompose(false);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Message List */}
      <div className={`${selectedMessage ? 'hidden lg:block' : 'block'} w-full lg:w-1/3 border-r border-gray-200`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
            <button
              onClick={() => setShowCompose(true)}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Compose</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'sent', label: 'Sent' },
              { key: 'received', label: 'Received' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  message.type === 'received' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {message.read ? (
                    <MailOpen className={`w-4 h-4 ${
                      message.type === 'received' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  ) : (
                    <Mail className={`w-4 h-4 ${
                      message.type === 'received' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium truncate ${
                      message.read ? 'text-gray-900' : 'text-black'
                    }`}>
                      {message.type === 'received' ? message.from.name : `To: ${message.to.name}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(message.timestamp)}
                    </p>
                  </div>
                  <p className={`text-sm truncate ${
                    message.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                  }`}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {message.content}
                  </p>
                </div>
                {!message.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="p-8 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'Start a conversation by composing a new message'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`${selectedMessage ? 'block' : 'hidden lg:block'} flex-1 flex flex-col`}>
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="lg:hidden p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Reply className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Archive className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {selectedMessage.subject}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  <strong>From:</strong> {selectedMessage.from.name} ({selectedMessage.from.email})
                </span>
                <span>
                  {new Date(selectedMessage.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
              <p className="text-gray-600">Choose a message from the list to read its contents</p>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Compose Message</h3>
              <button
                onClick={() => setShowCompose(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={composeData.to}
                  onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admissions@university.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={10}
                  value={composeData.content}
                  onChange={(e) => setComposeData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message here..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;