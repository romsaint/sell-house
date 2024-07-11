import { useContext, useEffect, useRef, useState } from 'react'
import '/public/Home.css'
import {AuthContext} from '/src/contexts/authContext'


export function Header(){
    const [isMobile, setIsMobile] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {user, setUser} = useContext(AuthContext)

  
    const reFmobileNavAuth = useRef()

    useEffect(() => {
        if(window.innerWidth < 1050){
            setIsMobile(true)
            reFmobileNavAuth.current.style.display = 'flex'
        }else{
            reFmobileNavAuth.current.style.display = 'none'
        }

        function handleResize(e){
            if(e.currentTarget.innerWidth < 1050){
                setIsMobile(true)
                reFmobileNavAuth.current.style.display = 'flex'
            }else{
                reFmobileNavAuth.current.style.display = 'none'
                setIsMobile(false)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    
    function handleMenuClick(){
        if(isMenuOpen){
            reFmobileNavAuth.current.style.top = '-20%'    
        }else{
            reFmobileNavAuth.current.style.top = '0%'
        }
       
        setIsMenuOpen(prev => !prev)
    }
    
 
    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <img src="/src/assets/Logo (3).svg" alt="Company logo" />
                </div>
                {isMobile
                ? <img onClick={handleMenuClick} src="/src/assets/menu-svgrepo-com.svg" alt="" className="menu-svg-open" />
                : 
                <>
                    <nav className="nav">
                        <ul className="nav-list">
                            <li className="list-item">
                                <a href="/" className="item-link">Home</a>
                            </li>
                            <li className="list-item">
                                <a href="" className="item-link">About</a>
                            </li>
                            <li className="list-item">
                                <a href="" className="item-link">Contact</a>
                            </li>
                            {user 
                                ?   <li className="list-item">
                                        <a href="/create-sell-house-offer" className="item-link">Create sell offer</a>
                                    </li>
                                : ""
                            }
                        </ul>
                    </nav>
                    <div className="header-auth">
                        <div className="signin">
                            <a href="/signin" className="signin-link">Sign in</a>
                        </div>
                        <div className="signup">
                            <a href="/signup">
                                <button className="signup-link">
                                    Sign up
                                </button>
                            </a>
                        </div>
                    </div>
                </>
                }
                <div ref={reFmobileNavAuth} className="mobile-nav-auth">
                    <nav className="nav-mobile">
                        <ul className="mobile-nav-list">
                            <li className="list-item">
                                <a href="" className="item-link">Home</a>
                            </li>
                            <li className="list-item">
                                <a href="" className="item-link">About</a>
                            </li>
                            <li className="list-item">
                                <a href="" className="item-link">Contact</a>
                            </li>
                            {user 
                                ?   <li className="list-item">
                                        <a href="/create-sell-house-offer" className="item-link">Create sell offer</a>
                                    </li>
                                : ""
                            }
                        </ul>
                    </nav>
                    <div className="mobile-auth">
                        <div className="signin">
                            <a href="/signin" className="signin-link">Sign in</a>
                        </div>
                        <div className="signup">
                            <a href="/signup">
                                <button className="signup-link">
                                    Sign up
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}