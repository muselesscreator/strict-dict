/* v8 ignore start */
import StrictDict from './StrictDict'

function App() {
  const exampleDict = StrictDict({ a: 1, b: 2, c: 3 });
  exampleDict['invalid-key'];
  return (
    <div>
      I've tried to access an invalid key!
    </div>
  )
}

export default App
