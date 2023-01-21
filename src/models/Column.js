import { v4 as uuidv4 } from 'uuid';

class Column {
    constructor(name, attribute, align) {
        this.id = uuidv4()
        this.name = name
        this.attribute = attribute
        this.align = align
    }
}

export default Column;