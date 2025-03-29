
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug?: string;
  type?: 'guide' | 'case-study' | 'tool';
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  readTime,
  slug,
  type = 'guide',
}) => {
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
    
    // Ensure we're using the correct type in the URL path
    switch (type) {
      case 'tool':
        return `/aeo/learning/tool/${slug}`;
      case 'case-study':
        return `/aeo/learning/case-study/${slug}`;
      case 'guide':
        return `/aeo/learning/guide/${slug}`;
      default:
        return `/aeo/learning/${type}/${slug}`;
    }
  };

  const cardContent = (
    <>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-aeo-500 bg-aeo-50 px-2 py-1 rounded-full">
            {category}
          </span>
          {getIcon()}
        </div>
        <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 flex justify-end">
        <span>{readTime}</span>
      </CardFooter>
    </>
  );

  if (slug) {
    return (
      <Link to={getLink()} className="block h-full">
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-aeo-200">
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      {cardContent}
    </Card>
  );
};

export default ResourceCard;
