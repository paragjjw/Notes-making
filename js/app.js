showNotes();
document.getElementById('searchTxt').value = "";
let addBtn = document.getElementById('addBtn').addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let title = document.getElementById('noteTitle');
    let authorName = document.getElementById('authorName');
    let today = new Date();
    let date = "";
    date += `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} IST`;
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);
    let myObj = {
        noteTitle: title.value,
        noteTxt: addTxt.value,
        noteAuthor: authorName.value,
        noteDate: date
    } 
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    noteTitle.value = "";
    authorName.value = "";
    // console.log(notesObj);
    showNotes();
});

function showNotes() {
   let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
            html += `<div class="noteCard my-2 mx-2 card" id="note ${index}" style="width: 25rem; background-color: white;">
          <div class="card-body">
            <h5 class="card-title" id="title ${index}"><b>${element.noteTitle}</b></h5>
            <p class="card-text" id="text ${index}">${element.noteTxt}</p>
            <div class="my-2" style="width: 18rem; color: rgb(140, 142, 145);">
            Created By: ${element.noteAuthor}<br>
            Created On: ${element.noteDate}
            </div>
            <button onclick="deleteNote(${index})" class="btn btn-primary mx-2">Delete Note</button>
            <button onclick = "markImp(${index})" id = "markBtn ${index}" class="markImp btn btn-primary my-2 mx-2">
            Mark as important
          </button>
          </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0)
        notesElm.innerHTML = html;
    else
        notesElm.innerHTML = `<b>Nothing to show! Use "Add a note" section above to add notes</b>`;
}

function deleteNote(index) {
    // console.log("Deleted node ",index+1);
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else
        notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// let searchBtn = document.getElementById('searchBtn');
// console.log(searchBtn);
document.getElementById('searchBtn').addEventListener('click', function (e) {
    e.preventDefault();
    // console.log('Parag');
    let inputVal = document.getElementById('searchTxt').value.toLowerCase();
    let notes = localStorage.getItem('notes');
    let notesObj = [];
    if (notes != null)
        notesObj = JSON.parse(notes);
    // console.log(notesObj.length);
    notesObj.forEach(function (element, index) {
        let noteCard = document.getElementById(`note ${index}`);
        // console.log(index);
        if (element.noteTitle.toLowerCase().includes(inputVal) || element.noteTxt.toLowerCase().includes(inputVal) || element.noteAuthor.toLowerCase().includes(inputVal) || element.noteDate.toLowerCase().includes(inputVal))
            noteCard.style.display = 'block';
        else
            noteCard.style.display = 'none';
    })
});

function markImp(index) {
    // showNotes();
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else {
    notesObj = JSON.parse(notes);
        let impNote = document.getElementById(`note ${index}`);
        let markBtn = document.getElementById(`markBtn ${index}`);
        // console.log(impNote.style.backgroundColor);
        if (impNote.style.backgroundColor != 'white') {
            impNote.style.backgroundColor = 'white';
            markBtn.innerText = 'Mark as important';
        } else {
            impNote.style.backgroundColor = 'yellow';
            markBtn.innerText = 'Unmark important';
        }
        // console.log(impNote.style.backgroundColor);
    }
}

Array.from(document.getElementsByClassName('noteCard')).forEach(function (element, index) {
    let noteTitle = element.getElementsByClassName('card-title')[0];
    noteTitle.addEventListener('dblclick', function () {
        let notes = localStorage.getItem('notes');
        noteObj = JSON.parse(notes);
        noteTitle.innerHTML = `<textarea class="form-control" id="textarea${index}" rows="1">${noteObj[index].noteTitle}</textarea>`;
        document.getElementById(`textarea${index}`).addEventListener('blur', function () {
            noteTitle.innerHTML = document.getElementById(`textarea${index}`).value;
            noteObj[index].noteTitle = noteTitle.innerHTML;
            localStorage.setItem('notes', JSON.stringify(noteObj));
        });
    });
    let noteTxt = element.getElementsByClassName('card-text')[0];
    noteTxt.addEventListener('dblclick', function () {
        let notes = localStorage.getItem('notes');
        noteObj = JSON.parse(notes);
        noteTxt.innerHTML = `<textarea class="form-control" id="textarea${index}" rows="1">${noteObj[index].noteTxt}</textarea>`;
        document.getElementById(`textarea${index}`).addEventListener('blur', function () {
            noteTxt.innerHTML = document.getElementById(`textarea${index}`).value;
            noteObj[index].noteTxt = noteTxt.innerHTML;
            localStorage.setItem('notes', JSON.stringify(noteObj));
        });
    });
});