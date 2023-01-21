import { v4 as uuidv4 } from 'uuid';

class Row {
    constructor(name, conversion, pages, color) {
        this.id = uuidv4()
        this.name = name
        this.conversion = conversion
        this.pages = pages
        this.color = color
    }

    merge(other) {
        this.conversion += other.conversion
        this.pages += other.pages
    }
}

export default Row;