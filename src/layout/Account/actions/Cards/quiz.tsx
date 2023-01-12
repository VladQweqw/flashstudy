import {useState, useEffect, useRef} from 'react'
import { questionType } from '../../../../functions/types'
import { correctPhrases, wrongPhrases, quizArr } from '../../../../functions/functions'
import { motion } from 'framer-motion';
import { slowSlideAniamte, slowSlideInitial } from '../../../../functions/functions';
import { useNavigate } from 'react-router';

export default function Quiz() {
   const [questionIndex, setQuestionIndex] = useState(0);
   const [shuffledAnswers, setShuffledAnswers] = useState<any>([])
   const [statusMessage, setStatusMessage] = useState('')
   const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
   const footer = useRef<HTMLDivElement | null>(null);
   const [answers, setAnswers] = useState({correct: 0, wrong: 0})
 

   useEffect(() => {
      shuffleAnswers()

   }, [questionIndex])

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
      const formated = quizArr.map(({answer, question}) => {
         return {
            answer,
            isCorrect: quizArr[questionIndex].question === question,
         }
      });
               
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


      if(questionIndex > quizArr.length - 2) {
         return setQuestionIndex(0)
      }
      if(questionIndex < 0) {
         return setQuestionIndex(quizArr.length - 1);
      }

      setQuestionIndex((prev) => prev + 1);

   }

   return(
    <motion.div 
    initial={slowSlideInitial}
    animate={slowSlideAniamte}
    className="quiz-wrapper"> 

      <div className="quiz">

         {questionIndex >= quizArr.length - 1 ? 
            <QuizResult {...answers} /> :
            <>
               <div className="quiz-progress">
               <div className="quiz-progress-value">
                  <span>{questionIndex + 1}</span> / <span>{quizArr.length}</span>
               </div>
               </div>
               <div className="question-wrapper">
                  <h1 id='question' className="question">
                     {quizArr[questionIndex].question}
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
                  <h1 className="message">{statusMessage}</h1>

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
   
   return(
      <div className="quiz-result">
         <h1 className="quiz-result-message">
            {data.correct > data.wrong ? 'Well done!' : 'Next time'}
         </h1>
            <div className="result-wrapper">
               <div className="result">
                  <h1 className="answer-count" id='correct-answer'>{data.correct}</h1>
                  <p className="answer-text">Correct</p>
               </div>
               <div className="result">
                  <h1 className="answer-count" id='wrong-answer'>{data.wrong}</h1>
                  <p className="answer-text">Wrong</p>
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
         <span className="answer-index">{char}</span>
         <p className="answer-text">{answer}</p>
      </div>
   )

}