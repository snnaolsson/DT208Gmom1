var btn = document.getElementById("addCourseBtn");
var deleteAllBtn = document.getElementById("deleteAll");
const courseContainer = document.getElementById("allCourses");
const courseListEl = document.getElementById("course-list");
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

function deleteCourse(code: string) {
  let indx = courses.findIndex((course) => course.code === code);
  courses.splice(indx, 1);
  localStorage.setItem("courses", JSON.stringify(courses));
  printCourses();
}

//funktion för att skriva ut kurser till DOM
function printCourses() {
  while (courseListEl?.firstChild) {
    courseListEl.removeChild(courseListEl.firstChild);
  }
  for (let i = 0; i < courses.length; i++) {
    if (courseListEl) {
      let coursetr = document.createElement("tr");
      coursetr.id = `course${courses[i].code}`;
      coursetr.innerHTML = `
      <td contenteditable="true"> ${courses[i].name}</td >
      <td contenteditable="true"> ${courses[i].code}</td>
      <td contenteditable="true"> ${courses[i].progression}</td>
      <td contenteditable="true"> ${courses[i].syllabus}</td>
      `;
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Radera kurs";
      deleteBtn.addEventListener("click", () => {
        courses.splice(i, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        printCourses();
      });
      coursetr.appendChild(deleteBtn);

      let updateBtn = document.createElement("button");
      updateBtn.textContent = "Spara förändringar";
      updateBtn.addEventListener("click", () => {});
      coursetr.appendChild(updateBtn);
      courseListEl.appendChild(coursetr);
    }

    /*let courseLi = document.createElement("li");
    courseLi.textContent =
      courses[i].code +
      courses[i].name +
      courses[i].progression +
      courses[i].syllabus;
    courseLi.innerHTML = `<h4>${courses[i].name}</h4> <p><strong>Kurskod:</strong> ${courses[i].code}, <strong>Progression:</strong> ${courses[i].progression}, <strong>Kursplan:</strong> <a href="${courses[i].syllabus}">Länk till kursplan</a></p>`;
    courseLi.className = "course-list-item";
    courseContainer?.appendChild(courseLi);
    let deleteCourse = document.createElement("button");
    deleteCourse.textContent = "Radera kurs";
    courseLi.appendChild(deleteCourse);
    let updateCourse = document.createElement("button");
    updateCourse.textContent = "Uppdatera kurs";
    courseLi.appendChild(updateCourse);

    deleteCourse.addEventListener("click", () => {
      courses.splice(i, 1);
      localStorage.setItem("courses", JSON.stringify(courses));
      printCourses();
    });
    updateCourse.addEventListener("click", () => {
      let obj = courses.findIndex((course) => course.code == courses[i].code);
      courses[obj].code = newCode;
    });*/
  }
}

//funktion för att uppdatera kurs
//Lägg till knappar för att ändra och radera här ovan där kurserna skrivs ut
//vid klick så kör funktionen updateCourse med kurskod eller dyl och skicka med kurskod som parameter
//för att kunna ändra i arrayen och skicka sedan om till localstorage

function updateCourse() {}
