import "./styles/main.scss";
import Poll from "./components/Poll";
import { v4 as uuidv4 } from "uuid";

function App() {
  const polls = [
    {
      id: uuidv4(),
      question: "What came first, the chicken or the egg?",
      option1: { option: "Chicken", votes: 50 },
      option2: { option: "Egg", votes: 32 },
    },
    {
      id: uuidv4(),
      question: "Red or blue?",
      option1: { option: "Red", votes: 12 },
      option2: { option: "Blue", votes: 66 },
    },
    {
      id: uuidv4(),
      question: "Coca Cola or Pepsi?",
      option1: { option: "Coca Cola", votes: 10031 },
      option2: { option: "Pepsi", votes: 301 },
    },
  ];

  return (
    <main className="page-container">
      <div className="polls-container">
        {polls.map((poll) => (
          <Poll poll={poll} />
        ))}
      </div>
    </main>
  );
}

export default App;
