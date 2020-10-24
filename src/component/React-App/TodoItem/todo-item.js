import React, { useState, useRef, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DropDown from '../../React-Core/DropDown';

function TodoItem({ itemProp, onSelect, index, id, setUpdate, handleFavouriteProp, handleStatusChangeProp,
    setItemCheckProp, handleInitialValueProp, StatusValue }) {


    const [color, setColor] = useState()

    const [styleColor, setStyleColor] = useState(null)

    const [option, setOption] = useState(false)

    const editRef = useRef(null);


    useEffect(() => {
        editRef.current.focus();
    }, [option])



    let ColorClass = "";


    if (color !== "") {
        if (color === "Completed") {
            ColorClass = "GreenColor"
        }
        else if (color === "On-Hold") {
            ColorClass = "YellowColor"
        }
        else if (color === "In-Progress") {
            ColorClass = "BlueColor"
        }

    }

    useEffect(() => {
        if (itemProp.favourite) {
            setStyleColor('red')
        }
    }, [])


    useEffect(() => {
        if (itemProp.status) {
            setColor(itemProp.status);
        }

    }, [itemProp.status])

    const handleClick = (e, id) => {
        handleFavouriteProp(id)
        if (!styleColor && itemProp.favourite) {

            setStyleColor("red")
        }
        else {
            setStyleColor("")
        }
    }

    const handleStatus = (e, id) => {


        handleStatusChangeProp(id, e.target.value);

        setColor(itemProp.status);

    }

    const handleEditClick = (id, val) => {
        setOption(true);
        let initialEdit = val;
        localStorage.setItem("initialValue", initialEdit)

    }

    const onKeyUp = (e, val, id) => {

        if (e.which === 13) {
          
            setOption("disable")
        }

       
        if (e.which === 27) {
          
            handleInitialValueProp(val, id)
            
            setOption("disable")
        }
    }

    const handleSingleCheck = (e, id) => {

        setItemCheckProp(e, id)


    }

    return (
        <>


            <div className="list">

                <div className={ColorClass}>
                    <div className="orderedList">

                        <input id="checkBox" value="singleSelect" type="checkbox"
                            checked={itemProp.select} onClick={(e) => handleSingleCheck(e, id)} />

                        <input type="text" disabled={option == true ? "":"disable"} ref={editRef}
                            value={itemProp.text}
                            onChange={(e) => { setUpdate(e, e.target.value, id) }}
                            onKeyUp={(e) => { onKeyUp(e, itemProp.text, id) }} />


                        <select id="record" value={itemProp.status} onChange={(e) => handleStatus(e, id)} >
                            <DropDown></DropDown>
                        </select>

                        <button className="EditStyle" onClick={() => handleEditClick(id, itemProp.text)}>
                            <EditIcon />
                        </button>


                        <button className="ItemStyle" onClick={() => onSelect(id, itemProp.text)} >
                            <DeleteIcon />
                        </button>

                        <FavoriteIcon className={"FavStyle"}
                            style={{ color: styleColor, fontSize: "32px" }}
                            onClick={(e) => handleClick(e, id)} />


                    </div>
                </div>


            </div>

        </>
    );
}

export default TodoItem;
