
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  category: string;
  readTime: string;
}

interface ResourceCategorySectionProps {
  title: string;
  resources: Resource[];
}

const ResourceCategorySection: React.FC<ResourceCategorySectionProps> = ({
  title,
  resources,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-aeo-500 bg-aeo-50 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <FileText className="text-gray-400 h-4 w-4" />
              </div>
              <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
              <div className="text-xs text-muted-foreground">{resource.readTime}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourceCategorySection;
