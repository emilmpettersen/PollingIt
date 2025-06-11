import { useState } from "react";

const Poll = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState(
    poll.options.map((option) => option.votes)
  );
  const totalVotes = votes.reduce((sum, value) => sum + value);
  const winningIndex = votes.indexOf(Math.max(...votes));
  const winnerOutput = poll.options[winningIndex].winnerOutput;

  const getPercent = (i) => {
    return Math.round((votes[i] / totalVotes) * 100);
  };

  const handleVote = (option) => {
    setSelectedOption(option + 1);
    setVotes((prev) => {
      const updatedVotes = [...prev];
      updatedVotes[option] += 1;
      return updatedVotes;
    });
  };

  // add new colors if >3 options are needed
  const colors = ["#940d0d", "#319cc3", "#dbdd3e"];

  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>

      {poll.options.map((option, i) => (
        <button
          key={i}
          className={`${selectedOption === i + 1 ? "selected" : ""}`}
          style={{ backgroundColor: colors[i] }}
          disabled={selectedOption}
          onClick={() => handleVote(i)}
        >
          {option.option}
        </button>
      ))}

      {selectedOption && (
        // Currently only supports 2 options. Will need a different layout if more options are
        // added in the future.
        <div className="results">
          <div className="result-bars">
            {votes.map((count, i) => (
              <div
                key={i}
                className={"result-bar"}
                style={{ "--flex-grow": count, backgroundColor: colors[i] }}
              >
                <span>{count}</span>
                <span>{getPercent(i)}%</span>
              </div>
            ))}
          </div>
          <p>{winnerOutput}</p>
        </div>
      )}
    </div>
  );
};

export default Poll;
