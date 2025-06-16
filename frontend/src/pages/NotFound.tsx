import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Bot, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-gradient-from to-gradient-to mb-6">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl font-semibold text-foreground mb-2">
            Page not found
          </p>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-gradient-from to-gradient-to hover:from-gradient-from/90 hover:to-gradient-to/90"
        >
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
