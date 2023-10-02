import { useState } from "react";
import { useTodo } from "./TodoContext";

export default function App() {
  const { todo, darkMode } = useTodo();

  const smartphoneScreenSize = window.screen.width < 600 && todo.length !== 0;

  return (
    <div className={`${darkMode ? "darkMode" : ""}`}>
      <BackgroundImage />
      <Main>
        <Header />
        <AddTodo />
        <ListItems />
        {smartphoneScreenSize && <BoxButtonsSmartphoneMode />}
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <main className="mainContainer">{children}</main>;
}

function BackgroundImage() {
  const { darkMode } = useTodo();

  const styleImgSmartphone =
    window.screen.width < 600
      ? {
          height: "80vw",
          objecFit: "cover",
        }
      : {};

  return (
    <div>
      <img
        style={styleImgSmartphone}
        className="img-sfondo"
        alt="light-sfondo"
        src={
          darkMode
            ? "images/bg-desktop-dark.jpg"
            : "images/bg-desktop-light.jpg"
        }
      ></img>
    </div>
  );
}

function Header() {
  return (
    <div className="headerContainer">
      <div className="nameApp">TODO</div>
      <Switcher />
    </div>
  );
}

function Switcher() {
  const { onSetDarkMode, darkMode } = useTodo();

  return (
    <div className="switch" onClick={onSetDarkMode}>
      <object
        title="img moon"
        type="image/svg+xml"
        data={darkMode ? "images/icon-sun.svg" : "images/icon-moon.svg"}
      ></object>
    </div>
  );
}

function AddTodo() {
  const { onAddTaskKeyDown, onInputChange, todoSubject, darkMode } = useTodo();

  const styleDarkMode = darkMode
    ? {
        backgroundColor: "#25273d",
        boxShadow: "0px 35px 50px -15px rgba(0, 0, 0, 0.5)",
      }
    : {};

  return (
    <form className="addTodoContainer" style={styleDarkMode}>
      <TodoBtn />
      <input
        style={darkMode ? { backgroundColor: "#25273d", color: "#c8cbe7" } : {}}
        className="input"
        type="text"
        name="input todo"
        placeholder="Create a new todo…"
        value={todoSubject}
        onChange={onInputChange}
        onKeyDown={onAddTaskKeyDown}
      ></input>
    </form>
  );
}

function TodoBtn() {
  const { onAddTaskClickBtn } = useTodo();
  return <div className="btn-addTodo" onClick={onAddTaskClickBtn}></div>;
}

function ListItems() {
  const { todo, darkMode } = useTodo();

  const styleDarkMode = darkMode
    ? {
        backgroundColor: "#25273d",
        boxShadow: "0px 35px 50px -15px rgba(0, 0, 0, 0.5)",
      }
    : {};

  const isNotEmpty = todo.length !== 0;

  return (
    <ul className="container-todo" style={styleDarkMode}>
      {todo && todo.map((el) => <Item element={el} key={el.cod} />)}
      {isNotEmpty && <FooterBar />}
    </ul>
  );
}

function Item({ element }) {
  const [select, setSelect] = useState(false);
  const [hover, setHover] = useState(false);
  const { darkMode, pressed, todo, onSetTodo } = useTodo();

  // const valueInput = useRef(todoSubject);
  // console.log(valueInput.current)

  function handleMouseOver() {
    setHover(true);
  }

  function handleMouseOut() {
    setHover(false);
  }

  function handleSelection() {
    const modifyTodo = [...todo];
    modifyTodo[element.cod].checked = !select;

    onSetTodo(modifyTodo);
    setSelect((select) => !select);
  }

  const jsxItem = (
    <li
      className="container-item"
      style={darkMode ? { borderBottomColor: "#393a4b" } : {}}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="item">
        <CheckBtn select={select} onHandleSelection={handleSelection} />
        <p
          className={`${darkMode ? "todo-dark" : "todo"} ${
            select ? "checked" : ""
          }`}
          style={darkMode && select ? { color: "#4D5067" } : {}}
        >
          {element.task}
        </p>
      </div>

      {window.screen.width < 600 ? (
        <CrossBtn codice={element.cod} />
      ) : (
        hover && <CrossBtn codice={element.cod} />
      )}
    </li>
  );

  if (pressed === 0) return jsxItem;
  if (pressed === 1 && !select) return jsxItem;
  if (pressed === 2 && select) return jsxItem;
}

function CheckBtn({ select, onHandleSelection }) {
  const { darkMode } = useTodo();

  function handleCheckMark() {
    if (darkMode && !select) return "#25273d";
    else return "#FFF";
  }

  return (
    <div
      className={`check ${select ? "selected" : ""}`}
      onClick={onHandleSelection}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
        <path
          fill="none"
          stroke={handleCheckMark()}
          strokeWidth="2"
          d="M1 4.304L3.696 7l6-6"
        />
      </svg>
    </div>
  );
}

function CrossBtn({ codice }) {
  const { onDelateItem } = useTodo();

  return (
    <div className="cross" onClick={() => onDelateItem(codice)}>
      <p className="cross-symbol">&#x2715;</p>
    </div>
  );
}

function FooterBar() {
  const { todo } = useTodo();

  return (
    <div className="container-bar">
      <p>{todo.filter((el) => el.task !== "").length} items left</p>
      {window.screen.width > 600 && <BoxButtons />}
      <ClearCompletedTodo />
    </div>
  );
}

function BoxButtons() {
  return (
    <div className="btns-todo">
      <AllTodo />
      <ActiveTodo />
      <CompletedTodo />
    </div>
  );
}

function BoxButtonsSmartphoneMode() {
  const { darkMode } = useTodo();

  const styleBoxButton = darkMode
    ? {
        backgroundColor: "#25273d",
        boxShadow: "0px 35px 50px -15px rgba(0, 0, 0, 0.50)",
      }
    : {};

  return (
    <div className="footer-bar-box" style={styleBoxButton}>
      <BoxButtons />
    </div>
  );
}

function AllTodo() {
  const { pressed, onSetPressed, handleMouseOver, handleMouseOut } = useTodo();
  const [colorAll, setColorAll] = useState("");

  return (
    <div
      style={pressed === 0 ? { color: "#3a7cfd" } : { color: colorAll }}
      className="all"
      onClick={() => onSetPressed(0)}
      onMouseOver={() => handleMouseOver(setColorAll)}
      onMouseOut={() => handleMouseOut(setColorAll)}
    >
      All
    </div>
  );
}

function ActiveTodo() {
  const { pressed, onSetPressed, handleMouseOver, handleMouseOut } = useTodo();
  const [colorActive, setColorActive] = useState("");

  return (
    <div
      style={pressed === 1 ? { color: "#3a7cfd" } : { color: colorActive }}
      className="active-todo"
      onClick={() => onSetPressed(1)}
      onMouseOver={() => handleMouseOver(setColorActive)}
      onMouseOut={() => handleMouseOut(setColorActive)}
    >
      Active
    </div>
  );
}

function CompletedTodo() {
  const { pressed, onSetPressed, handleMouseOver, handleMouseOut } = useTodo();
  const [colorCompleted, setColorCompleted] = useState("");

  return (
    <div
      style={pressed === 2 ? { color: "#3a7cfd" } : { color: colorCompleted }}
      className="completed"
      onClick={() => onSetPressed(2)}
      onMouseOver={() => handleMouseOver(setColorCompleted)}
      onMouseOut={() => handleMouseOut(setColorCompleted)}
    >
      Completed
    </div>
  );
}

function ClearCompletedTodo() {
  const { onDelateCompleted, handleMouseOver, handleMouseOut } = useTodo();
  const [colorClearCompleted, setColorClearCompleted] = useState("");

  return (
    <div
      style={{ color: colorClearCompleted }}
      className="clear-completed"
      onClick={onDelateCompleted}
      onMouseOver={() => handleMouseOver(setColorClearCompleted)}
      onMouseOut={() => handleMouseOut(setColorClearCompleted)}
    >
      ClearCompleted
    </div>
  );
}
