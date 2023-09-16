
import "./App.css";
import Timer from "./components/timer/Timer";
import UserList from "./components/users/UserList";
function App() {
  return (
    <>
  <div className="container">
      <Timer/>
        <UserList/>
  </div>
    </>
  );
}

export default App;
