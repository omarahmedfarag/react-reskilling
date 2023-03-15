import { Fragment } from "react";
import { Audio } from "react-loader-spinner";
import "./Spinner.css"
function Spinner()
{
    return (
        <Fragment>
            <div className="back-drop">
                <Audio
                height="80"
                width="80"
                radius="9"
                color="#6C63FF"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
            </div>
        </Fragment>
    )
}
export default Spinner;