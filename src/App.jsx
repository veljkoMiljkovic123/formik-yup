import './App.css'
import FormComponent from './components/FormComponent'

function App() {
  

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-neutral-800'>
        <h1 className='text-3xl text-green-400'>Register Form</h1>
        <FormComponent />
    </div>
  )
}

export default App
