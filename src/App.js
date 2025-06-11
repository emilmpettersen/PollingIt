import "./styles/main.scss";
import Poll from "./components/Poll";
import { v4 as uuidv4 } from "uuid";

function App() {
  const polls = [
    {
      id: uuidv4(),
      question: "What came first, the chicken or the egg?",
      options: [
        {
          option: "Chicken",
          votes: 50,
          winnerOutput: "🐤 The chicken came first, obviously",
        },
        {
          option: "Egg",
          votes: 32,
          winnerOutput: "🥚 Of course the egg came first",
        },
      ],
    },

    {
      id: uuidv4(),
      question: "Red or blue?",
      options: [
        {
          option: "Red",
          votes: 12,
          winnerOutput: "🟥 Strong. Aggressive. Red.",
        },
        {
          option: "Blue",
          votes: 66,
          winnerOutput: "🟦 We got the blues",
        },
      ],
    },
    {
      id: uuidv4(),
      question: "Coca Cola or Pepsi?",
      options: [
        {
          option: "Coca Cola",
          votes: 10031,
          winnerOutput: "Never in doubt. Coca Cola is superior.",
        },
        {
          option: "Pepsi",
          votes: 301,
          winnerOutput: "🤨 Somehow Pepsi won. What? ",
        },
      ],
    },
  ];

  return (
    <main className="page-container">
      <div className="polls-container">
        {polls.map((poll) => (
          <Poll poll={poll} key={poll.id} />
        ))}
      </div>
    </main>
  );
}

export default App;
