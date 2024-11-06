
import React, { useState } from 'react';
import './styles/home.scss';

function Home() {
    const [showLookingForInput, setShowLookingForInput] = useState(false);
    const [showICanDoInput, setShowICanDoInput] = useState(false);

    const handleLookingForClick = () => {
        setShowLookingForInput(true);
        setShowICanDoInput(false);
    };

    const handleICanDoClick = () => {
        setShowICanDoInput(true);
        setShowLookingForInput(false);
    };

    const handleBackClick = () => {
        window.location.reload();
    };

    return (
        <div className="home">
            {!showLookingForInput && !showICanDoInput && (
                <div className="button-group">
                    <button onClick={handleLookingForClick} className="button">
                        Looking for
                    </button>
                    <button onClick={handleICanDoClick} className="button">
                        I can do
                    </button>
                </div>
            )}

            {showLookingForInput && (
                <div className="input-group">
                    <label htmlFor="lookingFor">What are you looking for</label>
                    <input type="text" id="lookingFor" />
                    <button type="submit">Submit</button>
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>
            )}

            {showICanDoInput && (
                <div className="input-group">
                    <label htmlFor="iCanDo">What can you do</label>
                    <input type="text" id="iCanDo" />
                    <button type="submit">Submit</button>
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>
            )}
        </div>
    );
}

export default Home;
