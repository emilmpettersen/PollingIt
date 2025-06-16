import "./styles/main.scss";
import Poll from "./components/Poll";
import { useEffect, useState } from "react";

function App() {
  const [polls, setPolls] = useState([]);

  // Fetching polls from database
  useEffect(() => {
    async function getPolls() {
      const response = await fetch(`http://localhost:5050/polls`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setPolls(records);
    }
    getPolls();
    return;
  }, [polls.length]);

  return (
    <main className="page-container">
      <div className="polls-container">
        {polls.map((poll) => (
          <Poll poll={poll} key={poll._id} />
        ))}
      </div>
    </main>
  );
}

export default App;
