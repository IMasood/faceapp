import React from 'react';


const Rank = ({uname,entries}) =>{

    return (
       <div>
           <div className = 'white f3'>
                {`${uname}, Your current rank is...`}
           </div>
           <div className = 'white f1'>
                {entries}
           </div>
       </div>
    );
}

export default Rank;