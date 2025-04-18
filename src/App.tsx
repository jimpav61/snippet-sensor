
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AEOServicePage from "./pages/AEOServicePage";
import AEOAnalyzePage from "./pages/AEOAnalyzePage";
import AEOAdminPage from "./pages/AEOAdminPage";
import DashboardPage from "./pages/DashboardPage";
import LearningCenterPage from "./pages/LearningCenterPage";
import AEOGuidePage from "./pages/AEOGuidePage";
import AEOLearnMorePage from "./pages/AEOLearnMorePage";
import ArticlesPage from "./pages/ArticlesPage";
import GuidesPage from "./pages/GuidesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ToolsPage from "./pages/ToolsPage";
import ArticlePage from "./pages/ArticlePage";
import GuidePage from "./pages/GuidePage";
import ToolPage from "./pages/ToolPage";
import AEOContactPage from "./pages/AEOContactPage";
import AnalyticsDashboardPage from "./pages/AnalyticsDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aeo" element={<AEOServicePage />} />
          <Route path="/aeo/analyze" element={<AEOAnalyzePage />} />
          <Route path="/aeo/admin" element={<AEOAdminPage />} />
          <Route path="/aeo/learn-more" element={<AEOLearnMorePage />} />
          <Route path="/aeo/learning" element={<LearningCenterPage />} />
          <Route path="/aeo/learning/articles" element={<ArticlesPage />} />
          <Route path="/aeo/learning/article/:slug" element={<ArticlePage />} />
          <Route path="/aeo/learning/guides" element={<GuidesPage />} />
          <Route path="/aeo/learning/guide/:slug" element={<GuidePage />} />
          <Route path="/aeo/learning/case-studies" element={<CaseStudiesPage />} />
          <Route path="/aeo/learning/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="/aeo/learning/tools" element={<ToolsPage />} />
          <Route path="/aeo/learning/tools/:slug" element={<ToolPage />} />
          <Route path="/aeo/guide" element={<AEOGuidePage />} />
          <Route path="/aeo/contact" element={<AEOContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
