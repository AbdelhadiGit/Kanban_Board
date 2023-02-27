import React from "react";
import Axios from 'axios';
import { useState } from "react";
import style from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import sawl from 'sweetalert'


function SignUp() {
    



    const navigate = useNavigate();


    const [type,setType] = useState('password');
    const [icon,setIcon] = useState('uil-eye-slash')

    const handleToggle = () => {
        if(type === 'password'){
            setIcon('uil-eye');
            setType('text')
        }
        else{
            setIcon('uil-eye-slash')
            setType('password')
        }
    }

    
   

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        firstname:'',
        lastname:'',
        establishment:'',
        confirmation:'',
        ischecked: false
    });

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            email: registerData.email,
            password: registerData.password,
            firstname: registerData.firstname,
            lastname: registerData.lastname,
            establishment: registerData.establishment,
            confirmation: registerData.confirmation,
            ischecked: registerData.ischecked
        }).then((response) => {
            console.log(response);
            if(response.data.message=='registred succesfully'){
                sawl('Congrats!',response.data.message,'success')
                navigate('/')


            }
            else{
                sawl('Oops!',response.data.message,'error')

            
            }
        })
        
    };

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerData);
    }



    return (
        <div classname='sr'>
            <div className={style.container}>
                <form onSubmit={handleSubmit}>
                    <h2 className={style.formtitle}>
                        S'inscrire
                    </h2>
                    <div className={style.control}>
                        <input
                            type='text'
                            className='f-lastname'
                            placeholder="Nom"
                            name='lastname'
                            value={registerData.lastname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={style.control}>
                        <input
                            type='text'
                            className='f-firstname'
                            placeholder="Prenom"
                            name='firstname'
                            value={registerData.firstname}
                            onChange={handleChange}
                        />
                    </div>

                    <div id='box' className={style.control}>
                        <input
                            type="text"
                            className="f-email"
                            placeholder="E-mail"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                        />
                        <i className="uil uil-envelope icon"></i>
                    </div>
                    <div className={style.control}>
                        <select className={style.festablishment} placeholder="Etablissement" name='establishment' value={registerData.establishment} onChange={handleChange}>
                            <option value='Etablissement'>Etablissement</option>
                            <option className='op1' value='INPT'>INPT</option>
                            <option className='op1' vlaue='ENSIAS'>ENSIAS</option>
                            <option className='op1' value='EMI'>EMI</option>
                        </select>
                    </div>


                    <div id='box' className={style.control}>
                        <input
                            id='password'
                            type={type}
                            className="f-password"
                            placeholder="password"
                            minLength='8'
                            name='password'
                            value={registerData.password}
                            onChange={handleChange}
                        />
                        <i onClick={handleToggle} id='togglePassword' className={icon}></i>
                    </div>
                    <div id='box' className={style.control}>
                        <input
                            id='password'
                            type={type}
                            className="f-confirm"
                            placeholder="Confirmer mot de passe"
                            minLength='8'
                            name='confirmation'
                            value={registerData.confirmation}
                            onChange={handleChange}
                        />
                        <i onClick={handleToggle} id='togglePassword' className={icon}></i>
                    </div>

                    <li>

                        <input type='checkbox' className='terms' name='ischecked' value={registerData.ischecked} onChange={handleChange} />
                        <p>j'accepte les terms et conditions</p>
                    </li>



                    <div style={{ marginTop: '20px', marginLeft: '130px' }} className="g-recaptcha"  data-sitekey="6LftKMYgAAAAAAkmgbzhGqCccfAa8TnZVNxQ5r-X"></div>
                    <button onClick={register} type='submit' className={style.logbtn}>Soumettre</button>




                </form>
            </div>
       </div>
    )
}
export default SignUp




