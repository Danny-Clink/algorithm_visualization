export const get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "credentials":"include"
      }
    })
      .then(response => response.json())
      .then(data => resolve(data))
      .then(err => reject(err));
  });
};