import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Plus,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const UniversityList: React.FC = () => {
  const { universities, addApplication } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Add Polytech to universities if not already present
  const allUniversities = [
    ...universities,
    {
      id: 'polytech',
      name: 'Zimbabwe Polytechnic',
      location: 'Harare',
      description: 'Leading technical university offering engineering and applied sciences.',
      logo: '/assets/polytech-logo.jpg', // replace with actual logo path
      acceptanceRate: 70,
      applicationFee: 20,
      ranking: 6,
      deadlines: {
        earlyDecision: '2025-08-15',
        earlyAction: '2025-08-30',
        regular: '2025-09-15'
      },
      requirements: [
        { type: 'high-school-transcript', required: true },
        { type: 'recommendation-letter', required: true },
        { type: 'personal-statement', required: false }
      ]
    }
  ];

  const filteredUniversities = allUniversities
    .filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          uni.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter === 'all' || uni.location.includes(locationFilter);
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'acceptance':
          return a.acceptanceRate - b.acceptanceRate;
        case 'fee':
          return a.applicationFee - b.applicationFee;
        case 'ranking':
          return (a.ranking || 999) - (b.ranking || 999);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleApply = (universityId: string) => {
    const newApplication = {
      id: Date.now().toString(),
      studentId: '1',
      universityId,
      status: 'draft' as const,
      completionPercentage: 0,
      requiredDocuments: [],
      submittedDocuments: [],
      supplementalAnswers: {}
    };
    
    addApplication(newApplication);
    alert('Application started! Check your Applications page to continue.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Universities</h1>
        <p className="text-gray-600 mt-1">
          Discover and apply to Zimbabwean universities that match your goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search universities, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Locations</option>
          <option value="Harare">Harare</option>
          <option value="Bulawayo">Bulawayo</option>
          <option value="Masvingo">Masvingo</option>
          <option value="Mutare">Mutare</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="ranking">Sort by Ranking</option>
          <option value="acceptance">Sort by Acceptance Rate</option>
          <option value="fee">Sort by Application Fee</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredUniversities.length} of {allUniversities.length} universities
        </p>
      </div>

      {/* University Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <div key={university.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
              <img 
                src={university.logo} 
                alt={university.name}
                className="w-full h-full object-cover"
              />
              {university.ranking && (
                <div className="absolute top-4 left-4">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-gray-900">#{university.ranking}</span>
                  </div>
                </div>
              )}
              <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-colors">
                <Star className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{university.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{university.location}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{university.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Acceptance Rate</p>
                  <p className="text-lg font-semibold text-gray-900">{university.acceptanceRate}%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">App Fee</p>
                  <p className="text-lg font-semibold text-gray-900">${university.applicationFee}</p>
                </div>
              </div>

              {/* Deadlines */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">Deadlines</span>
                </div>
                <div className="space-y-1">
                  {university.deadlines.earlyDecision && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Early Decision</span>
                      <span className="text-gray-900">{university.deadlines.earlyDecision}</span>
                    </div>
                  )}
                  {university.deadlines.earlyAction && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Early Action</span>
                      <span className="text-gray-900">{university.deadlines.earlyAction}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Regular Decision</span>
                    <span className="text-gray-900">{university.deadlines.regular}</span>
                  </div>
                </div>
              </div>

              {/* Requirements Preview */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Required</p>
                <div className="flex flex-wrap gap-1">
                  {university.requirements.filter(req => req.required).slice(0, 3).map((req, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {req.type.replace('-', ' ')}
                    </span>
                  ))}
                  {university.requirements.filter(req => req.required).length > 3 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{university.requirements.filter(req => req.required).length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApply(university.id)}
                  className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Apply</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No universities found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversityList;
