import React, { useState, useEffect } from 'react';

function Pagination({ showPerPageProp, onPaginationChangeProp, itemLength, setShowPerPageProp }) {


    const [counter, setCounter] = useState(1);
    const [numberOfButtons, setNumberOfButtons] = useState(Math.ceil(itemLength / showPerPageProp))


    // console.log(`Todo Items--->${itemLength}`);
    // console.log(`Showperpage--->${showPerPageProp}`);
    // console.log(`ItemLength ------> ${Math.ceil(itemLength / showPerPageProp)}`)
    // console.log(`Buttons -------> ${numberOfButtons}`);

    useEffect(() => {
        const value = showPerPageProp * counter;

        onPaginationChangeProp(value - showPerPageProp, value)
    }, [counter,showPerPageProp])

    useEffect(() => {
        // console.log("Use Effect ------->")
        setNumberOfButtons(Math.ceil(itemLength / showPerPageProp))
    }, [itemLength,showPerPageProp])

    

  


    const handleClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1)
            }
            else {
                setCounter(counter - 1)
            }
        }
        else if (type === "next") {
            if (numberOfButtons === counter) {
                setCounter(counter)
            }
            else {
                setCounter(counter + 1)
            }
        }
    }

    

    return (

        <div>


            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">

                    <ul className="pagination">
                        <label>Records Per Page  </label>
                        <select id="record"  onChange={(e)=>{setShowPerPageProp(e.target.value)}} >
                        <option defaultValue="Records Per Page">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option  value="3">3</option>
                            <option  value="4">4</option>
                            <option  value="5">5</option>
                        </select>

                        <li className="page-item">

                            <a className="page-link" href="#"
                                onClick={() => handleClick("prev")}>Previous</a></li>
                        {
                            new Array(numberOfButtons).fill("").map((e, index) => {
                                return (

                                    <li className={`page-item ${index + 1 === counter ? 'active' : null}`}
                                    key = {index} >
                                        <a className="page-link" href="#" onClick={() => setCounter(index + 1)}>
                                            {index + 1}
                                        </a></li>
                                )
                            })
                        }
                        <li className="page-item"><a className="page-link" href="#"
                            onClick={() => handleClick("next")}>Next</a></li>


                    </ul>
                </nav>

            </div>
        </div>
    );
}

export default Pagination;