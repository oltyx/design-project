import React from 'react';
import { useHistory, withRouter  } from "react-router-dom";

// Landing page
export default function Start() {
    
  let history = useHistory();

  function handleClick() {
    history.push("/feedback");
  }
    return(
        <div>
            <button onClick={handleClick}>Start</button>
        </div>
    )
}