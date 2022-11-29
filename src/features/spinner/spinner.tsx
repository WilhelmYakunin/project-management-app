import { cn as bem } from "@bem-react/classname"
import Freezer from '../freezer/freezer'
import "./default.css"

const Spinner = () => {
    const cn = bem('Spinner')

    const Sircle = () => (
        <div data-testid={cn()} className={cn()}>
            <div className={cn({default: true})} />
        </div>
        )

    return (
        <Freezer>
            <Sircle />
        </Freezer>
    )
}  

export default Spinner    
