import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-4 w-full"
        type="text"
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} className="p-2 border-b">{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
