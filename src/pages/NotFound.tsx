import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Wayfinding: a dead end should still answer "where am I" and "how do I get
 * out". One obvious exit, no decoration.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="type-eyebrow mb-4 text-subtle">Error 404</p>
        <h1 className="type-title text-foreground">This page doesn&rsquo;t exist</h1>
        <p className="type-body mt-4 text-muted-foreground">
          The link may be outdated, or the address slightly off.
        </p>
        <Button asChild className="mt-8">
          <a href="/">Back to home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
