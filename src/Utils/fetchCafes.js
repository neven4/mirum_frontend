import fetchPromise from "./fetchingPromise"

function fetchCafes() {
    let resCopy
    const promise = fetch("https://europe-west1-mirum-e30cc.cloudfunctions.net/api/cafes")
        .then((res) => {
            resCopy = res.clone()

            caches.open("mirum-cache").then(function(cache) {
                cache.put("cafesData", resCopy);
            });

            return res.json()
        })
        .catch(() => {
            return caches.match("cafesData")
                .then(response => response.json())
        })
  
    return fetchPromise(promise)
}

export default fetchCafes