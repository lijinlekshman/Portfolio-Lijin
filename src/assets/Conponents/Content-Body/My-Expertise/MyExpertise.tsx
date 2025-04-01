import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyExpertise() {
  return (
    <section className="my-expertise">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center">
            <h2 className="px-2 py-2">
              <p className="section-separartor">
                <span></span>
                My Expertise
                <span></span>
              </p>
            </h2>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-12">
            <div className="expertise-tile">
              <label></label>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-12">
            <div className="skills">
              <div className="skill-label">
                <FontAwesomeIcon icon={["fab", "html5"]} />
                HTML 5
              </div>
              <div className="skill-legend">
                <ul>
                  <li className="levels"></li>
                  <li className="levels"></li>
                  <li className="levels"></li>
                  <li className="levels"></li>
                  <li className="levels"></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-12"></div>
          <div className="col-md-4 col-lg-4 col-12"></div>
        </div>
      </div>
    </section>
  );
}

export default MyExpertise;
