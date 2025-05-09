
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  slug?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  category,
  date,
  readTime,
  slug,
}) => {
  const cardContent = (
    <>
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
    </>
  );

  if (slug) {
    return (
      <Link to={`/aeo/learning/article/${slug}`} className="block h-full">
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

export default ArticleCard;
