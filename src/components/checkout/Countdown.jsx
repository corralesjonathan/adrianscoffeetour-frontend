import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Countdown component for tracking reservation time limits
 * 
 * This component provides a visual countdown timer that can be configured
 * with different durations and behaviors.
 * 
 * @component
 */
export function Countdown({
  initialSeconds = 600,  // Default: 10 minutes
  onExpire = () => {},   // Default: empty function
  showIcon = true,       // Whether to show clock icon
  className = "",        // Additional CSS classes
  iconClassName = "",    // Additional CSS classes for the icon
  textClassName = "",    // Additional CSS classes for the text
  titleClassName = "",   // Additional CSS classes for the title
  showTitle = true,      // Whether to show 'Time Remaining' title
  showProgressBar = false, // Whether to show progress bar
  progressBarClassName = "", // Additional CSS classes for the progress bar
  expireRedirectPath = null, // Optional redirect path when timer expires
  showMinutesSeconds = true // Whether to show time in MM:SS format or just seconds
}) {
  // State to track remaining seconds
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  
  // Reference to store the interval ID for cleanup
  const timerRef = useRef(null);
  
  // Format the time remaining into minutes and seconds
  const formatTime = (seconds) => {
    if (!showMinutesSeconds) {
      return seconds.toString();
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Ensure two digits for both minutes and seconds
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Effect for handling the timer - no pause when tab is not visible
  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // When timer reaches zero
          clearInterval(timerRef.current);
          
          // Execute the callback function
          onExpire();
          
          // Handle redirect if path is provided
          if (expireRedirectPath) {
            window.location.href = expireRedirectPath;
          }
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup function to remove interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [onExpire, expireRedirectPath]);

  // Reset timer to initial value
  const resetTimer = () => {
    // Clear existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset state to initial value
    setTimeRemaining(initialSeconds);
  };

  // Calculate colors based on remaining time
  const getTimerColor = () => {
    const percentRemaining = (timeRemaining / initialSeconds) * 100;
    
    if (percentRemaining <= 20) {
      return "text-red-600"; // Red when less than 20% time remains
    } else if (percentRemaining <= 50) {
      return "text-orange-500"; // Orange when less than 50% time remains
    } else {
      return "text-green-600"; // Green when more than 50% time remains
    }
  };
  
  // Get the background color for the progress bar
  const getProgressBarColor = () => {
    const percentRemaining = (timeRemaining / initialSeconds) * 100;
    
    if (percentRemaining <= 20) {
      return "bg-red-600"; // Red when less than 20% time remains
    } else if (percentRemaining <= 50) {
      return "bg-orange-500"; // Orange when less than 50% time remains
    } else {
      return "bg-green-600"; // Green when more than 50% time remains
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        {showIcon && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-8 w-8 ${getTimerColor()} ${iconClassName}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
        {showTitle && (
          <p className={`text-lg font-medium ${titleClassName}`}>
            Time Remaining: 
          </p>
        )}
        <span className={`text-2xl font-semibold ${getTimerColor()} ${textClassName}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>
      
      {showProgressBar && (
        <div className={`w-[80%] bg-gray-200 h-[4px] rounded-full overflow-hidden ${progressBarClassName}`}>
          <div 
            className={`${getProgressBarColor()} h-full transition-all duration-1000 ease-linear`} 
            style={{ width: `${(timeRemaining / initialSeconds) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

// Define prop types for documentation and type checking
Countdown.propTypes = {
  initialSeconds: PropTypes.number,      // Initial time in seconds
  onExpire: PropTypes.func,             // Callback when timer expires
  showIcon: PropTypes.bool,             // Whether to show the clock icon
  className: PropTypes.string,          // Additional classes for container
  iconClassName: PropTypes.string,      // Additional classes for icon
  textClassName: PropTypes.string,      // Additional classes for text
  titleClassName: PropTypes.string,     // Additional classes for title
  showTitle: PropTypes.bool,            // Whether to show the 'Time Remaining' title
  showProgressBar: PropTypes.bool,      // Whether to show the progress bar
  progressBarClassName: PropTypes.string, // Additional classes for progress bar
  expireRedirectPath: PropTypes.string, // Path to redirect when timer expires
  showMinutesSeconds: PropTypes.bool    // Show as MM:SS or just seconds
};

export default Countdown;
