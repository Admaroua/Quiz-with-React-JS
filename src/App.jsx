
import './App.css'
import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
function App() {
  const [start, setStart]=useState(false)
  const [data, setData]=useState([])
  const [quizes,setQuizes]=useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Fetching data from open trivia API
  useEffect(() => {
      
      fetch("https://opentdb.com/api.php?amount=50&category=18&type=multiple")
        .then(response => response.json())
        .then(res => {
          setData(res.results);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          setError('Failed to fetch questions. Please try again later.');
          setLoading(false);
        })
    
  }, []);
  
  function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // every time get 4 questions from to fetching data
  function generateQuestions(){
    const quest= [];
    if(data && data.length>0){
      for(let i=0;i<4;i++){
        const randomNumber= Math.floor(Math.random() * data.length);
        const question=data[randomNumber]
        // Shuffle the answers array
        const answers = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(answers);
        quest.push({
          question: question.question,
          correct_answer: question.correct_answer,
          answers: answers,
        })
      }
      setQuizes(quest);
      setStart(true)}else{setLoading(true)}
  }
  
  

  return (
    <div className='relative flex flex-col justify-center items-center w-[900px] min-h-[600px] bg-slate-50 rounded-sm overflow-hidden'>
      {!start && 
      <div>
      <h1 className='font-medium text-3xl'> Quizzical</h1>
      
      </div>}
      {start && (
          <div className='flex flex-col items-start z-10 mt-4 gap-4 w-full'>
            {quizes.map((question, index) => (
              <Quiz 
              key={index} 
              question={question.question} 
              correct_answer={question.correct_answer} 
              answers={question.answers}
              />
            ))}
            
          </div>
          )
      }
      <button className=' max-w-fit bg-purple-800 h-10 rounded-xl px-8 py-2 text-white my-4' onClick={generateQuestions} >{start ? "Play again" : "Start quiz"}</button>
      {loading && !error && <p>Data not available yet. Please wait.</p>}
      {error && <p>{error}</p>}
      
      <div className='shape absolute top-[-70px] right-[-10px] bg-yellow-100 transform rotate-90'></div>
      <div className='shape absolute bottom-[-70px] left-[-40px] bg-purple-200 transform rotate-45'></div>
    </div>
  )
}
export default App
