let newBtn = document.querySelector(".add-new"),
  notesDiv = document.querySelector(".notes"),
  search = document.querySelector(".input");

// Check If There Is Tasks In Local Storage
if (window.localStorage.getItem("notes")) {
  copyNotesArray = JSON.parse(localStorage.getItem("notes"));
  addNoteToDocument(copyNotesArray);
}

newBtn.addEventListener("click", () => {
  window.localStorage.removeItem("editNote");
  open("../pages/newNote.html", "_self");
});

addEventToNotes();

// Search Field
search.addEventListener("focus", () => {
  if (search.style.width != "80%") {
    search.style.width = "80%";
    let span = document.createElement("span");
    span.append(document.createTextNode("Cancel"));
    setTimeout(() => {
      document.querySelector(".form").appendChild(span);
    }, 100);

    span.addEventListener("click", () => {
      document.querySelector(".form").lastChild.remove();
      search.style.width = "100%";
      search.value = "";
      addNoteToDocument(copyNotesArray);
    });
  }
});

search.addEventListener("blur", () => {
  if (search.value == "") {
    document.querySelector(".form").lastChild.remove();
    search.style.width = "100%";
    search.value = "";
    addNoteToDocument(copyNotesArray);
  }
  addEventToNotes();
});

search.addEventListener("keyup", () => {
  let searchResult = copyNotesArray.filter((note) => {
    if (
      note.content.toLowerCase().match(search.value.toLowerCase()) ||
      note.title.toLowerCase().match(search.value.toLowerCase())
    ) {
      return note;
    }
  });

  notesDiv.innerHTML = "";
  if (searchResult.length == 0) {
    notesDiv.append("No Result");
  } else {
    addNoteToDocument(searchResult);
  }

  addEventToNotes();
});

// Functions
function addNoteToDocument(arr) {
  notesDiv.innerHTML = "";

  arr.forEach((el) => {
    let noteContainer = document.createElement("div");
    noteContainer.classList.add(`note`);
    noteContainer.id = el.id;

    let noteTitle = document.createElement("h2");
    if (el.title.length > 12) {
      noteTitle.append(`${el.title.slice(0, 12)}` + `...`);
    } else {
      noteTitle.append(el.title);
    }

    let noteContent = document.createElement("p");
    if (el.content.length > 35) {
      noteContent.append(`${el.content.slice(0, 35)}` + `...`);
    } else {
      noteContent.append(el.content);
    }

    let noteDate = document.createElement("p");
    noteDate.classList.add(`date`);
    noteDate.append(el.time);

    let innerDiv = document.createElement("div");
    innerDiv.appendChild(noteTitle);
    innerDiv.appendChild(noteContent);
    noteContainer.appendChild(innerDiv);
    noteContainer.appendChild(noteDate);
    notesDiv.appendChild(noteContainer);
  });
  delnoteBtn = document.querySelectorAll("button");
}

function addEventToNotes() {
  document.querySelectorAll(".note").forEach((el) => {
    el.addEventListener("click", () => {
      window.localStorage.setItem("editNote", JSON.stringify(el.id));
      search.value = "";
      open("../newNote.html", "_self");
    });
  });
}
