
import React from 'react';
import ResourceCard from './ResourceCard';

interface Resource {
  title: string;
  description: string;
  category: string;
  readTime: string;
  slug: string;
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
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.slug || index}
            title={resource.title}
            description={resource.description}
            category={resource.category}
            readTime={resource.readTime}
            slug={resource.slug}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceCategorySection;
