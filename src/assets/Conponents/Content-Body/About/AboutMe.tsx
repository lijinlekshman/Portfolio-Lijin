function AboutMe() {
  return (
    <section className="about-meWrpr ">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 text-center">
            <h2 className="px-2 py-2">
              <p className="section-separartor">
                <span></span>
                About Me
                <span></span>
              </p>
            </h2>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-5 col-12 text-center">
            <img
              src="Images/portfolio-about.webp"
              alt="UI-Developer"
              className="img-fluid img-cursorMove"
              title="Don't Touch Me! "
            />
          </div>

          <div className="col-md-12 col-lg-7 col-sm-12 col-12">
            <div className="about-me">
              <p>
                I'm a <strong>Senior UI UX Developer</strong> from Kerala,
                India. I have rich experience in web site design and building,
                also I am good at responsive design. I love to talk with you
                about our unique.
              </p>
              <div className="about-meBG">
                <div className="details">
                  <ul>
                    <li>
                      Name : <strong>Lijin Lekshman</strong>
                    </li>
                    <li>
                      Designation : <strong>Senior UI UX Developer.</strong>
                    </li>
                    <li>
                      Experience : <strong> 7+ Years</strong>
                    </li>
                    <li>
                      Current Company :{" "}
                      <strong>Zerone Consulting Pvt Ltd</strong>
                    </li>
                    <li>
                      Current Place : <strong>Kochi, Kerala, India</strong>
                    </li>
                    <li>
                      Mail Id : <strong>lijinlekshman571@gmail.com</strong>
                    </li>
                    <li>
                      Contact : <strong>+91 8592907915, +91 7907348988</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
