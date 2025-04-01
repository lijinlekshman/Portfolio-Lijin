import SliderContent from "./Slider-Content/Slider-Content/SliderContent";
import AboutMe from "./About/AboutMe";
import MyExpertise from "./My-Expertise/MyExpertise";

function Content() {
  return (
    <div className="container-Fluid position-relative">
      <SliderContent />
      <AboutMe></AboutMe>
      <MyExpertise></MyExpertise>
    </div>
  );
}

export default Content;
