// 1. Walk through each step of implementing an array. 
// Don't rush through this by copying and pasting the code samples. 
// After you've walked through it and you understand the code of the 
// Array class, hide the sample code and try writing the Array class 
// from scratch using the memory module here for allocating memory.

const memory = require('./memory') 

class Array {
    constructor() {
        this.length = 0;
        this._capacity=0;
        this.ptr = memory.allocate(this.length)
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value)
        length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;

        this.ptr = memory.allocate(size)

        if(this.ptr === null) {
            throw new Error ('Out of memory')
        }

        memory.copy(this.ptr, oldPtr, this.length) 
        memory.free(oldPtr)
        this._capacity=size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }
        return memory.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error')
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO)
        }

        // toIdx, fromIdx, size
        // we are copying any values after where we are inserting
        // the new value forward to the next value
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index)
        memory.set(this.ptr + index, value)
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error')
        }

        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1)
        this.length--;
    }

}

Array.SIZE_RATIO=3;