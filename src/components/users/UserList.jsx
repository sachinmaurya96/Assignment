
import { useState, useEffect } from "react";
function UserList() {
const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [serchTerm, setSerchTerm] = useState(
   JSON.parse(localStorage.getItem("searchItems")) === null ? [] : JSON.parse(localStorage.getItem("searchItems"))
  );
  
 

  const handleInput = (e) => {
    setOpen(true);
    setInput(e.target.value);
  };

  const handleClick = () => {
    setOpen(false);
    if (input) {
      setSerchTerm([...serchTerm, input]);
    }
  };

  const sort = () => {
    const sortedUser = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUser);
  };
  useEffect(()=>{
    localStorage.setItem("searchItems", JSON.stringify(serchTerm));
},[serchTerm])
useEffect(() => {
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => setUsers(data))
  .catch((error) => console.error("Error:", error));
}, []);

useEffect(() => {
let filter, ul, li, a, i, txtValue;
filter = input.toUpperCase();
ul = document.getElementById("myUL");
li = ul?.getElementsByTagName("li");
// Loop through all list items, and hide those who don't match the search query
for (i = 0; i < li?.length; i++) {
  a = li[i];
  txtValue = a.textContent || a.innerText;
  if (txtValue.toUpperCase().indexOf(filter) > -1) {
    li[i].style.display = "";
  } else {
    li[i].style.display = "none";
  }
}
}, [input, serchTerm]);
  return (
    <div className="container">
    <div className="wrapper">
      <div className="searchContainer">
        <input
          type="text"
          id="myInput"
          onChange={handleInput}
          placeholder="Search for names.."
          value={input}
          autoComplete="off"
          list="suggestions"
        />
        <button className="searchbtn" onClick={handleClick}>
          Search
        </button>
      </div>
      {open && input && (
        <ul id="myUL" className="ul1">
          {(input ? users : serchTerm).map((user, index) => {
            if (index < 5) {
              return <li key={index}>{user.name}</li>;
            }
          })}
        </ul>
      )}
      {
        !input && <datalist id="suggestions">
        {serchTerm?.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      }
      <div className="btn">
        <button onClick={sort}>Sort</button>
      </div>
      <ul id="myUL" className="ul2">
        {users.map((user, index) => {
          return <li key={index}>{user.name}</li>;
        })}
      </ul>
    </div>
  </div>
  )
}

export default UserList
