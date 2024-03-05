import { useEffect, useState } from "react";
import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputBox } from "../components/InputBox";

export function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    async function fetchTodoList() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/todo/bulk",
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      );
    }

    fetchTodoList();
  }, []);

  return (
    <>
      <div>
        <SubmitButton
          buttonText="Account"
          onClick={() => {
            navigate("/user");
          }}
        />

        <InputBox
          label="Title"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <InputBox
          label="Description"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <SubmitButton
          buttonText="Add Todo"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/todo/add",
              {
                body: {
                  title: title,
                  description: description,
                  taskCompleted: false,
                },
              },
              {
                headers: {
                  authorization: localStorage.getItem("authorization"),
                },
              }
            );
          }}
        />
      </div>
    </>
  );
}
