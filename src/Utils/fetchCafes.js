import fetchPromise from "./fetchingPromise"

function fetchCafes() {
    const promise = fetch("https://europe-west1-mirum-e30cc.cloudfunctions.net/api/cafes")
        .then((res) => res.json())
        // .then(res => {
        //     return {
        //         cafesArr: res,
        //         cafesArrObj
        //     }
        // })
  
    return fetchPromise(promise)
}

export default fetchCafes