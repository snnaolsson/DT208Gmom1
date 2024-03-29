var btn = document.getElementById("addCourseBtn");
var deleteAllBtn = document.getElementById("deleteAll");
const courseContainer = document.getElementById("allCourses");
const courseListEl = document.getElementById("course-list");
//skapar variabeln courses och att den är av typen Courseinfo[] - sparar den i localstorage
let courses: CourseInfo[] = JSON.parse(localStorage.getItem("courses") || "[]");

//sätter eventlistener till knapp som kör funktionen addcourse
btn?.addEventListener("click", addCourse);

//skriver ut kurser i localstorage när fönstret laddas
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
      window.alert(
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
    window.alert("Kurskoden finns redan. Kurskoden måste vara unik!");
  }
}

//funktion för att skriva ut kurser till DOM
function printCourses() {
  //rensar alla befintliga kurser från DOM så att det inte står samma sak flera gånger
  while (courseListEl?.firstChild) {
    courseListEl.removeChild(courseListEl.firstChild);
  }
  //varje kurs skrivs ut till DOM och får 2 knappar med funktionalitet
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
      //knapp för att radera kurs, raderas från array och sparas om i localstorage.
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Radera kurs";
      deleteBtn.addEventListener("click", () => {
        courses.splice(i, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        printCourses();
      });
      coursetr.appendChild(deleteBtn);
      //knapp för att uppdatera kurs. Sparar de nya värdena från DOM om de uppfyller kraven om unik kod och progression
      let updateBtn = document.createElement("button");
      updateBtn.textContent = "Spara förändringar";
      updateBtn.addEventListener("click", () => {
        let kursen: HTMLElement = document.getElementById(
          coursetr.id
        ) as HTMLElement;

        //om HTMlelementet "kursen" finns uppdatera värderna i arrayen utifrån input OM de uppfyller kraven
        if (kursen) {
          courses[i].name =
            kursen.children[0].textContent?.trim() || courses[i].name;
          //Kolla efter dubbletter
          const codeExists = courses.some(
            (course) =>
              course.code ===
                kursen?.children[1].textContent?.toUpperCase().trim() &&
              course.code !== courses[i].code
          );
          //om kurskoden från input inte redan finns så uppdatera och fortsätt köra koden - annars alert
          if (!codeExists) {
            courses[i].code =
              kursen.children[1].textContent?.toUpperCase().trim() ||
              courses[i].code;
            //om kursprogressionen från input är A, B eller C ändra till input annars alert
            if (
              kursen.children[2].textContent?.toUpperCase().trim() == "A" ||
              kursen.children[2].textContent?.toUpperCase().trim() == "B" ||
              kursen.children[2].textContent?.toUpperCase().trim() == "C"
            ) {
              courses[i].progression =
                kursen.children[2].textContent.toUpperCase().trim() ||
                courses[i].progression;
            } else {
              window.alert("Kursprogressionen kan bara vara A, B eller C.");
              courses[i].progression = courses[i].progression;
              kursen.children[2].textContent = courses[i].progression;
            }
            courses[i].syllabus =
              kursen.children[3].textContent || courses[i].syllabus;
          } else {
            window.alert("Kurskoden måste vara unik");
            kursen.children[1].textContent = courses[i].code;
          }
          //spara om arrayen till localstorange
          localStorage.setItem("courses", JSON.stringify(courses));
        }
      });
      coursetr.appendChild(updateBtn);
      courseListEl.appendChild(coursetr);
    }
  }
}
