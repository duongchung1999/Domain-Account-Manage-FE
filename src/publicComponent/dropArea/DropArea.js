import React, { useState } from "react";
import "./DropArea.css"

const DropArea = ()=>{
    const[showDrop,setShowDrop] = useState(false);
    return(
        <section 
            onDragEnter={()=>setShowDrop(true)} 
            onDragLeave={()=>setShowDrop(false)} 
            // className={showDrop?"drop_area":"hide_drop"}
            className="drop_area"
            >
                Drop here
        </section>
    )
}
export default DropArea