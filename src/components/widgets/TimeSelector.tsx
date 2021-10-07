
const DEFAULT_TIME : [number,number] = [17,0];

export default function TimeSelector() {
    return <div>
        <div>
            <span className="material-icons">
                keyboard_arrow_up
            </span>
            <span className="material-icons">
                keyboard_arrow_up
            </span>
        </div>
        <div>
            {DEFAULT_TIME[0]}:{DEFAULT_TIME[1]}
        </div>
        <div>
            <span className="material-icons">
                keyboard_arrow_down
            </span>
            <span className="material-icons">
                keyboard_arrow_down
            </span>
        </div>
    </div>
    ;
}