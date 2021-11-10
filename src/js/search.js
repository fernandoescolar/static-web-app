const search = async (query) => {
  const res = await fetch(`/api/search?q=${query}`);
  //const data = await res.json();
  const data = await res.text();
  document.getElementById('result').innerHTML = data;
  return data;
};

const searchButton = document.getElementById('search');
if (searchButton) {
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    search(query);
  });
}
