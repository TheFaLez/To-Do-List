import React, { useEffect, useState } from "react";
import Icon from "./todoicon.svg";

const List = () => {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);
  const [add, setAdd] = useState([]);
  const [del, setDel] = useState("card-delete");
  const [userId, setUserId] = useState([]);
  const [save, setSave] = useState([]);
  const [win, setWin] = useState("card-window-off");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API Error");
        }
      })
      .then((info) => {
        return (
          setUsers(info.filter((filt) => filt.id <= 50)),
          setBack(info.filter((filt) => filt.id <= 50))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const btn1 = (id) => {
    let newDate = users.filter((filtr) => filtr.id != id);

    setUsers(newDate);
    setBack(newDate);
  };

  const inpSearch = (e) => {
    let newDate = users.filter((value) =>
      value.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (e.target.value.length > 0) {
      setUsers(newDate);
      setDel("card-delete-off");
    } else {
      setDel("card-delete");
      setUsers(back);
    }
  };

  const inpAdd = (e) => {
    setAdd(e.target.value);
  };

  const btn2 = () => {
    let newDate = {
      id: users.length + 1,
      title: add,
      completed: false,
    };

    if (add.length != 0) {
      setUsers([newDate, ...users]);
      setBack([newDate, ...back]);
    } else {
      return;
    }

    setAdd([]);
  };

  const btn3 = (value) => {
    setUsers(
      users.map((todo) => {
        if (todo.id == value) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );
  };

  const btn5 = (id, title) => {
    setUserId(id);
    setWin("card-window-on");
    setSave(title);
  };

  const inpSave = (e) => {
    if (e.target.value.length > 0) {
      setSave(e.target.value);
    } else {
      setSave([]);
    }
  };

  const btn6 = () => {
    if (save.length > 0) {
      setUsers(
        users.map((todo) => {
          if (todo.id == userId) {
            return {
              ...todo,
              title: save,
            };
          } else {
            return todo;
          }
        })
      );
    }

    setWin("card-window-off");
    setSave([]);
  };

  const close = () => {
    setWin("card-window-off");
  };

  localStorage.setItem("todo", JSON.stringify(users));

  return (
    <div className="list" data-aos="fade-up">
      <div className="list-head">
        <div className="list-head-info">
          <h1 className="list-title">
            To-Do List <img className="list-icon" src={Icon} />
          </h1>
        </div>

        <div className="list-inputs">
          <div className="search">
            <input
              type="text"
              onChange={inpSearch}
              placeholder="Search..."
              data-aos="fade-right"
            />
          </div>
          <div className="add">
            <input
              type="text"
              onChange={inpAdd}
              data-aos="fade-right"
              placeholder="Add New Task..."
              value={add}
            />{" "}
            <button onClick={btn2} data-aos="fade-left">
              Add New Task
            </button>
          </div>
        </div>
      </div>

      <div className="cards">
        {users.map((value, index) => {
          return (
            <div className="card" key={value.id} data-aos="fade-right">
              <div className="card-text">
                <h2
                  className={
                    value.completed ? "card-title-on" : "card-title-off"
                  }
                >
                  {value.title}
                </h2>
              </div>
              <div className="card-btns">
                <button
                  className={
                    value.completed ? "card-check-off" : "card-check-on"
                  }
                  onClick={() => btn3(value.id)}
                >
                  {value.completed ? (
                    <i className="fa-solid fa-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-check"></i>
                  )}
                </button>
                <button
                  className="card-edit"
                  onClick={() => btn5(value.id, value.title)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className={del} onClick={() => btn1(value.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          );
        })}
        <div className={win}>
          <input type="text" onChange={inpSave} value={save} />{" "}
          <button className="save" onClick={btn6}>
            Save
          </button>
          <button className="close" onClick={close}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
