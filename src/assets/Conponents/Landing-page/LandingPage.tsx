import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import AnimeCursor from "../Animation-Cursor/AnimeCursor";

function LandingPage() {
  const onLoadBox = useRef(null);
  // const tl = gsap.timeline({paused:true});

  useGSAP(() => {
    gsap.from(onLoadBox.current, {
      x: 120,
      y: 0,
      duration: 6,
      ease: "power1.out",
      scale: 0.9,
      rotation: 0,
      repeat: -1,
      yoyo: true,
    });
    gsap.to(onLoadBox.current, {
      x: 500,
      y: 0,
      duration: 6,
      ease: "power1.out",
      scale: 0.5,
      rotation: 360,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleMouswEnter = () => {
    gsap.to(onLoadBox.current, {
      x: 100,
      y: 0,
      rotation: 0,
      scale: 0.5,
      duration: 4,
      ease: "power1.out",
      yoyo: true,
    });
  };

  return (
    <div className="landing-pageWrpr relative w-full h-screen">
      <div className="landing-pageContainer cstm-bgIMG">
        <div className="land-animationWrpr" id="anime1">
          <div className="enter-button">
            <img
              src="Images/UI-Dvpr-logo.webp"
              className="img-fluid"
              ref={onLoadBox}
              alt="Image"
              height="100%"
              onMouseEnter={handleMouswEnter}
              // onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
        <div className="Welcome-video">
          <video
            src="Video/intro-video.mp4"
            autoPlay
            loop
            playsInline
            controls
            muted
          />
        </div>
      </div>

      <div className="warning-message">
        Please use the <span className="text-white">'Enter'</span> key or the
        <span className="text-white">
          {" "}
          Right arrow key/{" "}
          <span className="swipe-inMobile">
            (<strong>'Swipe'</strong> to Load Next Page)
          </span>{" "}
          '
          <FontAwesomeIcon icon={faArrowRight} />' to
        </span>
        <strong> move Forward</strong>.
      </div>
      <AnimeCursor></AnimeCursor>
    </div>
  );
}

export default LandingPage;
