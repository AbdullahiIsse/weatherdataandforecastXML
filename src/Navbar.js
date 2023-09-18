import {Link, Outlet} from "react-router-dom";
import "./Navbar.scss";
import {Fragment} from "react";


export default function Navbar() {

    return (
        <Fragment>
            <div className='navigation'>
                <div className='nav-links-container'>

                    <Link className='nav-link' to='/'>
                        Weather
                    </Link>

                    <Link className='nav-link' to='/Addweather'>
                        Addweather
                    </Link>

                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}
