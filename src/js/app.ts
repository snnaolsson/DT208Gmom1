var btn = document.getElementById("addCourseBtn");
var deleteAllBtn = document.getElementById("deleteAll");
const courseContainer = document.getElementById("allCourses");
//skapar variabeln courses och att den är av typen Courseinfo[] - sparar den i localstorage
let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");
console.log(courses);
//sätter eventlistener till knapp som kör funktionen addcourse
btn?.addEventListener("click", addCourse);
deleteAllBtn?.addEventListener("click", () => {
  localStorage.clear();
  printCourses;
});
window.onload = printCourses;

//interface för kursintro
interface CourseInfo {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

//funktion för att lägga till ny kurs
function addCourse() {
  const kurscode = (
    document.getElementById("kurskod") as HTMLInputElement
  ).value.toUpperCase();
  const kursname = (document.getElementById("kursnamn") as HTMLInputElement)
    .value;
  const kursprogInput = (
    document.getElementById("progression") as HTMLInputElement
  ).value.toUpperCase();
  let kursprog: string;
  const kurssylla = (document.getElementById("kursplan") as HTMLInputElement)
    .value;

  //kollar alla element i courses, om något av dem har samma codevärde som kurscode
  const doubles = courses.some((course) => course.code == kurscode);
  //om doubles är falsk - det finns alltså ingen kurs i arrayen med samma kurskod så fortsätter funktionen annars skrivs felmeddelande ut och funktionen avbryts
  if (!doubles) {
    //om input för progression är någon av de tillåtna värdena så sätts kursprog till det värdet, annats skrivs felmeddelande ut och funktionen avbryts
    if (
      kursprogInput === "A" ||
      kursprogInput === "B" ||
      kursprogInput === "C"
    ) {
      kursprog = kursprogInput;
    } else {
      console.log(
        "Ogiltig progression! Progression kan endast vara A, B eller C"
      );
      return;
    }

    //skapar ny kurs utifrån interface CourseInfo och sätter egenskaperna till variablerna som har input hämtad från DOM
    const newCourse: CourseInfo = {
      code: kurscode,
      name: kursname,
      progression: kursprog,
      syllabus: kurssylla,
    };
    courses.push(newCourse); //pushar till arrayen courses
    localStorage.setItem("courses", JSON.stringify(courses)); //sparar courses i localstorage

    printCourses();
  } else {
    console.log("Kurskoden finns redan. Kurskoden måste vara unik!");
  }
}

//funktion för att skriva ut kurser till DOM
function printCourses() {
  while (courseContainer?.firstChild) {
    courseContainer.removeChild(courseContainer.firstChild);
  }
  for (let i = 0; i < courses.length; i++) {
    let courseLi = document.createElement("li");
    courseLi.textContent =
      courses[i].code +
      courses[i].name +
      courses[i].progression +
      courses[i].syllabus;
    courseContainer?.appendChild(courseLi);

    //courseLi.addEventListener("click", () => {});
  }
}

//funktion för att uppdatera kurs
