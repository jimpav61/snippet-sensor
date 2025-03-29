
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Activity, LineChart, ArrowUpRight, Search, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="heading-lg text-gray-900">Dashboard</h1>
            <p className="text-lg text-gray-600">Welcome to your AEO performance dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Pages Analyzed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> 16%
                  </span>
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average AEO Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">67/100</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> 8%
                  </span>
                  from initial score
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended actions to take
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="recent" className="space-y-4">
            <TabsList>
              <TabsTrigger value="recent">Recent Analyses</TabsTrigger>
              <TabsTrigger value="progress">Score Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent AEO Analyses</CardTitle>
                  <CardDescription>
                    Your latest content optimizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { url: 'https://example.com/blog/ai-trends-2024', title: 'AI Trends in 2024', score: 82, date: '2 days ago' },
                      { url: 'https://example.com/services/ai-consulting', title: 'AI Consulting Services', score: 74, date: '1 week ago' },
                      { url: 'https://example.com/about', title: 'About Our Company', score: 65, date: '2 weeks ago' },
                    ].map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FileText className="h-3 w-3 mr-1" /> {item.url}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{item.date}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-lg font-bold">{item.score}</div>
                          <div className="text-xs text-gray-500">AEO Score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="ml-auto">
                    <Link to="/aeo/analyze">Analyze New Content</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>AEO Score Progress</CardTitle>
                  <CardDescription>
                    Your optimization journey over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed">
                    <div className="text-center p-6">
                      <Activity className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-gray-500 mb-1">Score Tracking</h3>
                      <p className="text-sm text-gray-400 max-w-xs">
                        Your progress chart will appear here as you analyze more content
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm" className="ml-auto">
                    <Link to="/aeo/admin">View Detailed Reports</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 aeo-card p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Ready to optimize more content?</h2>
                <p className="text-gray-600">Get your AEO score and actionable recommendations</p>
              </div>
              <Button asChild className="bg-aeo hover:bg-aeo-600">
                <Link to="/aeo/analyze">Analyze New Content</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
