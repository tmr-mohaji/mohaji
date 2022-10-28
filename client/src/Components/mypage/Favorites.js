
const Favorites = (props) => {
    
    const event = props.event;
    return(
        <div>
            {
                event.map((value) => {
                    return(
                        <div key={value.id}>
                            <p>{value.title}</p>
                            <img src={'/img/'+ value.filename} style={{width:'200px'}} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;