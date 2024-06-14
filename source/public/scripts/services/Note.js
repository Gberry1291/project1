export default class Note {
    constructor(title, due, created, importanceList, description,finished,importanceInt,id) {
        this.title = title;
        this.due = due;
        this.created= created;
        this.importance = importanceList;
        this.description = description;
        this.finished=finished;
        this.importanceInt=importanceInt;
        this.id=id;
    }

    toJSON() {
        return {
            title: this.title,
            due: this.due,
            created: this.created,
            importance: this.importance,
            description: this.description
        };
    }
    
}
