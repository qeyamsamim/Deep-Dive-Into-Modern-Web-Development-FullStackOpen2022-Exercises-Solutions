import React, { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {

    const [clicks, setClicks] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    const handleGood = () => {
        setClicks({...clicks, good: clicks.good + 1});
    }

    const handleNeutral = () => {
        setClicks({...clicks, neutral: clicks.neutral + 1});
    }

    const handleBad = () => {
        setClicks({...clicks, bad: clicks.bad + 1});
    }

    return <div>
        <h1>Give Feedback</h1>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
        <h1>Statistics</h1>
        {
            (clicks.good !== 0 || clicks.bad !== 0 || clicks.neutral !== 0) ? 
            <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} /> : 
            <p>No feedback given</p>
        }
    </div>
}

export default App;