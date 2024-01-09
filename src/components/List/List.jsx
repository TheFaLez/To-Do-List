import React, { useEffect, useState } from "react";
import Icon from "../../../public/todo icon.svg";

const List = () => {
  const [users, setUsers] = useState([]);
  const [back, setBack] = useState([]);
  const [prev, setPrev] = useState(10);
  const [add, setAdd] = useState([]);
  const [del, setDel] = useState("card-delete");
  const [more, setMore] = useState("more");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((info) => {
        let newDate = info.filter((filt) => filt.id <= 50);
        return setUsers(newDate), setBack(newDate);
      });
  }, []);

  const btn4 = () => {
    setPrev((prev) => prev + 10);
  };

  const btn1 = (id) => {
    let newDate = users.filter((filtr) => filtr.id != id);

    setUsers(newDate);
    setBack(newDate);
  };

  const inpSearch = (e) => {
    let newDate = users.filter((value) =>
      value.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (e.target.value.length != 0) {
      setUsers(newDate);
      setDel("card-delete-off");
      setPrev(users.length);
      setMore("more-off");
    } else {
      setDel("card-delete");
      setUsers(back);
      setPrev(10);
      setMore("more");
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
      setUsers([...users, newDate]);
      setBack([...back, newDate]);
    } else {
      return;
    }
  };

  const btn3 = (value) => {
    setUsers(
      users.map((todo) => {
        if (todo.id == value)
          return {
            ...todo,
            completed: !todo.completed,
          };
        else {
          return todo;
        }
      })
    );
  };

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
            />{" "}
            <button onClick={btn2} data-aos="fade-left">
              Add New Task
            </button>
          </div>
        </div>
      </div>

      <div className="cards">
        {users
          .map((value, index) => {
            if (index < prev) {
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
                        <i class="fa-solid fa-xmark"></i>
                      ) : (
                        <i class="fa-solid fa-check"></i>
                      )}
                    </button>
                    <button className={del} onClick={() => btn1(value.id)}>
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              );
              {
                index = index + 1;
              }
            }
          })
          .reverse()}
        <button className={more} onClick={btn4}>
          More
        </button>
      </div>
    </div>
  );
};

export default List;
