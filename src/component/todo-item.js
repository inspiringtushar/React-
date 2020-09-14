import React, { useState, useRef, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';

function TodoItem({ itemProp, onSelect, index, id, setUpdate,handleFavouriteProp,handleStatusChangeProp,setItemCheckProp,filteredItemsProp }) {


    const [color, setColor] = useState()

    const [styleColor, setStyleColor] = useState(null)

    const [option, setOption] = useState("disable")

    const editRef = useRef(null);

    useEffect(()=>{
        editRef.current.focus();
    },[option])



    let ColorClass = "";


    if (color !== "") {
        if (color === "Completed") {
            ColorClass = "GreenColor"
        }
        else if (color === "On-Hold") {
            ColorClass = "YellowColor"
        }
    }

    useEffect(()=>{
        if(itemProp.favourite){
            setStyleColor('red')
        }
    },[])

    
    useEffect(()=>{
        if(itemProp.status){
                setColor(itemProp.status);
            }
        
    },[itemProp.status])

    const handleClick = (e,id)=>{
        handleFavouriteProp(id)
        if(!styleColor && itemProp.favourite){
            
            setStyleColor("red")
        }
        else{
            setStyleColor("")
        }
    }

    const handleStatus = (e,id)=>{
        

     handleStatusChangeProp(id,e.target.value);

        setColor(itemProp.status);

    }

    const onKeyUp = (e)=>{

        if(e.which===13){
           // alert("Done");
            setOption("disable")
        }
    }

    const handleSingleCheck = (e,id)=>{

        setItemCheckProp(e,id)
       

    }

    return (
        <>
        {/* {
        itemProp.length &&
            <p> No Todos !! </p>
        } */}
       

            <div className="list">

                <div className={ColorClass}>
                    <div className="orderedList" >
                        
                        <input id="checkBox" value="singleSelect" type="checkbox" checked={itemProp.select} onClick={(e)=>handleSingleCheck(e,id)}/>

                        <input  type="text" disabled={option} ref={editRef}
                            value={itemProp.text}
                            onChange={(e) => { setUpdate(e, e.target.value, id) }} 
                            onKeyUp={(e)=>{onKeyUp(e)}}/>



                        <select id="record" value={itemProp.status} onChange={(e) =>  handleStatus(e,id) } >
                            <option value="In-progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="On-Hold">On-Hold</option>
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

                        
                    </div>
                </div>

                
            </div>

        </>
    );
}

export default TodoItem;
