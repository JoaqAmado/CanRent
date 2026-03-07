import { useState, useMemo } from "react";
import { useSaved } from "../../context/SavedContext.jsx";
import { mockProperties } from "../../data/mockProperties.js";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
    const { addSaved, isSaved } = useSaved();
    
    // Filter States
    const [location, setLocation] = useState("");
    const [maxPrice, setMaxPrice] = useState(5000);
    const [minSize, setMinSize] = useState(0);
    const [minReview, setMinReview] = useState(0);

    // Derived State for Filtered Properties
    const filteredProperties = useMemo(() => {
        return mockProperties.filter(prop => {
            const matchesLocation = prop.location.toLowerCase().includes(location.toLowerCase());
            const matchesPrice = prop.price <= maxPrice;
            const matchesSize = prop.size >= minSize;
            const matchesReview = prop.review >= minReview;
            return matchesLocation && matchesPrice && matchesSize && matchesReview;
        });
    }, [location, maxPrice, minSize, minReview]);

    const handleSaveToggle = (e, prop) => {
        e.preventDefault(); // Prevent navigating if this is inside a Link
        e.stopPropagation();
        if (!isSaved(prop.id)) {
            addSaved(prop);
        }
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h2>Browse Properties</h2>
                <p>Find the perfect match for your lifestyle and budget.</p>
            </div>

            <div className="search-layout">
                {/* Filters Pane */}
                <aside className="filters-pane glass">
                    <h3>Filters</h3>
                    
                    <div className="filter-group">
                        <label htmlFor="location">Location</label>
                        <input 
                            type="text" 
                            id="location" 
                            placeholder="e.g. Toronto"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="price">Max Price: ${maxPrice}</label>
                        <input 
                            type="range" 
                            id="price" 
                            min="500" 
                            max="5000" 
                            step="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="filter-slider"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="size">Min Size (sqft)</label>
                        <input 
                            type="number" 
                            id="size" 
                            min="0" 
                            placeholder="0"
                            value={minSize}
                            onChange={(e) => setMinSize(Number(e.target.value))}
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="review">Ratings</label>
                        <select 
                            id="review"
                            value={minReview}
                            onChange={(e) => setMinReview(Number(e.target.value))}
                            className="filter-select"
                        >
                            <option value="0">Any Rating</option>
                            <option value="3">3+ Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="4.5">4.5+ Stars</option>
                        </select>
                    </div>

                    <button 
                        className="btn btn-outline reset-btn"
                        onClick={() => {
                            setLocation("");
                            setMaxPrice(5000);
                            setMinSize(0);
                            setMinReview(0);
                        }}
                    >
                        Reset Filters
                    </button>
                </aside>

                {/* Results Grid */}
                <main className="results-pane">
                    <div className="results-info">
                        Showing {filteredProperties.length} properties
                    </div>
                    
                    {filteredProperties.length === 0 ? (
                        <div className="no-results glass">
                            <h3>No properties found</h3>
                            <p>Try adjusting your search filters.</p>
                        </div>
                    ) : (
                        <div className="property-grid">
                            {filteredProperties.map((prop) => (
                                <Link to={`/property/${prop.id}`} key={prop.id} className="property-card">
                                    <div className="card-image-wrapper">
                                        <img src={prop.imageUrl} alt={prop.title} className="card-img" />
                                        <div className="card-badges">
                                            <span className="badge review-badge">★ {prop.review}</span>
                                        </div>
                                        <button 
                                            className={`save-btn ${isSaved(prop.id) ? 'saved' : ''}`}
                                            onClick={(e) => handleSaveToggle(e, prop)}
                                            disabled={isSaved(prop.id)}
                                            aria-label="Save property"
                                        >
                                            {isSaved(prop.id) ? '♥ Saved' : '♡ Save'}
                                        </button>
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">{prop.title}</h3>
                                        <p className="card-location">📍 {prop.location}</p>
                                        <div className="card-details">
                                            <span>{prop.bedrooms} Bed</span>
                                            <span>•</span>
                                            <span>{prop.bathrooms} Bath</span>
                                            <span>•</span>
                                            <span>{prop.size} sqft</span>
                                        </div>
                                        <div className="card-footer">
                                            <span className="card-price">${prop.price} <span>/mo</span></span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Search;