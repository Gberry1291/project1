import makeRequest from "./http-services.js";

export default class NoteService {
    static loadNoteList() {
        return makeRequest("/loadnote",{"pass":"blank"})
    }

    static sortedNote(HowToSort) {
        return makeRequest('/sortnote',HowToSort)
    }

    static createNewNote(thebody) {
        return makeRequest("/newnote",thebody)
    }

    static editNote(thebody) {
        return makeRequest('/editnote',thebody)
    }

    static editChecked(thebody) {
        return makeRequest('/editchecked',thebody)
    }

    static deleteNote(thebody) {
        return makeRequest('/deletenote',thebody)
    }

    static findNote(thebody) {
        return makeRequest('/findone',thebody)
    }

    static darkMode(thebody) {
        return makeRequest('/changedark',thebody)
    }

    static filterCom(thebody) {
        makeRequest('/filter',thebody)
    }

}