let dataExcelEnglish = null
let dataExcelVietnamese = null
let EngData = null
let VieData = null
let WordEnglish = null
let WordVietnamese = null
let Answer = []
let CorrectAnswer = null
const AnswerText = document.querySelectorAll(".text2")
const Question = document.querySelector(".Question")
function showUIAnswer(){
  Question.textContent = WordEnglish
  for (let i=0;i<=3;i++){
    AnswerText[i].textContent = Answer[i]
  }
}
function setDataQuestion(){
  Answer = []
  let dataEng = [...EngData]
  let dataVie = [...VieData]
  let a = Math.floor(Math.random()*dataEng.length)
  let b = Math.floor(Math.random()*4)
  WordEnglish = dataEng[a]
  wordVietnamese = dataVie[a]
  let OtherVie = [...dataExcelVietnamese].filter(x => x!==dataVie[a])
  Answer[b] = dataVie[a]
  CorrectAnswer = b
  EngData.splice(a,1)
  VieData.splice(a,1)
  for (let i=0;i<=3;i++){
    if (Answer[i] === undefined){
      let index = Math.floor(Math.random()*OtherVie.length)
      let Vie = OtherVie[index]
      Answer[i] = Vie
      OtherVie.splice(index,1)
    }
  }
  showUIAnswer()
}
function loadDataFromExcel(){
  fetch("Ôn tập từ vựng.xlsx")
  .then(res => res.arrayBuffer())
  .then(data => {
    let workbook = XLSX.read(data)
    let sheet = workbook.Sheets[workbook.SheetNames[0]]
    let result = XLSX.utils.sheet_to_json(sheet)
    dataExcelEnglish = result
    .filter(row=>row.English)
    .map(row=>row.English)
    dataExcelVietnamese = result
    .filter(row=>row.Vietnamese)
    .map(row=>row.Vietnamese)
    EngData = [...dataExcelEnglish]
    VieData = [...dataExcelVietnamese]
    setDataQuestion()
  })
}
document.addEventListener("DOMContentLoaded", loadDataFromExcel())

const BtnAnswer = document.querySelectorAll(".answer")
const NextQues = document.querySelector(".NextQues")
let choseAnswer = false
BtnAnswer.forEach((btn,index)=>{
  btn.addEventListener("click",()=>{
    if (choseAnswer === false){
      choseAnswer = true
      if (index===CorrectAnswer){
        btn.style.backgroundColor = "green"
      }
      else{
        btn.style.backgroundColor = "rgb(200,0,0)"
        BtnAnswer[CorrectAnswer].style.backgroundColor = "green"
      }
      NextQues.style.display = "block"
    }
  })
})
NextQues.addEventListener("click",()=>{
  choseAnswer = false
  NextQues.style.display = "none"
  for (let i=0;i<=3;i++){
    BtnAnswer[i].style.backgroundColor = "rgb(100,100,100)"
  }
  setDataQuestion()
})