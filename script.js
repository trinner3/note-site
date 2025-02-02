const model = {
        notes: [],
        isFiltered: false,
        addNote(title, content, color) {
        
        const isFavorite = false
        const id = Math.random()
        

        const note = {title, content, color, id, isFavorite}

        if (note.title !== '' && note.content !== '') {

        this.notes.unshift(note)
        
        
        view.renderNotes(model.notes)
        view.renderNotesCount(model.notes)
    } else return 
    }, setFavorite(noteId) {
        this.notes = this.notes.map((note) => {
            if (noteId === note.id) {
                note.isFavorite = !note.isFavorite
            }
            return note
        })
        view.renderNotes(model.notes)
    },

    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId)
        view.renderNotes(model.notes)
        view.renderNotesCount(model.notes)
    },
    
    toggleFilter() {
        this.isFiltered = !this.isFiltered
    },

    showFavorite() {
        if (this.isFiltered) {
            return this.notes.filter((note) => note.isFavorite)
        } return this.notes
    },
}

const view = {
    init() {
        this.renderNotes(model.notes)
        this.renderNotesCount(model.notes)
        const form = document.querySelector('.note-form')
        const noNotesMessage = document.querySelectorAll('.no-notes-text').value
        form.addEventListener('submit', function(event) {
            event.preventDefault()
            const title = document.querySelector('.note-title').value
            const content = document.querySelector('.note-content').value
            const colorOptions = document.querySelectorAll('.color-button')
            let color = 'yellow'
            for (const option of colorOptions) {
                if (option.checked) {
                    color = option.value
                }
            }
            controller.addNote(title, content, color)
            noNotesMessage = ''
        })
        const list = document.querySelector('.notes-list')
        list.addEventListener('click', function(event) {
            if (event.target.classList.contains('favorite-button')) {
                const noteId = +event.target.closest('li').id
                controller.setFavorite(noteId)
            }

            if (event.target.classList.contains('delete-button')) {
                const noteId = +event.target.closest('li').id
                controller.deleteNote(noteId)
            }
        })
        
        const filterButton = document.getElementById('filter-checkbox')
        filterButton.addEventListener('change', function(){
            controller.toggleFilter()
        })
    }, 
    renderNotes(notes) {
        const list = document.querySelector('.notes-list')
        let notesHTML = ''
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i]
            const favoriteIcon = note.isFavorite ? 'images/icons/heart-active-icon.png' : 'images/icons/heart-inactive-icon.png'
            notesHTML += `
        <li id="${note.id}" name="note" class="${note.isFavorite ? 'favorite' : ''}" style="background-color:${note.color}">
            <div class="title">
                <div class="text">
                ${note.title}
                </div>
                <div class="buttons">
                
                <button class="favorite-button" type="button"><img class="favorite-button" src=${favoriteIcon}></button>
                <button class="delete-button" type="button"><img class="delete-button" src="images/icons/trash-icon.png" ></button>
                </div>
            </div>
            <div class="content">${note.content}</div>
            
        </li>
        `
        }
        list.innerHTML = notesHTML
    },
    renderNotesCount(notes) {
        const notesCount = document.querySelector('.notes-count')
        notesCount.textContent = `Всего заметок: ${notes.length}`   
        document.querySelector('.filter-box').style.visibility = "hidden";  
        document.querySelector('.messages-box').style.visibility = "visible";
        if (notes.length > 0) {
            document.querySelector('.messages-box').style.visibility = "hidden";
            document.querySelector('.filter-box').style.visibility = "visible";
        }
    }, 
    showNotification(message, isWarning = false) {
        const notification = document.getElementById('notification')
        notification.innerHTML = message
        notification.style.display = 'flex'
        notification.classList.toggle('warning', isWarning)
        setTimeout(() => {
            notification.style.display = 'none'
            notification.classList.remove('warning')
        }, 3000)
    },
}

    
    
    


const controller = {
    addNote(title, content, color) {
        if (title.trim() === '' || content.trim() === '') {
            view.showNotification('<img src="images/icons/warning.png" alt=""><span>Заполните все поля</span>', true)
            return
        } 
        if (title.length > 50 ) {
            view.showNotification('<img src="images/icons/warning.png" alt=""><span>Максимальная длина заголовка - 50 символов</span>', true)
            return
        } 
        
        model.addNote(title, content, color)
        view.showNotification('<img src="images/icons/Done.png" alt=""><span>Заметка добавлена!</span>')
        document.querySelector('.note-title').value = ''
        document.querySelector('.note-content').value = ''
    },
    setFavorite(noteId) {
        model.setFavorite(noteId)
    },
    deleteNote(noteId) {
        model.deleteNote(noteId)
    },
    toggleFilter() {
        model.toggleFilter()
        view.renderNotes(model.showFavorite())
    },
}
function init() {
    view.init()
}

init()

