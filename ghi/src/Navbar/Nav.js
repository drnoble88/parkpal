import "./Navstyle.css";
import { useLogoutMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [logout] = useLogoutMutation()
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        logout();
        e.preventDefault();
        navigate('/login')
    }

    return (
        <>
         <nav>
            <div className='logo'>
                <img src= "https://img.favpng.com/5/11/16/polar-bear-canidae-sticker-giant-panda-png-favpng-KDcZAzsytJkxTQbWJBrZxczUc.jpg" />
                <h1 className='title'>
                    Parkpal
                </h1>
            </div>
            <div>
                <ul id="navbar">
                    <li>
                        <a className ="active" href="index.html"> Home </a>
                    </li>
                    <li>
                        <a className ="active" href="index.html"> HOLDER </a>
                    </li>
                    <li>
                        <a className ="active" href="index.html"> Account </a>
                    </li>
                    <li>
                        <button className ="button-5" role="button" onClick={handleLogout}> Logout </button>
                    </li>

                </ul>
            </div>
         </nav>
        </>

    )

}

export default Navbar;
