import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="animate-fade-in duration-500">
      {/* Hero Header */}
      <section className="contact-hero">
        <h1 className="contact-title">Reach Out.</h1>
        <p className="contact-subtitle">
          "We are here to fulfill your every desire. Let us know how we can assist you."
        </p>
      </section>

      {/* Main Content */}
      <section className="contact-container">
        <div className="contact-grid">
          {/* Details & Map */}
          <div className="contact-info-section">
            <div className="contact-details">
              <div className="detail-block">
                <span className="label-micro">The Location</span>
                <p className="detail-text">Marina d'Agadir, 80000<br />Agadir, Morocco</p>
              </div>
              <div className="detail-block">
                <span className="label-micro">Direct Line</span>
                <p className="detail-text">+212 5 28 84 00 00</p>
              </div>
              <div className="detail-block">
                <span className="label-micro">Electronic Mail</span>
                <p className="detail-text">concierge@mariella.com</p>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="contact-map-wrapper">
              <div className="map-placeholder">
                <div className="map-pin"></div>
                <span className="map-text">Interactive Map Placeholder</span>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Agadir Map view" 
                  className="map-bg-img"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2 className="form-heading">Send a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  placeholder="name@exclusive.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  className="form-input"
                  placeholder="Inquiry subject"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  className="form-input"
                  rows="4"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full mt-4">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
