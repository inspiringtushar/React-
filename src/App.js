import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoItem from './component/todo-item';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Pagination from './component/pagination';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

function App() {

  const [todo, setTodo] = useState({
    items: [
      { text: "apple", key: 1, favourite: false, status: "In-Progress", select: false },
      { text: "banana", key: 2, favourite: false, status: "In-Progress", select: false },
      { text: "carrot", key: 3, favourite: false, status: "In-Progress", select: false },
      { text: "date plum", key: 4, favourite: false, status: "In-Progress", select: false },
      { text: "egg", key: 5, favourite: false, status: "In-Progress", select: false },
      { text: "fish", key: 6, favourite: false, status: "In-Progress", select: false },
      { text: "grapes", key: 7, favourite: false, status: "In-Progress", select: false },
      { text: "honey", key: 8, favourite: false, status: "In-Progress", select: false }
    ]
  });
  const [todos, setTodos] = useState({
    currentItem: {
      text: "",
      key: "",
      favourite: "",
      status: "",
      option: ""
    }
  });

  const [search, setSearch] = useState("");

  const [filteredItems, setFilteredItems] = useState(todo.items);

  const [allChecked, setAllChecked] = useState(false)

  const [allDropdown, setAllDropdown] = useState("In-Progress")


  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  }, [])


  const handleFavourite = (id) => {
    let items = todo.items.map((t) => {

      if (t.key === id) {

        t.favourite = !t.favourite
      }
      return t;
    })
    setTodo({
      items: items
    })
  }

  const [showPerPage, setShowPerPage] = useState(3);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });

  const onPaginationChange = (start, end) => {

    setPagination({ start: start, end: end })
  }


  const handleChange = (e) => {

    // e.preventDefault();
    setTodos({
      currentItem: {
        text: e.target.value,
        key: +new Date(),
        favourite: false,
        status: "In-Progress",
      }
    }
    )
  }

  const handleClick = (e) => {

    e.preventDefault();

    const newItem = todos.currentItem;


    if (newItem.text !== "") {

      const newItems = [newItem, ...todo.items]

      setFilteredItems(newItems)

      setTodo({
        items: newItems
      })


      console.log(todo.items)
      setTodos({
        currentItem: {
          text: "",
          key: "",
          favourite: "",
          status: "",
        }
      })
    }
  }


  const handleSearch = (e) => {
    //debugger; 
    setSearch(e.target.value);

  }

  useEffect(() => {


    var filteredItemsSearch = todo.items.filter((i) => {
      return i.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });


    setFilteredItems(filteredItemsSearch)

    if(filteredItems.length==0)
    {
      alert("no record")
    }

  }, [search])


  const handleDelete = (id, itemProp) => {
    let result = window.confirm(`Do you want to permanently delete ${itemProp} ?`)


    if (result) {
      let remainingTodos = todo.items.filter((t, index) => {
        // console.log(id)

        return id !== t.key
        //console.log(t.key)
      })

      setFilteredItems(remainingTodos)


      setTodo({
        items: remainingTodos
      })
    }
  }



  const setUpdate = (event, text, key) => {
    const updateItem = todo.items;
    updateItem.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    })
    if (event) {
      setTodo({
        items: updateItem
      })
    }
  }

  const handleStatusChange = (id, val) => {
    let items = todo.items.map((t) => {

      if (t.key === id) {

        t.status = val;
        localStorage.setItem("todoStatus", JSON.stringify(todo.items))
      }
      return t;
    })

    setTodo({
      items: items
    })
  }



  const handleSelectAll = (e) => {


    if (e.target.checked) {
      setAllChecked(true)
      let selectAll = todo.items.map((s) => {
        s.select = true
        return s;
      })

      setTodo({
        items: selectAll
      })
    }

    else {
      setAllChecked(false)
      let deSelectAll = todo.items.map((s) => {
        s.select = false
        return s;
      })

      setTodo({
        items: deSelectAll
      })
    }


    console.log(todo.items)

  }


  const handleSelectStatus = (e) => {


    setAllDropdown(e.target.value)

    if (true) {
      let selectAllStatus = todo.items.map((s) => {
        if(s.select === true){
        s.status = e.target.value
        }
        return s;
      })

      setTodo({
        items: selectAllStatus
      })
    }

    console.log(todo.items)

  }


  const handleComplete = (e) => {

    if (e.target.checked) {
      let completeItems = todo.items.filter((t) => {

        return t.status === "Completed";
      })
      setFilteredItems(completeItems)
    }
    else{

      setFilteredItems(todo.items)
    }
    console.log(filteredItems)

  }


  const handleOnHold = (e) => {

    if (e.target.checked) {
      let completeItems = todo.items.filter((t) => {

        return t.status === "On-Hold";
      })
      setFilteredItems(completeItems)
    }
    else

      setFilteredItems(todo.items)


  }

  const handleAll = (e) => {

    if (e.target.checked) {
      let completeItems = todo.items.filter((t) => {

        return t.status === "On-Hold" || "Completed" || "In-Progress";
      })
      setFilteredItems(completeItems)
    }
    else

      setFilteredItems(todo.items)


  }





  const handleBookMark = (e) => {

    if (e.target.checked) {

      let filteredItemsBookMark = todo.items.filter((i) => {
        return i.favourite === true;
      });

      setFilteredItems(filteredItemsBookMark)

    }
    else {
      setFilteredItems(todo.items)
    }


  }

  const setItemCheck = (e, id) => {

    if (e.checked) {


      var handleSingle = todo.items.map((i) => {

        if (i.key === id) {
          i.select = !i.select
        }
        return i;
      })

      
    setFilteredItems(handleSingle)

    setTodo({
      items:handleSingle
    })


    }
    else {

      var handleSingle1 = todo.items.map((i) => {

        if (i.key === id) {
          i.select = !i.select
        }
        return i;
      })

      
    setFilteredItems(handleSingle1)

    setTodo({
      items:handleSingle1
    })

    }
    
  
  }

  console.log(filteredItems)



  return (
    <div className="App">

      <div >
        <header className="header-color" >

          <h2> <EventNoteIcon /> TODOER</h2>
          <br />
        </header>
      </div>
      <div className="App-header">
        <h2> What do you want to do today ?  </h2>
        <div>
          <form id="todo-form">
            <input type="text" placeholder="Add task" name="todo"
              ref={inputRef}
              value={todos.currentItem.text} onChange={handleChange} />
            <button  onClick={handleClick}>
              <AddIcon />
            </button>


            <div className="searchText">

              <input type="text" placeholder="Search... "
                value={search} onChange={handleSearch}
              />

            </div>


          </form>


          <div className="radioButton">
            <h5>
              <input type="checkBox" onClick={handleSelectAll} /> Select All



          <select id="status" value={allDropdown} onChange={(e) => handleSelectStatus(e)} >
                <option value="In-progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="On-Hold">On-Hold</option>
              </select>



              <input type="radio" id="all " name="status" value="all" defaultChecked onClick={handleAll} />
           All

            <input type="radio" id="completed" name="status" value="complete" onClick={handleComplete} />
            Completed

            <input type="radio" id="on-hold" name="status" value="on-hold" onClick={handleOnHold} />
            On-Hold
            </h5>

          </div>
        </div>
        <div id="todos">
          <ul>
            {
              filteredItems.slice(pagination.start, pagination.end).map((item, index) => {
                return (
                  <TodoItem
                    key={item.key}
                    itemProp={item}
                    onSelect={handleDelete}
                    setUpdate={setUpdate}
                    index={index}
                    id={item.key}
                    handleFavouriteProp={handleFavourite}
                    handleStatusChangeProp={handleStatusChange}
                    setItemCheckProp={setItemCheck}
                    filteredItemsProp={filteredItems} />
                )
              })
            }

          </ul>
        </div>
        <div className="BookMark">

          <input type="checkBox" id="checkbox1"
            onClick={(e) => handleBookMark(e)} hidden />

          <label htmlFor="checkbox1"><BookmarksIcon /></label>
        </div>
        <Pagination showPerPageProp={showPerPage}
          onPaginationChangeProp={onPaginationChange}
          itemLength={filteredItems.length}
          setShowPerPageProp={setShowPerPage}>
        </Pagination>
      </div>



    </div>
  );
}

export default App;
