// const sortArr = (arr, sortFunc) =>


// function that sorts object by date
// latest - earliest
export const sortByStartDate = (valA, valB) => new Date(valB.start) - new Date(valA.start);


// function that sorts object by Name
const sortByEmployeeId= (valA, valB) => valA.employeeId - valB.employeeId;


// function that sorts by name first and if name is the  same sorts by startDate
export const sortByEmployeeAndDate = (valA, valB) => sortByEmployeeId(valA, valB) ? sortByEmployeeId(valA, valB) : sortByStartDate(valA, valB)



export const sortByDate = (valA, valB) => new Date(valB.date) - new Date(valA.date);


// takes in an arr and add links from
// I guess...technically once it's sort I don't have to.....HMM BUT
// let's do it anyways
const createLinks = (arr) => {
  arr.map((cur, index) => {
    const prev = arr[index - 1];
    if (prev && (prev.employeeId === cur.employeeId)){
      prev.next = cur.id;
      cur.prev = prev.id;
    }
  });
};


export const sortAndLink = (arr, sortBy) => {
  // sortBy(arr);
  arr.sort(sortBy);
  createLinks(arr);
  return arr;
}


