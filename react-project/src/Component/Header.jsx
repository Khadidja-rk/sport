import React from 'react'
import { Outlet } from 'react-router-dom'



function Header(props) {

  return (

     <div style={{display:'flex',flexDirection:'row', gap:'50px'}}>
  <div>
<div  style={{height:'1000vh',marginRight:'300px',position:'fixed',backgroundColor:'royalblue'}} className="sidebar sidebar-narrow border-end">
  <div className="sidebar-header border-bottom">
    <div style={{color:'white'}} className="sidebar-brand">PMS</div>
  </div>
  <ul className="sidebar-nav">
    <li  className="nav-item">
      <a className="nav-link" href="#">
        <i style={{color:'black'}} className="nav-icon cil-speedometer"></i>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">
        <i  className="nav-icon cil-speedometer"></i>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://coreui.io"/>
        <i style={{color:'black'}} className="nav-icon cil-cloud-download"></i>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="https://coreui.io/pro/">
        <i style={{color:'black'}} className="nav-icon cil-layers"></i>
      </a>
    </li>
  </ul>
</div>
</div>

{props.children}

</div>
  )
}

export default Header