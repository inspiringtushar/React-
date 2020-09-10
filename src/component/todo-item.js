import React, { useState, useRef, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';

function TodoItem({ itemProp, onSelect, index, id, setUpdate,handleFavouriteProp }) {


    const [color, setColor] = useState()

    const [styleColor, setStyleColor] = useState(null)

    const [option, setOption] = useState("disable")

    const editRef = useRef(null);

    useEffect(()=>{
        editRef.current.focus();
    },[option])



    let ColorClass = "";


    if (color !== "") {
        if (color === "2") {
            ColorClass = "GreenColor"
        }
        else if (color === "3") {
            ColorClass = "YellowColor"
        }
    }

    useEffect(()=>{
        if(itemProp.favourite){
            setStyleColor('red')
        }
    },[])

    const handleClick = (e,id)=>{
        handleFavouriteProp(id)
        if(!styleColor && itemProp.favourite){
            
            setStyleColor("red")
        }
        else{
            setStyleColor("")
        }
    }

    const onKeyUp = (e)=>{

        if(e.which===13){
           // alert("Done");
            setOption("disable")
        }
    }

    return (
        <>

            <div className="list">

                <div className={ColorClass}>
                    <li >
                        
                        <input id="checkBox" type="checkbox"/>

                        <input  type="text" disabled={option} ref={editRef}
                            value={itemProp.text}
                            onChange={(e) => { setUpdate(e, e.target.value, id) }} 
                            onKeyUp={(e)=>{onKeyUp(e)}}/>



                        <select id="record" onChange={(e) => { setColor(e.target.value) }} >
                            <option defaultValue="1">In-progress</option>
                            <option value="2">Completed</option>
                            <option value="3">On-hold</option>
                        </select>

                        <button className="EditStyle" onClick={() => { setOption("") }}>
                            <EditIcon />
                        </button>


                        <button className="ItemStyle" onClick={() => onSelect(id, itemProp.text)} >
                            <DeleteIcon />
                        </button>
                       
                        <FavoriteIcon className={"FavStyle"}
                         style={{color:styleColor}}
                        onClick={(e)=>handleClick(e,id)}/>

                        
                    </li>
                </div>
            </div>
        </>
    );
}

export default TodoItem;
