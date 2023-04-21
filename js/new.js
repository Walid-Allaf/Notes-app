let backArrow = document.querySelector("i.fa-arrow-left"),
  checkArrow = document.querySelector("i.fa-check"),
  noteTitle = document.querySelector(".title"),
  noteContent = document.querySelector(".content"),
  trash = document.querySelector(".fa-trash-alt"),
  notesArray = [];

// Check If There Is Notes In Local Storage
if (window.localStorage.getItem("notes")) {
  notesArray = JSON.parse(localStorage.getItem("notes"));
}

backArrow.addEventListener("click", () => {
  history.back();
});

checkArrow.addEventListener("click", () => {
  if (noteTitle.value != "" || noteContent.value != "") {
    if (window.localStorage.getItem("editNote")) {
      modifyNote(noteTitle.value, noteContent.value);
    } else {
      creatNote(noteTitle.value, noteContent.value);
      noteTitle.value = "";
      noteContent.value = "";
    }
  }
});

noteTitle.addEventListener("keyup", check);
noteContent.addEventListener("keyup", check);
function check() {
  if (noteTitle.value == "" && noteContent.value == "") {
    checkArrow.style.color = "#999";
  } else {
    checkArrow.style.color = "#000";
  }
}

let editNote = JSON.parse(localStorage.getItem("editNote"));

for (let i = 0; i < notesArray.length; i++) {
  if (editNote == notesArray[i].id) {
    console.log(notesArray[i]);
    noteTitle.value = notesArray[i].title;
    noteContent.value = notesArray[i].content;
  }
}

if (window.localStorage.getItem("editNote")) {
  document.querySelector(".fa-check").style.color = "#000";
  trash.style.display = "flex";
} else {
  trash.style.display = "none";
}

trash.addEventListener("click", deleteNote);

// Functions
function creatNote(noteTitle, noteContent) {
  addNoteToArray(noteTitle, noteContent);
}

function addNoteToArray(noteTitle, noteContent) {
  const note = {
    id: new Date().getTime(),
    title: noteTitle,
    content: noteContent,
    time: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} (${new Date().getHours()}:${new Date().getMinutes()})`,
  };
  notesArray.unshift(note);
  addNoteToLocalStorage(notesArray);
}

function addNoteToLocalStorage(array) {
  window.localStorage.setItem("notes", JSON.stringify(array));
}

function modifyNote(title, content) {
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id == editNote) {
      notesArray[i].title = title;
      notesArray[i].content = content;
      (notesArray[
        i
      ].time = `Edited: ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} (${new Date().getHours()}:${new Date().getMinutes()})`),
        addNoteToLocalStorage(notesArray);
    }
  }
  history.back();
}

function deleteNote() {
  notesArray = notesArray.filter((e) => editNote != e.id);
  noteTitle.value = "";
  noteContent.value = "";
  history.back();
  addNoteToLocalStorage(notesArray);
}
