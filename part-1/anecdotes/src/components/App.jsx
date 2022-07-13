import React, { useState } from "react";
import Button from "./Button";
import Paragraph from "./Paragraph";
import HeadingOne from "./HeadingOne";

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0});

    const handleClick = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    const handleVote = () => {
        const newVote = {
            ...votes,
            [selected]: votes[selected] + 1
        }
        setVotes(newVote);
    }

    const maxVoteIndex = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    const maxKeyValue = Math.max(...Object.values(votes));

    return (
        <div>
            <HeadingOne text="Anecdotes of the day" />
            <Paragraph 
                value={anecdotes[selected]} 
                voteNumber={votes[selected]} 
                textOne="has" 
                textTwo="votes"
            />
            <Button onClick={handleVote} text="Vote" />
            <Button onClick={handleClick} text="Next Anecdotes"/>
            <HeadingOne text="Anecdotes with most votes" />
            { maxKeyValue !== 0 ? 
                <Paragraph 
                    value={anecdotes[maxVoteIndex]} 
                    voteNumber={maxKeyValue} 
                    textOne="has" 
                    textTwo="votes"/> : 
                <p>No vote yet.</p>
            }
        </div>
    )
}

export default App;