import { useEffect, useState } from "react";
import "./App.css";
import { List } from "./components/list";
import { Card } from "./components/card";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  function handleSaveUser(updatedUser) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedUser.id ? updatedUser : item
      )
    );
    setSelectedUser(null);
  }

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/data?page=${page}&limit=20`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      fetchData();
    }
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  return (
    <section className="App">
      <div className="App-content">
        <div
          className="App-list"
          onScroll={handleScroll}
          style={{ height: "400px", overflowY: "auto" }}
        >
          <List items={items} onSelectUser={handleSelectUser} />
        </div>
        {selectedUser && <Card user={selectedUser} onSave={handleSaveUser} />}
      </div>
    </section>
  );
}

export default App;
