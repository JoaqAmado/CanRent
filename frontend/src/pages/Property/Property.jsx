import { useParams, Link } from "react-router-dom";
import { useSaved } from "../../context/SavedContext.jsx";
import { mockProperties } from "../../data/mockProperties.js";
import "./Property.css";

function Property() {
    const { id } = useParams();
    const { addSaved, removeSaved, isSaved } = useSaved();
    
    // Find the property from mock data based on the route ID
    const property = mockProperties.find(p => p.id === id);

    if (!property) {
        return (
            <div className="property-not-found">
                <h2>Property Not Found</h2>
                <p>We couldn't find the listing you're looking for.</p>
                <Link to="/search" className="btn btn-primary mt-4">Return to Search</Link>
            </div>
        );
    }

    const saved = isSaved(property.id);

    const handleSaveToggle = () => {
        if (saved) {
            removeSaved(property.id);
        } else {
            addSaved(property);
        }
    };

    return (
        <div className="property-page">
            <div className="property-breadcrumb">
                <Link to="/search">← Back to Search</Link>
            </div>

            <main className="property-main">
                <div className="property-gallery">
                    <img src={property.imageUrl} alt={property.title} className="main-image" />
                    <div className="gallery-thumbnails">
                        {/* Placeholder thumbnails for aesthetics */}
                        <img src={property.imageUrl} alt="Thumbnail 1" className="thumbnail active" />
                        <img src={property.imageUrl} alt="Thumbnail 2" className="thumbnail" />
                        <img src={property.imageUrl} alt="Thumbnail 3" className="thumbnail" />
                    </div>
                </div>

                <div className="property-info glass">
                    <div className="info-header">
                        <div>
                            <div className="feature-tags">
                                <span className="tag">For Rent</span>
                                <span className="tag review-tag">★ {property.review}</span>
                            </div>
                            <h1 className="property-title">{property.title}</h1>
                            <p className="property-location">📍 {property.location}</p>
                        </div>
                        <div className="price-section">
                            <span className="price-value">${property.price}</span>
                            <span className="price-period">/ month</span>
                        </div>
                    </div>

                    <div className="property-specs">
                        <div className="spec-item">
                            <span className="spec-label">Bedrooms</span>
                            <span className="spec-value">{property.bedrooms}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Bathrooms</span>
                            <span className="spec-value">{property.bathrooms}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Size</span>
                            <span className="spec-value">{property.size} sqft</span>
                        </div>
                    </div>

                    <div className="property-description">
                        <h3>About this home</h3>
                        <p>
                            Experience the best of {property.location} living in this beautiful {property.title}. 
                            This property offers a perfect blend of comfort and style, featuring modern amenities 
                            and a prime location. Enjoy spacious interiors, natural light, and everything you need 
                            to make this your next home.
                        </p>
                    </div>

                    <div className="property-features">
                        <h3>Amenities & Features</h3>
                        <ul className="features-grid">
                            {property.features.map((feature, index) => (
                                <li key={index} className="feature-item">✓ {feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="property-actions">
                        <button 
                            className={`btn btn-large ${saved ? 'btn-outline saved-state' : 'btn-primary'}`}
                            onClick={handleSaveToggle}
                        >
                            {saved ? '♥ Saved to Favorites' : '♡ Save Property'}
                        </button>
                        <button className="btn btn-large btn-outline">
                            Contact Agent
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Property;