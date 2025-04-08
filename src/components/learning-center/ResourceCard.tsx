
import React from 'react';
import { FileText, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug?: string;
  type?: 'guide' | 'case-study' | 'tool';
  relatedGuide?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  readTime,
  slug,
  type = 'guide',
  relatedGuide
}) => {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (type) {
      case 'tool':
        return <FileText className="text-gray-400 h-4 w-4" />;
      case 'case-study':
        return <FileText className="text-gray-400 h-4 w-4" />;
      case 'guide':
      default:
        return <BookOpen className="text-gray-400 h-4 w-4" />;
    }
  };

  const getLink = () => {
    if (!slug) return '';
    
    switch (type) {
      case 'tool':
        return `/aeo/learning/tools/${slug}`;
      case 'case-study':
        return `/aeo/learning/case-study/${slug}`;
      case 'guide':
      default:
        return `/aeo/learning/guide/${slug}`;
    }
  };

  const handleCardClick = () => {
    if (slug) {
      navigate(getLink());
    }
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-aeo-600 bg-aeo-50 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{readTime}</span>
          {relatedGuide && type === 'tool' && (
            <Link 
              to={`/aeo/learning/guide/${relatedGuide}`} 
              className="text-aeo-600 hover:text-aeo-700 inline-flex items-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <BookOpen className="h-3 w-3 mr-1" />
              <span>Guide</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
