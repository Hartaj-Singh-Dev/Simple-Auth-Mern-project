import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Styles/Error.css"

const Error = () => {
    return (
        <React.Fragment>
            <div id="notfound">
                <div className="notfound">
                    <div className="not-found-404">
                        <h1 className='err'>404</h1>
                    </div>
                    <h2>We are Sorry, Page Not Found</h2>
                    <p className="mb-5">
                        the page which you are loking for doesn't exist
                   </p>
                   <NavLink to='/'>Back to Home</NavLink>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Error
