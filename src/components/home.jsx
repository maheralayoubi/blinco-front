import React, { useState } from 'react';
import './styles/home.scss';

function Home() {
    const [showLookingForInput, setShowLookingForInput] = useState(false);
    const [showICanDoInput, setShowICanDoInput] = useState(false);
    const [lookingForText, setLookingForText] = useState('');
    const [iCanDoText, setICanDoText] = useState('');
    const [matchingPrompts, setMatchingPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLookingForClick = () => {
        setShowLookingForInput(true);
        setShowICanDoInput(false);
        setMatchingPrompts([]);
    };

    const handleICanDoClick = () => {
        setShowICanDoInput(true);
        setShowLookingForInput(false);
        setMatchingPrompts([]);
    };

    const handleBackClick = () => {
        setShowLookingForInput(false);
        setShowICanDoInput(false);
        setLookingForText('');
        setICanDoText('');
        setMatchingPrompts([]);
    };

    const handleSubmit = async () => {
        const content = showLookingForInput ? lookingForText : iCanDoText;
        const type = showLookingForInput ? "company" : "worker";

        setIsLoading(true);
        try {
            const response = await fetch("https://api.hayamachi.com/prompts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content, type })
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }
            const result = await response.json();
            console.log("Response from API:", result);
            setMatchingPrompts(result.matching_prompts || []);
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting your data.");
        } finally {
            setIsLoading(false);
        }
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
                    <textarea
                        id="lookingFor"
                        value={lookingForText}
                        onChange={(e) => setLookingForText(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="button-container">
                        <button 
                            type="button" 
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button 
                            onClick={handleBackClick}
                            disabled={isLoading}
                            className="back-button"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {showICanDoInput && (
                <div className="input-group">
                    <label htmlFor="iCanDo">What can you do</label>
                    <textarea
                        id="iCanDo"
                        value={iCanDoText}
                        onChange={(e) => setICanDoText(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="button-container">
                        <button 
                            type="button" 
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button 
                            onClick={handleBackClick}
                            disabled={isLoading}
                            className="back-button"
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {matchingPrompts.length > 0 && (
                <div className="matching-prompts">
                    <h3>Matching Prompts</h3>
                    <div className="matching-list">
                        {matchingPrompts.map((match, index) => (
                            <div key={index} className="match-item">
                                <div className="match-content">{match.content}</div>
                                <div className="match-score">
                                    Match Score: {(match.score * 100).toFixed(2)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;