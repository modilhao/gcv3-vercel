import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { setupKeyboardNavDetection } from "@/lib/accessibility";
import BackToTopButton from "@/components/BackToTopButton";
import SkipNavLink from "@/components/SkipNavLink";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Inicializa a detecção de navegação por teclado para melhorar acessibilidade
  useEffect(() => {
    const cleanup = setupKeyboardNavDetection();
    return cleanup;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SkipNavLink targetId="main-content" />
        <Toaster />
        <Router />
        <BackToTopButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
