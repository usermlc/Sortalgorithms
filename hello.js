function generateArrayWithRange(arrLength, start, end) {
    return Array.from({length: arrLength}, () => Math.floor(Math.random() * (end - start + 1)) + start);
}

function genArrButton() {
    const minNum = parseInt(document.getElementById("minNumForArr").value, 10);
    const maxNum = parseInt(document.getElementById("maxNumForArr").value, 10);
    const arrLength = parseInt(document.getElementById("arrLength").value, 10);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(arrLength)) {
        alert("Oops, not a number");
        return;
    }

    arr = generateArrayWithRange(arrLength, -minNum, maxNum);
    document.getElementById("arrTextArea").value = arr.join(', ');
}

function bubbleSort() {
    let startTime = performance.now();

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    let endTime = performance.now();
    updateDisplay(arr, endTime - startTime);
}

function insertSort() {
    let startTime = performance.now();

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }

    let endTime = performance.now();
    updateDisplay(arr, endTime - startTime);
}

function selectSort() {
    let startTime = performance.now();

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    let endTime = performance.now();
    updateDisplay(arr, endTime - startTime);
}
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(val => val < pivot);
    const right = arr.filter(val => val > pivot);

    return [...quickSort(left), pivot, ...quickSort(right).filter(val => val !== pivot)];
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }

    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

function sortButtonHandler(sortFunction) {
    let startTime = performance.now();
    arr = sortFunction(arr);
    let endTime = performance.now();
    updateDisplay(arr, endTime - startTime);
}

function qsButton() {
    sortButtonHandler(quickSort);
}

function msButton() {
    sortButtonHandler(mergeSort);
}

function updateDisplay(sortedArray, timeElapsed) {
    document.getElementById("arrTextArea").value = sortedArray.join(', ');
    document.getElementById("timer").textContent = timeElapsed + " ms";
}