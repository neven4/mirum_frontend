import fetchPromise from "./fetchingPromise"

function fetchCafes() {
    let resCopy: Response
    const promise = fetch("https://europe-west1-mirum-e30cc.cloudfunctions.net/api/cafes")
        .then((res) => {
            resCopy = res.clone()

            if (window.caches) {
                window.caches.open("mirum-cache").then(function(cache) {
                    cache.put("cafesData", resCopy);
                });
            }

            return res.json()
        })
        .catch(() => {
            if (window.caches) {
                return window.caches.match("cafesData")
                    .then(response => response ? response.json() : null)
            }
        })
  
    return fetchPromise(promise)
}

export default fetchCafes