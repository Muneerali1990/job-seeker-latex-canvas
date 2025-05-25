
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";

// Create a component to dynamically apply layout classes based on the route
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // Apply full-window layout for /editor, constrained layout for other routes
  const layoutClass = location.pathname === "/editor" 
    ? "w-full h-screen flex flex-col" 
    : "w-full h-screen flex flex-col";

  return <div className={layoutClass}>{children}</div>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/editor" element={<Editor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
