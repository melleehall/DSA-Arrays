import memory from './memory'

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    push(value) {
        if (this.length >= this._capacity) {
        // resize the array so there is space for the new item if it is
        // greater that the capacity
        // Each time you go over capacity, you triple the size of
        // memory which is allocated.
        // In this best and average case for pushing you won't 
        // need to resize, so these become O(1) operations.
        // Worst case, you need to resize which has a complexity of O(n)
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        // set the memory at this.ptr + this.length to be equal to the value
        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    // the space directly aftet what you allocate for the array will
    // likely already have been allocated for another purpose so...
    _resize(size) {
        const oldPtr = this.ptr;
        // you have to allocate a new larger chunk of memory
        this.ptr = memory.allocate(size);

        if(this.ptr === null) {
            throw new Error('Out of memory')
        }
        // copy any existing values from the old to new chunk
        memory.copy(this.ptr, oldPtr, this.length)
        // and free the old chunk
        memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        } 
        // Add an index offset and get the value stored at a 
        // memory address
        // Best, average, and worst-case performance of O(1)
        return memory.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        // This is an O(1) operation as it just requires pointer
        // arithmetic and memory access
        // Leave an extra space to be filled at the next push rather
        // than resize the array
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        // Best case, you're inserting the value at the back of the
        // array which is the same as pushing or O(1)
        // Worst case, you're inserting the value at the start of the 
        // array requiring every value to be shifted by 1 memory address
        // - this would require n copies so it's O(n).
        // Average case, inserting a value into the middle of the array
        // requiring you to shift half the values.  That's n/2 copies
        // but you ignore the constant factor so it's also O(n)
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    // removing values is similar to inserting values except you
    // are copying the values backward to fill the space where you
    // removed the value rather than forwards to make space for a 
    // new value
    // Best case is O(1) like popping, average and worst cases are O(n)
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

// In this push method, if the length is greater than the capacity 
// then you resize according to the SIZE_RATIO
// The tradeoff is that you're wasting memory when the capacity is
// greatert han the length but with careful tuning, this doesn't
// tend to be a huge problem and is incredibly worthwhile 
// optimization given how common pushing to arrays is
Array.SIZE_RATIO = 3;

