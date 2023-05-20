const baseUrl = "https://expense-dev-server.temanedtech.com";
const token = localStorage.getItem("token");
const root = document.getElementById("root");


window.onload = () => {
  if (!token) {
    window.location.assign(window.location.origin);
  }
  fetchData();
};

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const fetchData = async () => {
  const res = await fetch(baseUrl + "/expenses", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await res.json();
  console.log(data);
  render(data);
};

const render = (data) => {
  const parentDiv = document.createElement("div");
  data.forEach((e) => {
    const div = document.createElement("div");
    const keys = Object.keys(e);
    for (const key of keys) {
      const para = document.createElement("p");
      para.innerText = key + " : " + e[key];
      para.classList.add(key);
      div.appendChild(para);
    }
    const button = document.createElement("button");
    button.innerText = "Delete Expense";
    button.dataset.expId = e._id;
    button.addEventListener("click", (event) => deleteExp(event));
    div.appendChild(button);
    
    const update = document.createElement("button");
    update.innerText = "Update Expense";
  
    update.setAttribute("type","button");
    update.setAttribute("class","btn btn-primary");
    update.setAttribute("data-bs-toggle","modal");
    update.setAttribute("data-bs-target","#updateExpModal");
    update.addEventListener("click", () => updateExp(e));
    div.appendChild(update);
    parentDiv.appendChild(div);
  });
  root.replaceChildren(parentDiv);
};

const addExpForm = document.getElementById("expForm");

addExpForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const formData = {
      name: addExpForm.name.value,
      desc: addExpForm.desc.value,
      type: addExpForm.type.value,
      amount: addExpForm.amount.value,
      transactionAccount: addExpForm.transactionAccount.value,
      transactionDetails: addExpForm.transactionDetails.value,
    };
    const res = await fetch(baseUrl + "/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});

const deleteExp = (event) => {
  fetch(baseUrl + "/expenses/delete/" + event.target.dataset.expId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      fetchData();
    })
    .catch((err) => console.log(err));
};

const updateExp = (e) => {
    const updateForm = document.getElementById("updateExpForm");
    updateForm.name.value = e.name
    updateForm.desc.value = e.desc
    updateForm.amount.value = e.amount
    updateForm.transactionDetails.value = e.transactionDetails
    updateForm.transactionAccount.value = e.transactionAccount
    updateForm.type.value = e.type
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = {
            name: updateForm.name.value,
            desc: updateForm.desc.value,
            type: updateForm.type.value,
            amount: updateForm.amount.value,
            transactionAccount: updateForm.transactionAccount.value,
            transactionDetails: updateForm.transactionDetails.value,
        }
        fetch(baseUrl+ "/expenses/update/"+e._id,{
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: "Bearer "+ token
            },
            body: JSON.stringify(formData)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        })
        .catch(err => console.log(err))
    })
}