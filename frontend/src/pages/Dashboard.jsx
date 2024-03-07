import { useEffect, useState } from "react";
import { SubmitButton } from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputBox } from "../components/InputBox";

export function Dashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchTodoList() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/todo/bulk",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authorization"),
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTodoList();

    const intervalId = setInterval(fetchTodoList, 5000);

    return () => clearInterval(intervalId);
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
        <div className="border border-black bg-slate-400 m-10 p-10">
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
                  title: title,
                  description: description,
                  taskCompleted: false,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("authorization"),
                  },
                }
              );
            }}
          />
        </div>

        <div>
          {data ? (
            data.todoList.map((todo) => {
              return (
                <div className="bg-red border border-black mt-5 mx-10 p-10">
                  <div className="font-bold text-xl">{todo.title}</div>
                  <div className="text-sm">{todo.description}</div>
                  <SubmitButton
                    buttonText="Done"
                    onClick={async () => {
                      const response = await axios.put(
                        "http://localhost:3000/api/v1/todo/update",
                        {
                          todoDocumentId: data._id,
                          todoId: todo._id,
                          updatedTodo: {
                            title: todo.title,
                            description: todo.description,
                            taskCompleted: true,
                          },
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                            authorization:
                              localStorage.getItem("authorization"),
                          },
                        }
                      );
                    }}
                  />
                  <SubmitButton buttonText="Edit" onClick={() => {}} />
                  <SubmitButton
                    buttonText="Delete"
                    onClick={async () => {
                      const response = await axios.delete(
                        "http://localhost:3000/api/v1/todo/delete",
                        {
                          headers: {
                            "Content-Type": "application/json",
                            authorization: localStorage.getItem("authorization"),
                          },
                          data : {
                            todoDocumentId: data._id,
                            todoId: todo._id,
                          },
                        },
                      );
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div>Loading........</div>
          )}
        </div>
      </div>
    </>
  );
}
