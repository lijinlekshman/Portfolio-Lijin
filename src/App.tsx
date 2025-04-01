import { useState, useEffect } from "react";
import Index from "./assets/Conponents/Index";
import LandingPage from "./assets/Conponents/Landing-page/LandingPage";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowRight" ||
        (event.key === "Enter" && showLanding)
      ) {
        triggerTransition(false);
      } else if (
        (event.key === "ArrowLeft" || event.key === "Enter") &&
        !showLanding
      ) {
        triggerTransition(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    };

    const handleSwipeGesture = () => {
      const swipeDistance = touchEndX - touchStartX;

      if (swipeDistance < -50 && showLanding) {
        // Swipe Left = Next
        triggerTransition(false);
      } else if (swipeDistance > 50 && !showLanding) {
        // Swipe Right = Back
        triggerTransition(true);
      }
    };

    const triggerTransition = (goToLanding: boolean) => {
      if (goToLanding) {
        setFadeOut(false);
        setShowLanding(true);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          setShowLanding(false);
          setFadeOut(false);
        }, 1000);
      }
    };

    // Add both key and touch event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [showLanding]);

  return (
    <div>
      {showLanding ? (
        <div className={`fade-wrapper ${fadeOut ? "fade-out" : "fade-in"}`}>
          <LandingPage></LandingPage>
        </div>
      ) : (
        <Index />
      )}
    </div>
  );
}

export default App;
