import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Darwfit</h1>
              <p className="text-muted-foreground">منصة اللياقة والتغذية العربية</p>
              <p className="text-sm text-muted-foreground mt-2">قريباً...</p>
            </div>
          </div>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
