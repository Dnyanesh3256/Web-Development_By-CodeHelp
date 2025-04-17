import UserCard from "./components/UserCard"

import dt from './assets/dt.jpg'
import vk from './assets/vk.png'
import jd from './assets/jd.png'

function App() {

  return (
    <div className="container">
      <UserCard name="Dnyaneshwar Tupe" desc="Engineering Student" image={dt} style={{"border-radius":"10px"}}/>
      <UserCard name="John Doe" desc="Programming Example" image={jd} style={{"border-radius":"10px"}}/>
      <UserCard name="Virat Kohli" desc="Indian Cricketer" image={vk} style={{"border-radius":"10px"}}/>
    </div>
  )
}

export default App
