import MakeRequest from "./http-services.js";

export default class NoteService {
    static async loadNoteList() {
        return MakeRequest("/loadnote",{"pass":"blank"})
    }

    static async SortedNote(HowToSort) {
        return MakeRequest('/sortnote',HowToSort)
    }

    static async createNewNote(thebody) {
        return MakeRequest("/newnote",thebody)
    }

    static async editNote(thebody) {
        return MakeRequest('/editnote',thebody)
    }

    static async deleteNote(thebody) {
        return MakeRequest('/deletenote',thebody)
    }

    static async findNote(thebody) {
        return MakeRequest('/findone',thebody)
    }
}