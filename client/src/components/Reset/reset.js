import React from "react";
import Axios from 'axios';
import { useState } from "react";
import styl from "./reset.module.css";
import { useNavigate } from "react-router-dom";
import sawl from 'sweetalert'

function ReSet() {
    const navigate = useNavigate()

    const [loginStatus, setLoginStatus] = useState("");

    const [resetData, setResetData] = useState({
        email: '',
        password: '',
        confirmation:''
    });


    const reset = () => {
        Axios.post('http://localhost:3001/reset', {
            email: resetData.email,
            password: resetData.password,
            confirmation: resetData.confirmation
        }).then((response) => {
            console.log(response)
           if(response.data.affectedRows>0){
            sawl('Success!','good, the password had been changed','success')
            navigate('/')
           }else{
            sawl('Oops!',response.data.message,'error')
           }

        });
    };
    



    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('uil-eye-slash')

    const handleToggle = () => {
        if (type === 'password') {
            setIcon('uil-eye');
            setType('text')
        }
        else {
            setIcon('uil-eye-slash')
            setType('password')
        }
    }



    const handleChange = (e) => {
        setResetData({ ...resetData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(resetData);
    }



    return (
        <div className='Rr'>

            <div className={styl.container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={styl.formtitle}>
                        Restauration
                    </h2>
                    <div className={styl.control}>
                        <input
                            type="text"
                            className="f-email"
                            placeholder="E-mail"
                            name="email"
                            value={resetData.email}
                            onChange={handleChange}
                        />
                        <i className="uil uil-envelope icon"></i>
                    </div>

                    <div className={styl.control}>
                        <input
                            type={type}
                            className="f-password"
                            placeholder="new password"
                            minLength='8'
                            name='password'
                            value={resetData.password}
                            onChange={handleChange}
                        />
                        <i onClick={handleToggle} className={icon}></i>
                    </div>

                    <div className={styl.control}>
                        <input
                            type={type}
                            className="f-password"
                            placeholder="confirm password"
                            minLength='8'
                            name='confirmation'
                            value={resetData.confirmation}
                            onChange={handleChange}
                        />
                        <i onClick={handleToggle} className={icon}></i>
                    </div>
                    <div style={{ marginTop: '20px', marginLeft: '130px' }}  className="g-recaptcha" data-sitekey="6LftKMYgAAAAAAkmgbzhGqCccfAa8TnZVNxQ5r-X"></div>
                    <button onClick={reset} className={styl.logbtn}>Soumettre</button><br />

                    <a onClick={() => { navigate('/') }} className={styl.linkpass} href="">s'authentifier </a>

                    <h2>{loginStatus}</h2>


                </form>
            </div>
            
        </div>
    )
}
export default ReSet
