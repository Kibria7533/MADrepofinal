import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Dashbordmenu.css'
import { Link } from 'react-router-dom';

import {
    CButton,
   
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,


    
    CFormGroup,
   
    CTextarea,
    CInput,
  
    CLabel,
   
} from '@coreui/react'


const WritterDashboard = () => {

    const [data, setdata] = useState([])
    const [effect, seteffect] = useState(false);
   
    const [large, setLarge] = useState(false)
    const [Topic, setTopic] = useState("")
    const [ch, setCh] = useState("")
    const [editablechapter, setEditablechapter] = useState("")
    const [contentinput, setContentinput] = useState("")
    const [codeinput, setCodeinput] = useState("")
    const [longdescriptioninput, setLongdescriptioninput] = useState("")


    const deletefn = async ({ topic, ch }) => {
        await axios.post(`/deletechapter`, { topic, ch }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth':localStorage.getItem('auth')
            }
        }).then(data => {
            console.log(data);
            seteffect(data)



        }).catch(err => {
            console.log(err);
        })

    }

    const setedit = async (Topic, ch) => {
        setTopic(Topic);
        setCh(ch);
        await axios.post(`/getchapter`, { Topic, ch }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth':localStorage.getItem('auth')
            }
        }).then(data => {
            console.log(data.data);

            setEditablechapter(data.data[0].posts[0].ch)
            setContentinput(data.data[0].posts[0].intro)
            setCodeinput(data.data[0].posts[0].code)
            setLongdescriptioninput(data.data[0].posts[0].blogtext)

            setLarge(!large);

        }).catch(err => {
            console.log(err);
        })

    }
  const  Editablechapter=(e)=>{
        setEditablechapter(e.target.value);
    }
const Contentinput=(e)=>{
    setContentinput(e.target.value);
}
const Codeinput=(e)=>{
  setCodeinput(e.target.value)
}
const Longdescriptioninput=(e)=>{
 setLongdescriptioninput(e.target.value);
}

const saveedit=async ()=>{
   await axios.post(`/updatechapter`,{"Topic":Topic,"ch":ch,"ech":editablechapter,"eintro":contentinput,"ecode":codeinput,"eblogtext":longdescriptioninput
},{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth':localStorage.getItem('auth')
        }
    }).then(data => {
       setLarge(!large);
       seteffect(data);
    

    }).catch(err => {
        console.log(err);
    })

}
    useEffect(() => {

        console.log(localStorage.getItem('auth'))
        axios.get(`/getall`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
                'auth':localStorage.getItem('auth')
            }
        }).then(reletedval => {

            setdata(reletedval.data)

        }).catch(err => {
            console.log(err);
        })
    }, [effect])

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
                    <ul id="portfolio-flters nav-item">
                    <li className="filter-active nav-link d-inline-flex"><Link  to="/Supperadmintables">Home</Link></li>
              <li className="filter-active nav-link d-inline-flex"><Link  to="/superadminforms">Forms</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/Topicstable">Topics Table</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/getcomment">Comments and Releted Posts</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/usersinfo">User's Info</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/PostQuestion">Add A Question</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/AllQuestion">All Question</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/homeinfo">Home Info</Link></li>

                    </ul>
                </div>
            </div>
            <div className="container">
                <Link  to="/">Back to Home</Link>
                <div className="col-md-12 ">
                    {data.map((value, index) => {
                        return (
                            <div key={index}>
                                <h1>{value.Topic}</h1>
                                <hr></hr>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Chapter</th>
                                            <th>EDIT</th>
                                            <th>DELETE</th>
                                        </tr>

                                        {value.posts.map((post, index) => {
                                            return (

                                                <tr key={index}>
                                                    <td>{post.ch}</td>
                                                    <td> <button type="submit" className="btn btn-primary" onClick={() => setedit(value.Topic, post.ch)} className="mr-1">Edit</button> </td>
                                                    <td> <button type="button" onClick={() => deletefn({ topic: value.Topic, ch: post.ch })} className="mr-1" >Delete</button></td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        )
                    })}
                </div>
            </div>




            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup>
                        <CLabel htmlFor="vat">Write chapter name</CLabel>
                        <CInput id="vat" name="chapter" value={editablechapter} placeholder="chapter" onChange={Editablechapter} />
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="textarea-input">Content intro here</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea
                                name="contentinput"
                                id="textarea-input"
                                rows="9"
                                value={contentinput}
                                placeholder="Content..."
                                onChange={Contentinput}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="textarea-input">Content code here</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea
                                name="codeinput"
                                id="textarea-input"
                                rows="9"
                                value={codeinput}
                                placeholder="Content..."
                                onChange={Codeinput}
                            />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="textarea-input">Content long description here</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea
                                name="longdescriptioninput"
                                id="textarea-input"
                                rows="9"
                                value={longdescriptioninput}
                                placeholder="Content..."
                                onChange={Longdescriptioninput}
                            />
                        </CCol>
                    </CFormGroup>

                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => saveedit()}>Save Edit</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default WritterDashboard
