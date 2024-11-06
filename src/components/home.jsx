import React, { useState } from 'react';
import './styles/home.scss';

function Home() {
    const [showLookingForInput, setShowLookingForInput] = useState(false);
    const [showICanDoInput, setShowICanDoInput] = useState(false);
    const [lookingForText, setLookingForText] = useState('');
    const [iCanDoText, setICanDoText] = useState('');

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

    const handleSubmit = async () => {
        const content = showLookingForInput ? lookingForText : iCanDoText;

        try {
            const response = await fetch("http://43.207.87.73:8000/prompts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content })
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }
            const result = await response.json();
            console.log("Response from API:", result);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting your data.");
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
                    <input
                        type="text"
                        id="lookingFor"
                        value={lookingForText}
                        onChange={(e) => setLookingForText(e.target.value)}
                    />
                    <button type="button" onClick={handleSubmit}>Submit</button>
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>
            )}

            {showICanDoInput && (
                <div className="input-group">
                    <label htmlFor="iCanDo">What can you do</label>
                    <input
                        type="text"
                        id="iCanDo"
                        value={iCanDoText}
                        onChange={(e) => setICanDoText(e.target.value)}
                    />
                    <button type="button" onClick={handleSubmit}>Submit</button>
                    <button onClick={handleBackClick} className="back-button">Back</button>
                </div>
            )}
        </div>
    );
}

export default Home;
