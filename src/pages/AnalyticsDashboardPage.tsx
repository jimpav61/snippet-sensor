
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BarChart, Copy, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Plausible tracking code (domain placeholder)
const trackingCode = `<!-- Plausible Analytics -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
<!-- End Plausible Analytics -->`;

const AnalyticsDashboardPage = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [domain, setDomain] = useState('');

  // Add Plausible script dynamically when the component mounts
  useEffect(() => {
    // This is for demonstration purposes only
    // In a real implementation, this would be added server-side or during build
    console.log('Plausible script would be loaded here in production');
    
    // Clean up function to remove the script when component unmounts
    return () => {
      console.log('Plausible script would be removed here');
    };
  }, []);

  const handleCopyCode = () => {
    // Replace the domain in the code with user's domain if provided
    const customizedCode = domain 
      ? trackingCode.replace('yourdomain.com', domain) 
      : trackingCode;
      
    navigator.clipboard.writeText(customizedCode);
    toast.success('Plausible tracking code copied to clipboard!');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would validate and store the email
    if (email.includes('@') && email.includes('.')) {
      setAccessGranted(true);
      toast.success('Access granted! Welcome to your analytics dashboard.');
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Your Free Analytics Dashboard</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Gain insights into customer interactions, uncover trends, and improve your AI conversational experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Setup Instructions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-aeo-500" />
                Getting Started with Plausible
              </CardTitle>
              <CardDescription>
                Follow these steps to start tracking your conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Step 1: Enter your domain</h3>
                <Input 
                  placeholder="yourdomain.com" 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mb-4"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Step 2: Copy the tracking code</h3>
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto border">
                    {domain ? trackingCode.replace('yourdomain.com', domain) : trackingCode}
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2"
                    onClick={handleCopyCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Step 3: Add the code to your site</h3>
                <p className="text-gray-600 text-sm">
                  Paste the tracking code into the &lt;head&gt; section of your website. This will start sending 
                  data to your Plausible dashboard.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Step 4: View your insights</h3>
                <p className="text-gray-600 text-sm">
                  Once installed, your conversation data will appear in the dashboard as visitors interact with your site.
                </p>
                <a 
                  href="https://plausible.io/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-aeo-500 hover:underline text-sm inline-block mt-2"
                >
                  Access your Plausible dashboard →
                </a>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-gray-500">
                Need help? <a href="/aeo/contact" className="text-aeo-500 hover:underline">Contact our support team</a>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right column - Dashboard or Email Access */}
        <div className="lg:col-span-2">
          {accessGranted ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Analytics Dashboard</CardTitle>
                <CardDescription>
                  Real-time insights from your conversational AI interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="queries">Top Queries</TabsTrigger>
                    <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    {domain ? (
                      <iframe 
                        src={`https://plausible.io/share/${domain}?auth=DEMO_TOKEN&embed=true&theme=light`}
                        className="w-full h-[500px] rounded-lg border"
                        title="Analytics Dashboard Overview"
                      />
                    ) : (
                      <div className="text-center p-12 bg-gray-50 rounded-lg border">
                        <p className="text-gray-600">
                          Enter your domain in the left panel to view your Plausible analytics.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="queries" className="space-y-4">
                    {domain ? (
                      <iframe 
                        src={`https://plausible.io/share/${domain}/entry-pages?auth=DEMO_TOKEN&embed=true&theme=light`}
                        className="w-full h-[500px] rounded-lg border"
                        title="Top Entry Pages"
                      />
                    ) : (
                      <div className="text-center p-12 bg-gray-50 rounded-lg border">
                        <p className="text-gray-600">
                          Enter your domain in the left panel to view your top entry pages.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="sentiment" className="space-y-4">
                    <div className="text-center p-12 bg-gray-50 rounded-lg border">
                      <p className="text-gray-600">
                        Sentiment analysis requires a custom integration with your conversational AI platform.
                        <br />
                        <a href="/aeo/contact" className="text-aeo-500 hover:underline mt-4 inline-block">
                          Contact us to learn more about custom integrations
                        </a>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Access Your Free Dashboard</CardTitle>
                <CardDescription>
                  Enter your email to get immediate access to your analytics dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      className="rounded border-gray-300"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to receive updates about new analytics features
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-aeo hover:bg-aeo-600">
                    <Mail className="mr-2 h-4 w-4" />
                    Get Dashboard Access
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <p className="text-sm text-gray-500">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      <Separator className="my-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Conversation Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Analyze common topics, questions, and pain points from your customer conversations.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Drop-off Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Identify where users abandon conversations to improve engagement and satisfaction.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Monitor customer sentiment during conversations to gauge overall satisfaction.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboardPage;
