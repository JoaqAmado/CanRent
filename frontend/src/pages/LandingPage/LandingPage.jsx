import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span>Find Your Next</span>
                        <span className="highlight"> Perfect Home</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover the best rental properties across Canada. Premium listings, transparent pricing, and effortless search—all in one place.
                    </p>
                    <div className="hero-actions">
                        <Link to="/search" className="btn btn-primary btn-large">
                            Start Browsing
                        </Link>
                        <Link to="/search" className="btn btn-outline btn-large">
                            Explore Locations
                        </Link>
                    </div>
                </div>
                
                <div className="hero-image-container">
                    {/* Placeholder for an aesthetic property image */}
                    <div className="hero-mock-image glass">
                        <img 
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" 
                            alt="Luxury modern home" 
                            className="hero-img"
                        />
                        <div className="floating-card glass property-highlight">
                            <div className="highlight-content">
                                <span className="highlight-tag">New Listing</span>
                                <h4>Modern Apartment</h4>
                                <p>$2,500 / month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="features">
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Smart Search</h3>
                    <p>Filter by location, price, and amenities to find exactly what you need.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⭐</div>
                    <h3>Verified Ratings</h3>
                    <p>Trust our community reviews to make the best living decisions.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">❤️</div>
                    <h3>Save & Compare</h3>
                    <p>Keep track of your favorites and compare features side-by-side.</p>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;