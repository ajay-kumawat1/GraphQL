import "./App.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getUser, addUser } from "./graphql/query/query";
import { FormEvent, useState } from "react";

type userType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

function App() {
  const [add, { data: addUserResp }] = useMutation<{newUser: string}, {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }>(addUser);
  console.log(addUserResp);
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add({ variables: { name, email, password , isAdmin} });
  };

  const [viewUsers, { data, loading, error }] = useLazyQuery<{sampleUsers: userType[]}>(getUser);
  if (error) return <h1>Error</h1>;

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>User retrived successfully</h1>
      <h3>
        {data?.sampleUsers?.map((user) => (
          <div key={user.email}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </h3>

      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "10px",
          margin: "20px auto",
        }}
      >
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
        name="isAdmin"
          type="text"
          placeholder="Admin"
          value={isAdmin.toString()}
          onChange={(e) => setIsAdmin(e.target.value === "true")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => add()}
          style={{
            width: "111%",
          }}
        >
          Add User
        </button>
        <button
          onClick={() => viewUsers()}
          style={{
            width: "111%",
          }}
        >
          View Users
        </button>
      </form>
    </>
  );
}

export default App;
