export default function Error({title, description}){
    return(
        <div className="error-box">
            <h1><span className="material-icons">priority_high</span>{title}</h1>
            {description}
            <div className="error-bar"></div>
        </div>
    )
}