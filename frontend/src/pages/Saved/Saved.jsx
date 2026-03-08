import { useState } from "react";
import { useSaved } from "../../context/SavedContext.jsx";
import { Link } from "react-router-dom";
import saved from "../../assets/Bookmarks.png"
import "./Saved.css";

function Saved() {
    const { savedProperties, removeSaved } = useSaved();
    const [compareMode, setCompareMode] = useState(false);
    
    // Track properties specifically selected for comparison
    const [compareList, setCompareList] = useState([]);

    const toggleCompareMode = () => {
        if (!compareMode) {
            // When entering compare mode, start with all saved properties
            setCompareList(savedProperties);
        }
        setCompareMode(!compareMode);
    };

    const handleRemoveSaved = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        removeSaved(id);
        // Also remove from compare list if it's there
        setCompareList(prev => prev.filter(p => p.id !== id));
    };

    const handleRemoveFromCompare = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setCompareList(prev => prev.filter(p => p.id !== id));
        
        // If 0 or 1 items left in compare list, exit compare mode
        if (compareList.length <= 2) {
            setCompareMode(false);
        }
    };

    return (
        <div className="saved-page">
            <div className="saved-header">
                <div>
                    <h2 className="saved-properties">Your Saved Properties</h2>
                    <img src={saved} className="bookmarks"></img>
                    <p>You have {savedProperties.length} properties saved for later.</p>
                </div>
                {savedProperties.length > 1 && (
                    <button 
                        className={`btn ${compareMode ? 'btn-primary' : 'btn-outline'} compare-toggle-btn`}
                        onClick={toggleCompareMode}
                    >
                        {compareMode ? 'Exit Compare Mode' : 'Compare Properties'}
                    </button>
                )}
            </div>

            {savedProperties.length === 0 ? (
                <div className="empty-state glass">
                    <div className="empty-icon">🏠</div>
                    <h3>No saved properties yet</h3>
                    <p>Start browsing to find your next perfect home.</p>
                    <Link to="/search" className="btn btn-primary mt-4">
                        Browse Properties
                    </Link>
                </div>
            ) : (
                <>
                    {/* Standard Grid View */}
                    {!compareMode && (
                        <div className="property-grid animate-fade-in">
                            {savedProperties.map((prop) => (
                                <Link to={`/property/${prop.id}`} key={prop.id} className="property-card">
                                    <div className="card-image-wrapper">
                                        <img src={prop.imageUrl} alt={prop.title} className="card-img" />
                                        <div className="card-actions" style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 2 }}>
                                            <a 
                                                href={prop.originalLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn-icon ext-link-btn"
                                                onClick={(e) => e.stopPropagation()}
                                                title="View original posting"
                                            >
                                                ↗
                                            </a>
                                            <button 
                                                className="remove-btn"
                                                style={{ position: 'static' }}
                                                onClick={(e) => handleRemoveSaved(e, prop.id)}
                                                aria-label="Remove property"
                                            >
                                                ✕
                                            </button>
                                        </div>
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

                    {/* Compare View Mode */}
                    {compareMode && (
                        <div className="compare-container animate-fade-in glass">
                            <div className="table-responsive">
                                <table className="compare-table">
                                    <thead>
                                        <tr>
                                            <th>Feature</th>
                                            {compareList.map(prop => (
                                                <th key={`header-${prop.id}`}>
                                                    <div className="compare-header-card">
                                                        <button 
                                                            className="compare-remove"
                                                            onClick={(e) => handleRemoveFromCompare(e, prop.id)}
                                                            title="Remove from comparison"
                                                        >✕</button>
                                                        <img src={prop.imageUrl} alt={prop.title} className="compare-img" />
                                                        <h4>{prop.title}</h4>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="feature-label">Price</td>
                                            {compareList.map(prop => (
                                                <td key={`price-${prop.id}`} className="price-cell">
                                                    ${prop.price} <span className="text-sm">/mo</span>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Location</td>
                                            {compareList.map(prop => (
                                                <td key={`loc-${prop.id}`}>{prop.location}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Size</td>
                                            {compareList.map(prop => (
                                                <td key={`size-${prop.id}`}>{prop.size} sqft</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Bedrooms</td>
                                            {compareList.map(prop => (
                                                <td key={`bed-${prop.id}`}>{prop.bedrooms}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Bathrooms</td>
                                            {compareList.map(prop => (
                                                <td key={`bath-${prop.id}`}>{prop.bathrooms}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Review</td>
                                            {compareList.map(prop => (
                                                <td key={`rev-${prop.id}`}>
                                                    <span className="review-tag">★ {prop.review}</span>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Amenities</td>
                                            {compareList.map(prop => (
                                                <td key={`feat-${prop.id}`}>
                                                    <ul className="feature-list">
                                                        {prop.features.map((f, i) => (
                                                            <li key={i}>{f}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="feature-label">Action</td>
                                            {compareList.map(prop => (
                                                <td key={`act-${prop.id}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                    <Link to={`/property/${prop.id}`} className="btn btn-primary btn-sm block-btn">
                                                        View Details
                                                    </Link>
                                                    <a 
                                                        href={prop.originalLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="btn btn-outline btn-sm block-btn"
                                                    >
                                                        Original Link ↗
                                                    </a>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Saved;
