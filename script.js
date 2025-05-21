function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((res) => {
    if (!res.ok) throw new Error("Repos not found");
    return res.json();
  });
}

document.querySelector("#searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector(".usernameinp").value.trim();

  if (username.length === 0) return;

  getProfileData(username).then(data => {
    document.querySelector("#profileCard").classList.remove("hidden");
    document.querySelector("#avatar").src = data.avatar_url;
    document.querySelector("#name").textContent = data.name || "No Name";
    document.querySelector("#username").textContent = `@${data.login}`;
    document.querySelector("#bio").textContent = data.bio || "No bio available.";
    document.querySelector("#repos").textContent = data.public_repos;
    document.querySelector("#followers").textContent = data.followers;
    document.querySelector("#following").textContent = data.following;
    document.querySelector("#location").textContent = data.location || "N/A";
    document.querySelector("#company").textContent = data.company || "N/A";
    document.querySelector("#blog").textContent = data.blog || "N/A";
  }).catch(err => {
    alert(err.message);
  });

  getRepos(username).then(repos => {
    const repoList = document.querySelector("#repoContainer");
    repoList.innerHTML = "";
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${repo.html_url}" class="text-pink-700 hover:underline" target="_blank">${repo.name}</a> - <span class="text-sm text-gray-600">${repo.description || "No description"}</span>`;
      repoList.appendChild(li);
    });
    document.querySelector("#reposList").classList.remove("hidden");
  });
});

// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("toggleMode");
const body = document.body;
const input = document.querySelector(".usernameinp");
const profileCard = document.getElementById("profileCard");

let dark = false;

toggleBtn.addEventListener("click", () => {
  dark = !dark;

  if (dark) {
    body.classList.replace("bg-teal-50", "bg-gray-900");
    body.classList.replace("text-gray-800", "text-white");
    toggleBtn.textContent = "☀️ Light Mode";
    toggleBtn.classList.replace("bg-gray-200", "bg-gray-700");
    toggleBtn.classList.replace("text-gray-800", "text-white");
    toggleBtn.classList.replace("hover:bg-gray-300", "hover:bg-gray-600");

    input.classList.replace("text-gray-800", "text-white");
    input.classList.replace("bg-white", "bg-gray-800");
    input.classList.add("placeholder-gray-300");

    profileCard.classList.replace("bg-white", "bg-gray-800");
  } else {
    body.classList.replace("bg-gray-900", "bg-teal-50");
    body.classList.replace("text-white", "text-gray-800");
    toggleBtn.textContent = "🌙 Dark Mode";
    toggleBtn.classList.replace("bg-gray-700", "bg-gray-200");
    toggleBtn.classList.replace("text-white", "text-gray-800");
    toggleBtn.classList.replace("hover:bg-gray-600", "hover:bg-gray-300");

    input.classList.replace("text-white", "text-gray-800");
    input.classList.replace("bg-gray-800", "bg-white");
    input.classList.remove("placeholder-gray-300");

    profileCard.classList.replace("bg-gray-800", "bg-white");
  }
});
