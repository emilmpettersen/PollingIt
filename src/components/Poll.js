import { useState } from "react";

const Poll = ({ poll }) => {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [option1Votes, setOption1Votes] = useState(poll.option1.votes);
  const [option2Votes, setOption2Votes] = useState(poll.option2.votes);
  const totalVotes = option1Votes + option2Votes;
  const option1percent = Math.round((option1Votes / totalVotes) * 100);
  const option2percent = 100 - option1percent;

  const handleVote = (option) => {
    setSelectedOption(option);
    option && setVoted(true);
    option === 1
      ? setOption1Votes((prev) => prev + 1)
      : setOption2Votes((prev) => prev + 1);
  };

  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>
      <button
        className="option1"
        disabled={selectedOption === 1}
        onClick={() => handleVote(1)}
      >
        {poll.option1.option}
      </button>
      <button
        className="option2"
        disabled={selectedOption === 2}
        onClick={() => handleVote(2)}
      >
        {poll.option2.option}
      </button>
      {voted && (
        <div className="results">
          <div
            className="result-bar option1"
            style={{ "--flex-grow": option1Votes }}
          >
            <span>{option1Votes}</span>
            <span>{option1percent}%</span>
          </div>
          <div
            className="result-bar option2"
            style={{
              "--flex-grow": option2Votes,
            }}
          >
            <span>{option2percent}%</span>
            <span>{option2Votes}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;
