import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const MadeWithDyad = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the appropriate logo based on theme
  const getCurrentLogo = () => {
    if (!mounted) return "/placeholder.svg"; // Default logo during SSR
    
    const currentTheme = resolvedTheme || theme;
    return currentTheme === "dark" 
      ? "/placeholder.svg" // Dark mode logo
      : "/logo-dark.png"; // Light mode logo (you'll need to add this)
  };

  return (
    <div className="p-4 text-center">
      <a
        
      >
        <img
          src={getCurrentLogo()}
          alt="Made with love by Ameya"
          className="h-16 w-auto mx-auto transition-opacity duration-300"
        />
      </a>
    </div>
  );
};
