import React, { Component } from 'react';
import {  NavLink,Link } from 'react-router-dom';


import axios from 'axios';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      "menus": [],
      "menuwithsub": [],
      "menuwithmega": []
    }
  }
  async componentDidMount() {
    await axios.get(`/allmenus`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':localStorage.getItem('auth')
      }
    }).then(data => {
      if (data.data.length)
        this.setState({ menus: data.data[0].menus, menuwithsub: data.data[0].menuwithsub, menuwithmega: data.data[0].menuwithmega })


    })
  }
  render() {

  

    return (

      <div className="row sticky-top">
        <div className="col-lg-12">
          <div className="mynav ">
            <div className="subnav">
              <button className="subnavbtn"><NavLink to="/">Home</NavLink> </button>
            </div>
           
            {this.state.menus.map((data, index) => {
              return (
                <div className="subnav" key={index}>
                  <button className="subnavbtn" ><NavLink to={"/topic/" + data}> {data} </NavLink> </button>
                </div>
              )
            })}

            {this.state.menuwithsub.map((data, index) => {
              return (
                <div className="subnav" key={index}>
                  <button className="subnavbtn"> {data.name} <i className="fa fa-caret-down"></i> </button>
                  <div className="subnav-content">
                    {data.submenus.map((subdata, index) => {
                      return (
                        <NavLink to={"/topic/" + subdata} data={subdata} key={index}>{subdata}</NavLink>
                      )

                    })}


                  </div>
                </div>
              )
            })}


<div className="mymegamenu" >
              <button className="dropbtn"><NavLink to="/">Cse_Study<i className="fa fa-caret-down"></i></NavLink>
              </button>

              <div className="mymegamenu-content">
                <div className="row">
                  <div className="column">
                    <h3>Robotics</h3>
                    <Link to="topic/Raspberrypy">Raspberry py</Link>
                    <Link to="topic/Aurduno">Aurduno</Link>
                    <Link to="topic/Humanoid">Humanoid</Link>
                  </div>
                  <div className="column">
                    <h3>Networking</h3>
                    <Link to="topic/Theory">Theory</Link>
                    <Link to="topic/Cisco">Cisco</Link>
                    <Link to="topic/Practicals">Practicals</Link>
                  </div>
                  <div className="column">
                    <h3>Others</h3>
                    <Link to="topic/Algorithoms">Algorithoms</Link>
                    <Link to="topic/Autometa">Autometa</Link>
                    <Link to="topic/codecheflebel3">Computer Archetectur</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mymegamenu" >
              <button className="dropbtn"><NavLink to="/">Programming-Q<i className="fa fa-caret-down"></i></NavLink>
              </button>

              <div className="mymegamenu-content">
                <div className="row">
                  <div className="column">
                    <h3>UVA</h3>
                    <Link to="topic/ulebel1">Level-1</Link>
                    <Link to="topic/ulebel2">Level-2</Link>
                    <Link to="topic/ulebel3">Level-3</Link>
                  </div>
                  <div className="column">
                    <h3>Codeforces</h3>
                    <Link to="topic/Codeforceslebel1">Level-1</Link>
                    <Link to="topic/Codeforceslebel2">Level-2</Link>
                    <Link to="topic/Codeforceslebel3">Level-3</Link>
                  </div>
                  <div className="column">
                    <h3>Codecheaf</h3>
                    <Link to="topic/codecheflebel1">Level-1</Link>
                    <Link to="topic/codecheflebel2">Level-2</Link>
                    <Link to="topic/codecheflebel3">Level-3</Link>
                  </div>
                </div>
              </div>
            </div>



            <div className="subnav">
              <button className="subnavbtn"><NavLink to="/makequestion">Make Question</NavLink> </button>
            </div>
            <div className="subnav">
              <button className="subnavbtn"><Link to="https://kb-quiz.herokuapp.com/" target="_blank">Play Quiz</Link></button>
            </div>
            

            {/* <div className="subnav">
              <button className="subnavbtn"><NavLink  to="/SupperAdminDashboard">Supper Admin</NavLink> </button>
            </div> */}
           

           <div className="subnav">
              <button className="subnavbtn " id="dropdownMenu2" data-toggle="dropdown"><NavLink to="/"> <i className="fa fa-caret-down"></i></NavLink> </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button className="dropdown-item" type="button"><NavLink  to="/userlogin">Uer Login</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/userregister">User Register</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/adminregister">Become Writter?</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/adminlogin">Writter Login</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/writterdashboard">Writter Dashboard</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/Superadminlogin">Admin Login</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/SupperAdminDashboard">Admin Dashboard</NavLink></button>
    <button className="dropdown-item" type="button"><NavLink  to="/logout">Log Out</NavLink></button>
  </div>
  
            </div>

 
          </div>

        </div>
      </div>



    );
  }
}

export default Header;