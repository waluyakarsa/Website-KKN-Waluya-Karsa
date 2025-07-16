const jumlahProgram = 6;
const container = document.getElementById("programCards");

const promises = [];

for (let i = 1; i <= jumlahProgram; i++) {
  const promise = fetch(`program${i}.html`)
    .then((res) => res.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const imgSrc = doc.querySelector(".carousel-item img")?.src || "assets/img/default.jpg";
      const title = doc.querySelector("h2")?.innerText || `Program ${i}`;
      const intro = doc.querySelector(".program-intro")?.innerText || "";

      const kata = intro.trim().split(" ");
      const teaser = kata.length > 15 ? kata.slice(0, 15).join(" ") + "…" : intro;

      return {
        i,
        title,
        imgSrc,
        teaser,
      };
    });

  promises.push(promise);
}

Promise.all(promises).then((programs) => {
  programs.forEach(({ i, title, imgSrc, teaser }) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${imgSrc}" class="card-img-top"
             style="height:200px;object-fit:cover" alt="${title}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${title}</h5>
          <p class="card-text flex-grow-1">${teaser}</p>
          <a href="program${i}.html" class="btn btn-outline-primary mt-auto">
            Selengkapnya
          </a>
        </div>
      </div>`;
    container.appendChild(card);
  });
});
