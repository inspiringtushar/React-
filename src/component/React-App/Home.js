import React, { useState, useRef, useEffect } from 'react';
import '../../Style/App.css';
import TodoItem from './TodoItem/todo-item';
import AddIcon from '@material-ui/icons/Add';
import Pagination from './Pagination/pagination';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import DropDown from '../React-Core/DropDown';
import RadioButton from '../React-Core/RadioButton';

function Home() {

    const [todo, setTodo] = useState({
        items: [
            { text: "apple", key: 1, favourite: false, status: "To do", select: false },
            { text: "banana", key: 2, favourite: false, status: "To do", select: false },
            { text: "carrot", key: 3, favourite: false, status: "To do", select: false },
            { text: "date plum", key: 4, favourite: false, status: "To do", select: false },
            { text: "egg", key: 5, favourite: false, status: "To do", select: false },
            { text: "fish", key: 6, favourite: false, status: "To do", select: false },
            { text: "grapes", key: 7, favourite: false, status: "To do", select: false },
            { text: "honey", key: 8, favourite: false, status: "To do", select: false }
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




    const [counter, setCounter] = useState(1);
    const [noRecord, setNoRecord] = useState("No Record Found !!")


    const [search, setSearch] = useState("");

    const [filteredItems, setFilteredItems] = useState(todo.items);

    const [allChecked, setAllChecked] = useState(false)

    const [allDropdown, setAllDropdown] = useState("To do")

    const [showPerPage, setShowPerPage] = useState(10);

    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage
    });


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
                status: "Todo",
            }
        }
        )
    }

    const handleClick = (e) => {

        e.preventDefault();

        const newItem = todos.currentItem;

        const newI = newItem.text.trimLeft();

        newItem.text = newI;

        if (newI !== "" && newI.trim() !== "") {

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

        setCounter(1);
        setSearch(e.target.value);

    }


    useEffect(() => {


        var filteredItemsSearch = todo.items.filter((i) => {
            return i.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });


        setFilteredItems(filteredItemsSearch)



    }, [search])

    const handleDelete = (id, itemProp) => {
        let result = window.confirm(`Do you want to permanently delete ${itemProp}?`)


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


            if ((((filteredItems.length) - 1) % showPerPage) === 0) {

                setCounter(1);
            }


        }
    }



    const setUpdate = (event, text, key) => {
        const updateItem = todo.items;
        var i = 1;

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
            let selectAll = todo.items.slice(pagination.start, pagination.end).map((s) => {
                s.select = true
                return s;
            })

            setTodo({
                items: selectAll
            })

            setTodo({
                items: filteredItems
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


        // setAllDropdown("Select")
        setAllDropdown(e.target.value)
        setAllChecked(false)

        if (true) {
            let selectAllStatus = todo.items.map((s) => {
                if (s.select === true) {
                    s.status = e.target.value;
                    s.select = !s.select;
                }
                return s;
            })

            setTodo({
                items: selectAllStatus
            })
        }

        console.log(todo.items)

    }

    const handleFilterChange = (e) => {
        setSearch("");
        let val = e.target.value;

        if (val !== "All") {
            let completeItems = todo.items.filter((t) => {
                return t.status === val;
            });
            setFilteredItems(completeItems);

            setCounter(1);
        } else {
            let completeItems = todo.items.filter((t) => {
                return t.status !== "All";
            });
            setFilteredItems(completeItems);
        }
    };





    const handleBookMark = (e) => {

        setSearch("");


        document.getElementById("3").checked = false;
        document.getElementById("4").checked = false;
        document.getElementById("5").checked = false;
        document.getElementById("2").checked = false;


        if (e.target.checked) {

            let filteredItemsBookMark = todo.items.filter((i) => {
                return i.favourite === true;
            });

            setFilteredItems(filteredItemsBookMark)

        }
        setCounter(1);


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
                items: handleSingle
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
                items: handleSingle1
            })

        }


    }

    const handleInitialValue = (val, id) => {
        console.log(id)
        var firstValue = todo.items.map((i) => {
            if (i.key === id) {
                i.text = localStorage.getItem("initialValue")
            }
            return i;
        })


    }



    console.log(filteredItems)


    return (

        <div className="App">

            <div className="App-header">
                <h2> What do you want to do today?  </h2>
                <div>
                    <form id="todo-form">
                        <input type="text" placeholder="Add task" name="todo"
                            ref={inputRef}
                            value={todos.currentItem.text} onChange={handleChange} />
                        <button onClick={handleClick}>
                            <AddIcon />
                        </button>


                        <div className="searchText">

                            <input type="search" placeholder="Search... "
                                value={search} onChange={handleSearch}
                            />

                        </div>
                    </form>

                    <div className="radioButton">
                        <h5>
                            <input type="checkBox" checked={allChecked} onClick={handleSelectAll} /> Select All



                             <select id="status" value={allDropdown} onChange={(e) => handleSelectStatus(e)} >
                                <option>Select</option>
                                <DropDown></DropDown>
                            </select>

                            <RadioButton onSelectValue={handleFilterChange}></RadioButton>
                        </h5>

                    </div>

                </div>
                <div id="todos">
                    <ul className="collection">
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
                                        setFilteredItemsProp={setFilteredItems}
                                        handleInitialValueProp={handleInitialValue}

                                    />
                                )
                            })
                        }
                        {filteredItems.length == 0 && <div className="record">No Records Found!!</div>}

                    </ul>
                </div>
                <div className="BookMark">

                    <input type="checkBox" id="checkbox1"
                        onClick={(e) => handleBookMark(e)} hidden />

                    <label htmlFor="checkbox1"><BookmarksIcon /></label>
                </div>
                <Pagination
                    counter={counter}
                    setCounter={setCounter}
                    showPerPageProp={showPerPage}
                    onPaginationChangeProp={onPaginationChange}
                    itemLength={filteredItems.length}
                    setShowPerPageProp={setShowPerPage}
                    setAllDropdownProp={setAllDropdown}
                >

                </Pagination>
            </div>



        </div>

    );


}

export default Home;