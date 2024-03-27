var btn = document.getElementById("addCourseBtn");
var courses = JSON.parse(localStorage.getItem("courses") || "[]");
//funktion för att lägga till ny kurs
function addCourse() {
    var kurscode = document.getElementById("kurskod")
        .value;
    var kursname = document.getElementById("kursnamn")
        .value;
    var kursprog = document.getElementById("progression")
        .value;
    var kurssylla = document.getElementById("kursplan")
        .value;
    var newCourse = {
        code: kurscode,
        name: kursname,
        progression: kursprog,
        syllabus: kurssylla,
    };
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    for (var i = 0; i < courses.length; i++) {
        console.log(courses[i]);
    }
}
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", addCourse);
//funktion för att skriva ut kurser till DOM
//funktion för att uppdatera kurs
