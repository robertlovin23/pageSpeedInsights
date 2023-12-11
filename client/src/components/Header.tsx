import {useEffect} from 'react';
import { useActions } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { render } from '@testing-library/react';

interface HeaderProps{
    authData: {
        googleId: string;
        userImage: string;
    }
}


const Header: React.FC<HeaderProps> = ({authData}) => {
    const { fetchUser } = useActions();

    useEffect(() => {
        fetchUser();
    }, [])

    const renderAuthHeader = () => {
        if(!authData){
            return <a href={`/auth/google`} className="btn btn-primary" >Login</a>
        } else {
            return(
                <div>
                    <img src={authData.userImage} style={{float:"left", width: "37px", height:"37px", marginRight:"10px", marginTop:"1px", borderRadius: "5px"}}/>
                    <a style={{marginRight: '5px'}} href={`/profile/${authData.googleId}`} className="btn btn-primary" >Profile</a>
                    <a href={`/api/logout`} className="btn btn-secondary" >Logout</a>      
                </div>
            ) 
        }
    }

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">SpeedyChat</a>
        {renderAuthHeader()}
        </div>
    </nav>
    )
}

export default Header