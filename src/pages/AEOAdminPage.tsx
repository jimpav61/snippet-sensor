
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { FileText, Save, Download, Trash2, Plus, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

interface AEOResult {
  id: string;
  clientName: string;
  url: string;
  date: string;
  keywordRelevance: number;
  readability: number;
  snippetOptimization: number;
  structuredData: number;
  notes: string;
}

const AEOAdminPage = () => {
  const [clientName, setClientName] = useState('');
  const [url, setUrl] = useState('');
  const [keywordRelevance, setKeywordRelevance] = useState(70);
  const [readability, setReadability] = useState(70);
  const [snippetOptimization, setSnippetOptimization] = useState(70);
  const [structuredData, setStructuredData] = useState(70);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for demonstration
  const [results, setResults] = useState<AEOResult[]>([
    {
      id: '1',
      clientName: 'Acme Corporation',
      url: 'https://acme.com/services',
      date: '2023-10-15',
      keywordRelevance: 82,
      readability: 78,
      snippetOptimization: 65,
      structuredData: 70,
      notes: 'Good overall performance but needs improvement on snippet optimization.'
    },
    {
      id: '2',
      clientName: 'Tech Solutions Inc',
      url: 'https://techsolutions.com/ai-services',
      date: '2023-10-10',
      keywordRelevance: 75,
      readability: 85,
      snippetOptimization: 60,
      structuredData: 55,
      notes: 'Content is well-written but lacks proper structure for AI engines.'
    }
  ]);
  
  const calculateFinalScore = (result: Partial<AEOResult>) => {
    const { keywordRelevance = 0, readability = 0, snippetOptimization = 0, structuredData = 0 } = result;
    return Math.round((keywordRelevance + readability + snippetOptimization + structuredData) / 4);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || !url) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newResult: AEOResult = {
      id: Date.now().toString(),
      clientName,
      url,
      date: new Date().toISOString().split('T')[0],
      keywordRelevance,
      readability,
      snippetOptimization,
      structuredData,
      notes
    };
    
    setResults([newResult, ...results]);
    toast.success('Result added successfully');
    
    // Reset form
    setClientName('');
    setUrl('');
    setKeywordRelevance(70);
    setReadability(70);
    setSnippetOptimization(70);
    setStructuredData(70);
    setNotes('');
  };
  
  const handleDelete = (id: string) => {
    setResults(results.filter(result => result.id !== id));
    toast.success('Result deleted successfully');
  };
  
  const handleGenerateReport = (result: AEOResult) => {
    toast.success(`Generating report for ${result.clientName}`);
    // In a real app, this would generate and download a PDF
  };
  
  const filteredResults = results.filter(result => 
    result.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-lg text-gray-900">AEO <span className="text-aeo">Admin Dashboard</span></h1>
              <p className="text-gray-600">Manage client AEO results and generate reports</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
              <div className="aeo-card p-6 sticky top-4">
                <div className="flex items-center mb-4">
                  <Plus className="h-5 w-5 text-aeo mr-2" />
                  <h2 className="text-xl font-semibold">Add New Result</h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clientName" className="text-sm font-medium">
                        Client Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter client name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="url" className="text-sm font-medium">
                        URL <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="keywordRelevance" className="text-sm font-medium">
                        Keyword Relevance Score: {keywordRelevance}
                      </Label>
                      <Slider
                        id="keywordRelevance"
                        value={[keywordRelevance]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setKeywordRelevance(value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="readability" className="text-sm font-medium">
                        Readability Score: {readability}
                      </Label>
                      <Slider
                        id="readability"
                        value={[readability]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setReadability(value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="snippetOptimization" className="text-sm font-medium">
                        Snippet Optimization Score: {snippetOptimization}
                      </Label>
                      <Slider
                        id="snippetOptimization"
                        value={[snippetOptimization]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setSnippetOptimization(value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="structuredData" className="text-sm font-medium">
                        Structured Data Score: {structuredData}
                      </Label>
                      <Slider
                        id="structuredData"
                        value={[structuredData]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setStructuredData(value[0])}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <Label htmlFor="notes" className="text-sm font-medium">
                          Notes
                        </Label>
                        <span className="text-sm text-gray-500">
                          Final Score: {calculateFinalScore({ keywordRelevance, readability, snippetOptimization, structuredData })}
                        </span>
                      </div>
                      <Textarea 
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any additional notes or recommendations..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-aeo hover:bg-aeo-600">
                      <Save className="mr-2 h-4 w-4" /> Save Result
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <div className="aeo-card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold">Saved Results</h2>
                  
                  <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search clients or URLs..."
                      className="pl-9 w-full sm:w-64"
                    />
                  </div>
                </div>
                
                {filteredResults.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No results found</h3>
                    <p className="text-gray-500">
                      {searchQuery ? 'Try a different search term' : 'Add your first AEO result'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredResults.map((result) => (
                      <div key={result.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{result.clientName}</h3>
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-gray-500 hover:text-aeo flex items-center"
                            >
                              {result.url.length > 40 ? result.url.substring(0, 40) + '...' : result.url}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                          <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                            {result.date}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Keyword Relevance</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-aeo-500 h-2 rounded-full" 
                                  style={{ width: `${result.keywordRelevance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{result.keywordRelevance}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Readability</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-aeo-500 h-2 rounded-full" 
                                  style={{ width: `${result.readability}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{result.readability}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Snippet Opt.</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-aeo-500 h-2 rounded-full" 
                                  style={{ width: `${result.snippetOptimization}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{result.snippetOptimization}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Structured Data</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-aeo-500 h-2 rounded-full" 
                                  style={{ width: `${result.structuredData}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{result.structuredData}</span>
                            </div>
                          </div>
                        </div>
                        
                        {result.notes && (
                          <>
                            <Separator className="my-3" />
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Notes:</span> {result.notes}
                            </div>
                          </>
                        )}
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <div className="text-lg font-bold mr-1">
                              {calculateFinalScore(result)}
                            </div>
                            <div className="text-sm text-gray-500">/100</div>
                            <div className="ml-2 text-sm">Final Score</div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGenerateReport(result)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Report
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDelete(result.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AEOAdminPage;
