
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  category,
  date,
  readTime,
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-aeo-500 bg-aeo-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <FileText className="text-gray-400 h-4 w-4" />
        </div>
        <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 flex justify-between">
        <span>{date}</span>
        <span>{readTime}</span>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
