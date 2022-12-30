import Feels from "./Icons/Feels"
import Humidity from "./Icons/Humidity"
import Pop from "./Icons/Pop"
import Pressure from "./Icons/Pressure"
import Visibility from "./Icons/Visibility"
import Wind from "./Icons/Wind"

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' |'pop'
  title: string
  info: string | JSX.Element
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop
}

const Box = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]
  return (
    <div className="box-container">
      <div>
        <Icon /> <h4>{title}</h4> 
      </div>
      <h3>{info}</h3>
      <p>{description}</p> 
    </div>
  )
}

export default Box
