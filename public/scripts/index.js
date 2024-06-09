async function getCidades() {
  // Fetch na rota /getCidades e retorna um object array das cidades e suas IDs registradas no BD
  try {
    const response = await fetch("/getCidades");
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    cidades = await response.json();
    return cidades; // Retorna array de cidades
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}

async function updateVagas(selectedOption) {
  var selectedOption =
    selectedOption.options[selectedOption.selectedIndex].value;

  // Limpar opções anteriores
  var selectElement = document.getElementById("vaga_select");
  while (selectElement.options.length > 1) {
    selectElement.remove(1); // Always remove the second option (index 1)
  }
  
  // Resetar opção escolhida
  selectElement.value = "";
  
  try {
    var response = await fetch(
      `http://localhost:3000/query?cidadeID=${selectedOption}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    var vagas = await response.json();

    // Update the select options here
    vagas.forEach((vaga) => {
      let option = document.createElement("option");
      option.value = vaga["cargo_id"];
      option.textContent = vaga["nome_cargo"];
      selectElement.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

async function atualizarCidades() {
  // Returns object array of cities
  var cidades = await getCidades();

  var selectElement = document.getElementById("cidade_select");

  // Adds every city to the select
  cidades.forEach((cidade) => {
    let option = document.createElement("option");
    option.value = cidade["id"];
    option.textContent = cidade["nome_cidade"];
    selectElement.appendChild(option);
  });
}

// Adiciona as cidades da DB para a página
document.addEventListener("DOMContentLoaded", atualizarCidades);

// Resetar opções escolhidas ao carregar a página
(document.getElementById("cidade_select")).value = "";
(document.getElementById("vaga_select")).value = "";
