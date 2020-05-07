// Drills 1 - 4, Building and working with Array class

'use strict'
const Memory = require('./memory') 

const memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length)
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value)
        this.length++;
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

function main() {

    Array.SIZE_RATIO = 3;

    // create an instance of the Array class
    let arr = new Array ()

    // Drill 2
    arr.push(3);
    // length: 1  capacity: 3    memory address:  0
    arr.push(5);
    // length: 2  capacity: 3    memory address:  0
    arr.push(15);
    // length: 3  capacity: 3    memory address:  0
    arr.push(19);
    // length: 4  
    // capacity: 12 (length 3 when push() called + 1 for new item all multiplied by 3)   
    // memory address:  3
    arr.push(45);
    // length: 5  capacity: 12   memory address:  3
    arr.push(10);
    // length: 6  capacity: 12   memory address:  3
    // capacity remains enough for all push() calls 

    console.log(arr);
    // array is stored in memory[3] to memory[8]

    // Drill 3
    arr.pop();
    // length: 5  capacity: 12   memory address: 3
    arr.pop();
    // length: 4  capacity: 12   memory address: 3
    arr.pop();
    // length: 3  capacity: 12   memory address: 3

    console.log(arr);
    // // each pop() is causing the array length to shrink by one it does not change location nor is capacity resized

    // // Drill 4
    // Print the 1st item in the array arr
    console.log(arr.get(0))

    // Empty the array and add just 1 item "tauhida"
    for (let i = arr.length -1; i >= 0; i--) {
        arr.remove(i)
    }
    
    arr.push("tauhida")
    console.log(arr)

    // Drill 4 Explanation: Result is NaN.  
    // The Float64Array was created to mimic computer memory and expects all values to be floats.  NaN is of type number but "tauhida" is a string.
    console.log(arr.get(0))

    // The purpose of _resize is to allocate a new spot in memory for the existing array plus any values being added that do not fit in the currently alloted space.  The existing data has to be copied to the new location since it is likely the space right after the original memory address is already being used for something else.
}

main();

