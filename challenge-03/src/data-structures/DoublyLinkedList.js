class DNode {
    constructor(data){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data){
        const newNode = new DNode(data);

        if (!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result .push(current.data);
            current = current.next;
        }
        return result;
    }
    getAt(index) {
        if (index <0 || index>= this.size) return null;
        let current = this.head;
        for (let i = 0; i< index; i++) {
            current = current.next;
        }
        return current;
    }
}
export default DoublyLinkedList;
