let randomize_array_btn = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let array_container = document.getElementById("array_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");

let minRange = 1;
let maxRange = 60;
let array_size = 20;
let heightFactor = 5;
let speedFactor = speed.value;
let algotouse = select_algo.value;

// this is the array on which sorting is done
var div_sizes = [];
// this is array, which is displayed on screen
var divs = [];

function generate_array(){

  array_container.innerHTML = "";
  
  for(let i=0; i<array_size; i++){

    div_sizes[i] =  Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange + 10;
    divs[i]=document.createElement("div");
    divs[i].classList.add("array"); 
    array_container.appendChild(divs[i]);
    divs[i].style.height = div_sizes[i] * heightFactor + "px";
    divs[i].style.backgroundColor = "blue";

  }
}

speed.addEventListener("change", (e) => {
  speedFactor = e.target.value;
});

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

document.addEventListener("DOMContentLoaded", function () {
  generate_array();
});

randomize_array_btn.addEventListener("click", function () {
  generate_array();
});

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {

  console.log("bubble sort");

  for (let i = 0; i < array_size-1; i++) {
    for (let j = 0; j < array_size- i - 1; j++) {

      if (div_sizes[j]>div_sizes[j+1]) {
        await swap(j,j+1);      
      }
    }
    await delay(speedFactor);
  }
}

async function quickSortHelper() {

  console.log("quick sort");
  await quickSort(0,array_size-1);
  
} 

async function partition(start, end) {

  let pivot = div_sizes[start]; 
  let i = start;
  let j = end;

  while (i < j) {
    while (div_sizes[i] <= pivot) {
      i++;
    }
    while (div_sizes[j] > pivot) {
      j--;
    }
    if (i < j) {
      await swap(i, j);     
    }
  }
  await swap(j,start);

  return j;
}

async function quickSort(start, end) {

  if(start<end){
    let pivot = await partition(start, end ) ; 
    await quickSort (start, pivot-1);//sorts the left side of pivot.
    await quickSort (pivot +1, end) ;//sorts the right side of pivot.
  }

}

async function InsertionSort() {

  console.log("insertion sort");

  for (let i = 1; i < array_size; i++) {

    let key = div_sizes[i];
    let j = i - 1;
    
    while (j >= 0 && div_sizes[j] > key) {

      div_sizes[j + 1] = div_sizes[j];
      divs[j+1].style.height = div_sizes[j+1] * heightFactor + "px";

      await delay(speedFactor);
      j = j - 1;
    }

    div_sizes[j + 1] = key;
    divs[j+1].style.height = div_sizes[j+1] * heightFactor + "px";

    await delay(speedFactor);
  }
}

async function HeapSort() {

  console.log("heap sort");

  for (let i = Math.floor(array_size / 2); i >= 0; i--) {
    await heapify(array_size, i);
  }

  for (let i = array_size - 1; i >= 0; i--) {
    await swap(0, i);
    await heapify(i, 0);
  }

}

async function heapify( n, i) {

  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && div_sizes[left] > div_sizes[largest]) {
    largest = left;
  }
  if (right < n && div_sizes[right] > div_sizes[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(i, largest);
    await heapify( n, largest);
  }
}

async function swap(i, j) {

  let temp = div_sizes[i];
  div_sizes[i] = div_sizes[j];
  div_sizes[j] = temp;

  divs[i].style.height = div_sizes[i] * heightFactor + "px";
  divs[j].style.height = div_sizes[j] * heightFactor + "px";

  // swap function will always cause delay
  await delay(speedFactor);

}

async function mergeSortHelper(){

  console.log("merge sort");
  await mergeSort(0,array_size-1);
}

async function mergeSort(start,end) {

  if(start<end){

    let mid = Math.floor((start+end)/2);
    await mergeSort(start,mid);
    await mergeSort(mid+1,end);
    await merge(start,mid,end);
  }
  
}

async function merge(start,mid,end) {

  let p = start, q = mid + 1;
  let Arr = [], k = 0;

  while(p<=mid && q<=end){

    if(div_sizes[p]<div_sizes[q]){
        Arr[k]=div_sizes[p];
        divs[p].style.height = div_sizes[p] * heightFactor + "px";
        k++;
        p++;
    }
    else{
        Arr[k]=div_sizes[q];
        divs[q].style.height = div_sizes[q] * heightFactor + "px";
        k++;
        q++;
    }

  }

  while(q<=end){
    Arr[k]=div_sizes[q];
    divs[q].style.height = div_sizes[q] * heightFactor + "px";
    k++;
    q++;
  }

  while(p<=mid){
    Arr[k]=div_sizes[p];
    divs[p].style.height = div_sizes[p] * heightFactor + "px";
    k++;
    p++;
  }

  for(let i=0;i<k;i++){
      div_sizes[start]=Arr[i];
      divs[start].style.height = div_sizes[start] * heightFactor + "px";
      await delay(speedFactor);      
      start++;
  }

}

sort_btn.addEventListener("click", async function () {
  switch (algotouse) {
    case "bubble":
      await bubbleSort();
      break;
    case "merge":
      await mergeSortHelper();
      break;
    case "heap":
      await HeapSort();
      break;
    case "insertion":
      await InsertionSort();
      break;
    case "quick":
      await quickSortHelper();
      break;
    default:
      await bubbleSort();
      console.log("default case");
      break;
  }
});
