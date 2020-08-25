
/**
 * ArrayShuffle Class
 */
export class ArrayShuffle {
    constructor(data = []) {
        this.data = data;
    }

    static sort(unsortedArray = []) {
        const unsortedArrayLen = unsortedArray.length;
        
        if(unsortedArrayLen < 2) {
          return unsortedArray;
        }
        
        let pivot       = unsortedArray[0],
            leftArray   = [],
            rightArray  = [],
            sortedArray = [];
        
        for(var index = 1; index < unsortedArrayLen; index++) {
          var current = unsortedArray[index];
          
          if(current <= pivot) {
            leftArray.push(current);
          } else {
            rightArray.push(current);
          }
        }
        
        leftArray  = ArrayShuffle.sort(leftArray);
        rightArray = ArrayShuffle.sort(rightArray);
        
        return sortedArray.concat(leftArray, pivot, rightArray);
    }

    static getRandomIndex(maxIndex = 1, maxDigit = 1) {
        const randomNumber = Math.floor(
            Math.random() * (10 ^ maxDigit)
        );
    
        return Math.abs(maxIndex - randomNumber);
    }

    shuffle() {
        let me       = this,
            data     = me.data || [],
            dataLen  = data.length,
            maxIndex = dataLen - 1,
            maxDigit = String(dataLen).length;

        for (let index = 0; index < dataLen; index++) {
            const randomIndex = ArrayShuffle.getRandomIndex(maxIndex, maxDigit);
    
            [ data[index], data[randomIndex] ] = [ data[randomIndex], data[index] ];
        }
    
        return data;
    }

    sort() {
        const me = this;

        // we can also use Array.prototype.sort
        // since the assignment specified points for sorting
        // assuming that custom sorting is required
        return me.data = ArrayShuffle.sort(me.data);
    }
}