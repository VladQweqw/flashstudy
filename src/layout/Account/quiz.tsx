import {useState, useEffect, useRef} from 'react'
import { questionType } from '../../functions/types';
import { correctPhrases, wrongPhrases, slowSlideAniamte, slowSlideInitial, togglePopup } from '../../functions/functions';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { API } from '../../functions/API';
import Loader from '../../components/loader';
import { useMutation } from 'react-query';

export default function Quiz() {
   const [questionIndex, setQuestionIndex] = useState(0);
   const [shuffledAnswers, setShuffledAnswers] = useState<{answer: string, isCorrect: boolean}[]>([])
   const [statusMessage, setStatusMessage] = useState<string>('')
   const [isQuestionAnswered, setIsQuestionAnswered] = useState<boolean>(false)
   const [answers, setAnswers] = useState<{correct: number, wrong: number}>({correct: 0, wrong: 0})

   const footer = useRef<HTMLDivElement | null>(null);
   const navigate = useNavigate();
   const { id } = useParams();
   
   const {
      status,
      data,
  } = useQuery({
      queryFn: () => API({
          method: 'GET',
          url: `slide?id=${id}`,
          data: null,
          headers: {
              authorization: ''
          }
      }),
      queryKey: ['card', parseInt(id!)]
  })

   useEffect(() => {
      if(data?.data) {
         shuffleAnswers()
      }
      
   }, [questionIndex, data])

   function checkAnswer(answer: boolean, element: HTMLDivElement) {
      if(isQuestionAnswered) return;
      
      let correctIdx = shuffledAnswers.findIndex((item: questionType) => item.isCorrect === true)
      
      document.querySelectorAll('.answer').forEach((answer) => {
         answer.classList.add('answer-wrong');
      })
      document.querySelectorAll('.answer')[correctIdx].classList.add('answer-correct');

      element.classList.add('answer-selected');

      if(answer) {
         setStatusMessage(
            correctPhrases[Math.floor(Math.random()*correctPhrases.length)]
         )

         setAnswers((prev: any) => {
            return {correct: prev.correct + 1, wrong: prev.wrong}
         })
      }else {

         setStatusMessage(
            wrongPhrases[Math.floor(Math.random()*wrongPhrases.length)]
         )

         setAnswers((prev: any) => {
            return {correct: prev.correct, wrong: prev.wrong + 1}
         })
      }
      
      setIsQuestionAnswered(true)
      footer.current?.classList.add('footer-active');
   }

   function shuffleAnswers() {
      if(data?.data.length < 4) {
         navigate(-1);
         return togglePopup('Not enough cards', 'ERROR');
      }
      
      const formated = [];
      
      formated.push({
         answer: data?.data[questionIndex].answer,
         isCorrect: true
      })

      for(let i = 1; i <= 3; i++) {
         
         formated.push({
            answer: data?.data[(questionIndex + i) % data?.data.length].answer,
            isCorrect: false
         })
      }

      formated.sort(() => Math.random() - .5);      
      setShuffledAnswers(formated)
   }

   function nextQuestion() {
      footer.current?.classList.remove('footer-active');
      setIsQuestionAnswered(false)

      document.querySelectorAll('.answer').forEach((answer) => {
         answer.classList.remove('answer-wrong');
         answer.classList.remove('answer-correct');
         answer.classList.remove('answer-selected');

      })


      if(questionIndex > data?.data.length - 2) {
         return setQuestionIndex(0)
      }
      if(questionIndex < 0) {
         return setQuestionIndex(data?.data.length - 1);
      }

      setQuestionIndex((prev) => prev + 1);

   }

   return(
    <motion.div 
    initial={slowSlideInitial}
    animate={slowSlideAniamte}
    className="quiz-wrapper"> 

      <div className="quiz">
         {status === 'loading' && <Loader />}

         {questionIndex >= data?.data.length - 1 ? 
            <QuizResult {...answers} /> :
            <>
               <div className="quiz-progress">
                  <div className="quiz-progress-value">
                     <span>{questionIndex + 1}</span> / <span>{data?.data.length}</span>
                  </div>
               </div>

               <div className="question-wrapper">
                     <h1 id='question' className="question m2">
                        {data?.data[questionIndex].question}
                     </h1>
               </div>
               
               <div className="answers">
                  {shuffledAnswers && shuffledAnswers.map((question: questionType, index: number) => {
                     const {answer, isCorrect} = question;

                     return  <Answer char={
                        String.fromCharCode(65 + index)
                     } answer={answer} isCorrect={isCorrect} checkAnswer={checkAnswer} key={index} />
                  })}
               </div>

               <div ref={footer} className="footer ">
                  <h1 className="message m3">{statusMessage}</h1>

                  <button className="next-question" onClick={() => nextQuestion()}>
                     <i className="fa-solid fa-arrow-right"></i>
                  </button>
               </div>
            </>
         }

      </div>
   </motion.div>
   )
}

function QuizResult(data: {correct: number, wrong: number}) {
   const navigate = useNavigate()
   const { id } = useParams();

   const { 
      status,
      mutate
    } = useMutation({
      mutationFn: API,
      
    })
   
   useEffect(() => {      
      mutate({
         url: 'stats/create',
         method:'POST',
         data: {
            CorrectAnswer: data.correct,
            groupId: id,
            WrongAnswer: data.wrong
         },
         headers: {
            authorization: '',
            "Content-Type": "multipart/form-data",
         },
       })
   
   }, [])
   
   return(
      <div className="quiz-result">
         <h1 className="quiz-result-message m1">
            {data.correct > data.wrong ? 'Well done!' : 'Next time'}
         </h1>
            <div className="result-wrapper">
               <div className="result">
                  <h1 className="answer-count " id='correct-answer'>{data.correct}</h1>
                  <p className="answer-text m4">Correct</p>
               </div>
               <div className="result">
                  <h1 className="answer-count" id='wrong-answer'>{data.wrong}</h1>
                  <p className="answer-text m4">Wrong</p>
               </div>
            </div>

            <div className="btn-wrapper">
               <button className="secondary-btn" onClick={() => navigate('/account/cards')}>Home</button>
               <button className="primary-btn" onClick={() => navigate('/account/stats')}>See stats</button>
            </div>
      </div>
   )

}

const Answer = (props: {
   answer: string,
   isCorrect: boolean,
   char: string,
   checkAnswer: any,
}) => {
   const {answer, isCorrect, checkAnswer, char} = props;   
   
   return(
      <div className="answer" onClick={(e) => checkAnswer(isCorrect, (e.target as HTMLElement).closest('.answer'))}>
         <span className="answer-index m5">{char}</span>
         <p className="answer-text m4">{answer}</p>
      </div>
   )

}