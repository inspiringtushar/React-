import React, { useState, useEffect } from 'react';

function Pagination({ showPerPageProp, onPaginationChangeProp, itemLength, setShowPerPageProp,
    counter, setCounter, setAllDropdownProp }) {



    const [numberOfButtons, setNumberOfButtons] = useState(Math.ceil(itemLength / showPerPageProp))


    useEffect(() => {
        const value = showPerPageProp * counter;

        onPaginationChangeProp(value - showPerPageProp, value)
    }, [counter, showPerPageProp])

    useEffect(() => {
        // console.log("Use Effect ------->")
        setNumberOfButtons(Math.ceil(itemLength / showPerPageProp))
    }, [itemLength, showPerPageProp])






    const handleClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1)
            }
            else {
                setAllDropdownProp("Select")
                setCounter(counter - 1)
            }
        }
        else if (type === "next") {
            if (numberOfButtons === counter) {
                setCounter(counter)
            }
            else {
                setAllDropdownProp("Select")
                setCounter(counter + 1)
            }
        }
    }

    const handleRecordPerPage = (e) => {

        setShowPerPageProp(e.target.value)
        setCounter(1);
    }


    return (

        <div>


            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">

                    <ul className="pagination">
                        <label>Records Per Page  </label>
                        <select id="record" onChange={(e) => { handleRecordPerPage(e) }} >
                            <option defaultValue="Records Per Page" hidden>{showPerPageProp}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>

                        <li >

                            <button className="d"
                                onClick={() => handleClick("prev")}><h7>{"Prev"}</h7></button></li>
                        {
                            new Array(numberOfButtons).fill("").map((e, index) => {
                                return (

                                    <li className={` ${index + 1 === counter ? 'f' : null}`}
                                        key={index} >
                                        <button className="b" onClick={() => {
                                            setCounter(index + 1);
                                            setAllDropdownProp("Select")
                                        }}>
                                            {index + 1}
                                        </button></li>
                                )
                            })
                        }
                        <li ><button className="d"
                            onClick={() => handleClick("next")}><h7>{"Next"}</h7></button></li>


                    </ul>
                </nav>

            </div>
        </div>
    );
}

export default Pagination;