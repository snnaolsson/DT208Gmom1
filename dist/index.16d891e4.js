var btn = document.getElementById("addCourseBtn");
let courses = JSON.parse(localStorage.getItem("courses") || "[]");
//funktion för att lägga till ny kurs
function addCourse() {
    const kurscode = document.getElementById("kurskod").value;
    const kursname = document.getElementById("kursnamn").value;
    const kursprog = document.getElementById("progression").value;
    const kurssylla = document.getElementById("kursplan").value;
    const newCourse = {
        code: kurscode,
        name: kursname,
        progression: kursprog,
        syllabus: kurssylla
    };
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    for(let i = 0; i < courses.length; i++)console.log(courses[i]);
}
btn?.addEventListener("click", addCourse); //funktion för att skriva ut kurser till DOM
 //funktion för att uppdatera kurs

//# sourceMappingURL=index.16d891e4.js.map
