import React, { useState,useRef, useEffect} from 'react';
import './App.css';
import TodoItem from './component/todo-item';
import AddIcon from '@material-ui/icons/Add';
//import SearchIcon from '@material-ui/icons/Search';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Pagination from './component/pagination';

function App() {

  const [todo, setTodo] = useState({
    items: [
      { text: "apple", key: 1, favourite:false },
      { text: "banana", key: 2, favourite:false },
      { text: "carrot", key: 3, favourite:false},
      { text: "date plum", key: 4, favourite:false },
      { text: "egg", key: 5, favourite:false },
      { text: "fish", key: 6, favourite:false },
      { text: "grapes", key: 7, favourite:false }
    ]
  });
  const [todos, setTodos] = useState({
    currentItem: {
      text: "",
      key: "",
      favourite:""
    }
  });

  const[search,setSearch] = useState("");


  const inputRef = useRef(null);

  useEffect(()=>{
    inputRef.current.focus()
  },[])


  const handleFavourite = (id)=>{
    let items = todo.items.map((t)=>{
    
      if(t.key === id){

        t.favourite = !t.favourite
      }
      return t;
    })
    setTodo({
      items:items
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
        favourite:false
      }
    }
    )
  }

  const handleClick = (e) => {

    e.preventDefault();

    const newItem = todos.currentItem;

    if (newItem.text !== "") {
      const newItems = [newItem, ...todo.items]
  
      setTodo({
        items: newItems
      })
      setTodos({
        currentItem: {
          text: "",
          key: "",
          favourite:""
        }
      })
    }
  }



  const handleSearch = (e)=>{

    setSearch(e.target.value);    
  }


  const handleDelete = (id, itemProp) => {
    let result = window.confirm(`Do you want to permanently delete ${itemProp} ?`)


    if (result) {
      let remainingTodos = todo.items.filter((t, index) => {
        // console.log(id)

        return id !== t.key
        //console.log(t.key)
      })

      setTodo({
        items: remainingTodos
      })
    }
  }

  const setUpdate = (event,text, key) => {
    const updateItem = todo.items;
    updateItem.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    })
    if(event){
    setTodo({
      items: updateItem
    })
    }
  }

  let filteredItems = todo.items.filter((i)=>{
    return i.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });



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
            <input type="text" placeholder="Learn Coding" name="todo"
            ref={inputRef}
            value={todos.currentItem.text} onChange={handleChange} />
            <button variant="outlined" color="primary" onClick={handleClick}>
              <AddIcon />
            </button>
            <div>
            <input type="text" placeholder="Search... "
             value={search} onChange={handleSearch} 
             />
         
            </div>
          </form>
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
                    handleFavouriteProp={handleFavourite}/>
                )
              })
            }

          </ul>
        </div>
        <Pagination showPerPageProp={showPerPage}
          onPaginationChangeProp={onPaginationChange}
          itemLength={todo.items.length}
          setShowPerPageProp = {setShowPerPage}>
        </Pagination>
      </div>

       
        
    </div>
  );
}

export default App;
