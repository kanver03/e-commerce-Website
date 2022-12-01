import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div>
            <h1>Oops... Wrong Url </h1>
            <h1>Click on button to go back to home page</h1>
            <Link to = "/"><button>Back  to Home Page</button></Link>
        </div>
    );
}

export default Error;