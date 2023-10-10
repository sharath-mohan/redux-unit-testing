import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

function App() {
  const { loading, entries } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (loading === "pending") {
    return <>loading</>;
  }
  return (
    <>
      <ul>
        {entries.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
