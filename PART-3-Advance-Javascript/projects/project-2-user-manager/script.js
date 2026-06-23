let userManager = {
    users: [],

    addUser: function (newUser) {
        this.users.push(newUser);
    },

    removeUser: function (id) {
        this.users = this.users.filter(user => user.id !== id);
    }
};

// DOM Elements
const userCountElement = document.getElementById("user-count");
const userCardContainer = document.querySelector(".user-card-container");
const formEle = document.querySelector("form");

// Update user count
function updateUserCount() {
    userCountElement.textContent = `${userManager.users.length}`;
}

// Create user card
function createUserCard({
    id,
    imageUrl,
    imageAlternateText = "Profile Picture",
    name = "User",
    role = "User",
    bioContent = "---"
}) {
    const userCard = document.createElement("div");
    userCard.className =
        "user-card bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition";

    // Header
    const header = document.createElement("div");
    header.className = "flex items-start justify-between";

    // Left section (avatar + name + role)
    const userInfo = document.createElement("div");
    userInfo.className = "flex items-center gap-4";

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = imageAlternateText;
    imageElement.className =
        "w-16 h-16 rounded-full object-cover border border-slate-700";

    const nameAndRoleDiv = document.createElement("div");

    const nameEle = document.createElement("h3");
    nameEle.className = "font-semibold text-lg";
    nameEle.textContent = name;

    const roleEle = document.createElement("p");
    roleEle.className = "text-blue-400 text-sm";
    roleEle.textContent = role;

    nameAndRoleDiv.append(nameEle, roleEle);
    userInfo.append(imageElement, nameAndRoleDiv);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.className =
        "text-red-400 hover:text-red-300 text-2xl leading-none cursor-pointer transition";

    deleteBtn.addEventListener("click", () => {
        userManager.removeUser(id);
        updateUserCount();
        renderUsers();
    });

    header.append(userInfo, deleteBtn);

    // Bio
    const bioElement = document.createElement("p");
    bioElement.className = "mt-4 text-slate-400 text-sm";
    bioElement.textContent = bioContent;

    userCard.append(header, bioElement);

    return userCard;
}

// No data placeholder
function noDataFoundElement() {
    const noElementFoundDiv = document.createElement("div");

    noElementFoundDiv.className =
        "no-data col-span-full flex flex-col gap-y-2 p-8 justify-center items-center";

    const message = document.createElement("h3");
    message.className = "text-white font-semibold text-2xl";
    message.textContent = "No Data Found";

    const subMessage = document.createElement("p");
    subMessage.className = "text-slate-400";
    subMessage.textContent = "Add your first user using the form.";

    noElementFoundDiv.append(message, subMessage);

    return noElementFoundDiv;
}

// Render all users
function renderUsers() {
    userCardContainer.innerHTML = "";

    if (userManager.users.length === 0) {
        userCardContainer.appendChild(noDataFoundElement());
        return;
    }

    userManager.users.forEach((user) => {
        const userCard = createUserCard({
            id: user.id,
            imageUrl: user.photoUrl,
            name: user.name,
            role: user.role,
            bioContent: user.bio
        });

        userCardContainer.appendChild(userCard);
    });
}

// Form submit
formEle.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const photoUrl = document.getElementById("photoUrl").value.trim();
    const bio = document.getElementById("bio").value.trim();

    const newUser = {
        id: Date.now(),
        name,
        role,
        photoUrl:
            photoUrl ||
            `https://i.pravatar.cc/300?u=${Date.now()}`,
        bio
    };

    userManager.addUser(newUser);

    updateUserCount();
    renderUsers();

    formEle.reset();
});

// Initial render
updateUserCount();
renderUsers();