import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function SliderContent() {
  const handleWhatappRedirect = () => {
    window.open("https://api.whatsapp.com/send?phone=918592907915", "_blank");
  };

  const handleLinkedinRedirect = () => {
    window.open("https://www.linkedin.com/in/lijinlekshman/", "_blank");
  };

  return (
    <>
      <div className="name-bgAnimation">
        <div className="anim-child">L</div>
        <div className="anim-child1">I</div>
        <div className="anim-child2">J</div>
        <div className="anim-child3">I</div>
        <div className="anim-child">N</div>
      </div>
      <div className="content-conatiner">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-6 col-12">
              <div className="hello-me">
                <span className="into-wel">
                  <span></span>
                  Hello, I'm
                  <FontAwesomeIcon icon={["fas", "hand-peace"]} />
                </span>
                <h1>Lijin</h1>
                <h2>Lekshman</h2>
                <p>Senior UI UX Developer | Kerala, India</p>
                <div className="say-hi">
                  <span className="say-hiBtn">
                    <a
                      href="mailto:lijinlekshman@571gmail.com"
                      className="btn btn-cstm"
                      target="_blank"
                    >
                      Say Hi
                      <FontAwesomeIcon icon={["fas", "arrow-up"]} />
                    </a>
                  </span>

                  <span className="res-down">
                    <a
                      href="Images\Resume\LijinLekshman_UI-UX-Developer.pdf"
                      className="btn btn-cstm"
                      target="_blank"
                      download={true}
                    >
                      Quick Look
                      <FontAwesomeIcon icon={["fas", "arrow-up"]} />
                    </a>
                  </span>
                </div>
                <div className="social-media">
                  <a onClick={handleWhatappRedirect} role="button">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>

                  <a onClick={handleLinkedinRedirect} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6 col-12 pos-rel">
              <div className="My-pic">
                <img src="Images/Image.jfif" alt="Lijin Lekshman" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderContent;
