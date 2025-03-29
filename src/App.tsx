
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AEOServicePage />} />
          <Route path="/aeo" element={<AEOServicePage />} />
          <Route path="/aeo/analyze" element={<AEOAnalyzePage />} />
          <Route path="/aeo/admin" element={<AEOAdminPage />} />
          <Route path="/aeo/learning" element={<LearningCenterPage />} />
          <Route path="/aeo/guide" element={<AEOGuidePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
