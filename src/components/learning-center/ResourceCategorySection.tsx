
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResourceCard from './ResourceCard';

interface Resource {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug?: string;
}

interface ResourceCategorySectionProps {
  title: string;
  resources: Resource[];
  type?: 'guide' | 'case-study' | 'tool';
}

const ResourceCategorySection: React.FC<ResourceCategorySectionProps> = ({ 
  title, 
  resources,
  type = 'guide'
}) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            category={resource.category}
            readTime={resource.readTime}
            slug={resource.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceCategorySection;
