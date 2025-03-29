
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

interface FeaturedResourceProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

const FeaturedResource: React.FC<FeaturedResourceProps> = ({
  title,
  description,
  imageUrl,
  category,
  readTime,
}) => {
  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>
        <div className="md:w-2/3">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-aeo-500 bg-aeo-50 px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-sm text-gray-500">{readTime}</span>
            </div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{description}</p>
            <Button className="bg-aeo hover:bg-aeo-600">
              <BookOpen className="mr-2 h-4 w-4" />
              Read Full Guide
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedResource;
