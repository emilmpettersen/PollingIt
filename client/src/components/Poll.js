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
    setSelectedOption(option);
    const newVoteCount = votes[option] + 1;
    setVotes((prev) => {
      const updatedVotes = [...prev];
      updatedVotes[option] = newVoteCount;
      return updatedVotes;
    });

    fetch(`http://localhost:5050/polls/${poll._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      // Fields that to be updated are passed
      body: JSON.stringify({
        optionIndex: option,
        votes: newVoteCount,
      }),
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  // add new colors if >3 options are needed
  const colors = ["#940d0d", "#319cc3", "#dbdd3e"];

  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>

      {poll.options.map((option, i) => (
        <button
          className={`${selectedOption === i ? "selected " : ""}${
            (selectedOption !== null && winningIndex) === i ? "winner" : ""
          }`}
          key={poll._id + "vote-button" + i}
          style={{ backgroundColor: colors[i] }}
          disabled={selectedOption !== null}
          onClick={() => handleVote(i)}
        >
          {option.option}
        </button>
      ))}

      {selectedOption !== null && (
        // Should maybe make it a pie chart if there is a lot of options
        <div className="results">
          <div className="result-bars">
            {votes.map((count, i) => (
              <>
                <div
                  key={poll._id + "result-bar" + i}
                  className={"result-bar percentage"}
                  style={{ "--flex-grow": count, backgroundColor: colors[i] }}
                >
                  {getPercent(i)}%
                </div>
              </>
            ))}
          </div>
          <span>total votes: {totalVotes}</span>
          <p className="winner-output">{winnerOutput}</p>
        </div>
      )}
    </div>
  );
};

export default Poll;
