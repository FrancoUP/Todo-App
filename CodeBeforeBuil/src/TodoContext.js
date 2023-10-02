import { useState, createContext, useContext } from "react";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todo, setTodo] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [todoSubject, setTodoSubject] = useState("");
  const [pressed, setPresed] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  function handleAddTaskKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (todoSubject !== "") {
        setCountItems((countItems) => countItems + 1);
        setTodo((todo) => [
          ...todo,
          { task: todoSubject, cod: countItems, checked: false },
        ]);
      }
    }
  }

  function hadleAddTaskClickBtn() {
    if (todoSubject !== "") {
      setCountItems((countItems) => countItems + 1);
      setTodo((todo) => [
        ...todo,
        { task: todoSubject, cod: countItems, checked: false },
      ]);
    }
  }

  function handleInputChange(e) {
    setTodoSubject(e.target.value);
  }

  function handleDelateItem(value) {
    const newTodo = todo.filter((el) => el.cod !== value);
    setTodo(() => newTodo);
  }

  function handleDelateCompleted() {
    const newTodo = [...todo];
    newTodo.forEach((el) => {
      if (el.checked) {
        el.task = "";
      }
    });
    setTodo(() => newTodo.filter((el) => el.task !== ""));
  }

  function handleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  function handleMouseOver(setColor) {
    if (darkMode) setColor("#E3E4F1");
    else setColor("#494C6B");
  }

  function handleMouseOut(setColor) {
    setColor("#9495a5");
  }

  return (
    <TodoContext.Provider
      value={{
        onAddTaskKeyDown: handleAddTaskKeyDown,
        onAddTaskClickBtn: hadleAddTaskClickBtn,
        onInputChange: handleInputChange,
        onDelateItem: handleDelateItem,
        onDelateCompleted: handleDelateCompleted,
        onSetPressed: setPresed,
        onSetDarkMode: handleDarkMode,
        onSetTodo: setTodo,
        handleMouseOver,
        handleMouseOut,
        darkMode,
        todo,
        todoSubject,
        pressed,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);

  if (context === undefined)
    throw new Error("TodoContext was used outside of the TodoProvider");

  return context;
}

export { TodoProvider, useTodo };
