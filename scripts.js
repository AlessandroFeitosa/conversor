// ############>>>>>>>>>>>>>> CONVERSOR <<<<<<<<<<<<<<<##############
// ############>>>>>>>>>> Alessandro Feitosa <<<<<<<<<<<##############
// ############>>>>>>>>>>>> Versão 0.0.0.0 <<<<<<<<<<<##############


//--------------Variáveis Globais -----------------------
const caminhoJson = 'unidades.json'; //Recebe o caminho do JSON. Pode vir de uma API
var dadosJson = ''; // Variável para guardar o JSON
var arrayCoeficientes = []; //Array para guardar os coeficientes de transfomação das unidades escolhidas
var casasDecimais = 3; //Número de casas decimais
var checkComum = false; //Variável para Filtro para de unidades mais frequentes
var checkSi = ''; //Variável para Filtro de unidades do sistema SI

//----------------- Constantes -----------------------
//Constantes que guardam o id do objeto HTML
const idCategoria = 'selecao-categoria';
const idTipo = 'selecao-tipo';
const idUnidade = 'selecao-unidade';
const idUnidade2 = 'selecao-unidade-2';
const idTextUnidade = 'text-unidade';
const idTextUnidade2 = 'text-unidade-2';
const idRangeDecimais = 'range-decimais';
const idTextDecimais = 'text-decimais';
//Constantes que guardam o objeto HTML
const objSelectCategoria = document.getElementById(idCategoria);
const objSelectTipo = document.getElementById(idTipo);
const objSelectUnidade = document.getElementById(idUnidade);
const objSelectUnidade2 = document.getElementById(idUnidade2);
const objTextUnidade = document.getElementById(idTextUnidade);
const objTextUnidade2 = document.getElementById(idTextUnidade2);
const objRangeDecimais = document.getElementById(idRangeDecimais);
const objTextDecimais = document.getElementById(idTextDecimais);

//Listener da caixa de texto de entrada de dados (input)
objTextUnidade.addEventListener('input', () => {
    calcula(); //Executa a função calcula() caso seja haja alteração do campo.
});

//Função para ler o JSON
async function extraiJson(caminhoJson) {
    const saida = await fetch(caminhoJson)
        .then(response => response.json()) // Obtém os dados no formato JSON
        .then(dados => {
            try {
                return dados;
            } catch (error) {
                console.error('Erro ao processar o JSON:', error);
                return [];
            }
        })
        .catch(error => console.error('Erro ao ler o arquivo:', error));
    return saida;
};

//Função principal. Atribui à variável dadosJson o JSON lido pela função extraiJson().
async function funcaoPrincipal() {
    dadosJson = await extraiJson(caminhoJson);
    return;
};

//Função para verificar se o JSON já foi lido por recursividade a cada 200 milisegundos.
// é necessário pois a função principal é assíncrona.
function verifica() {
    setTimeout(() => {
        if (dadosJson === '') {
            verifica();
        } else {
            extraiCategoria(idCategoria);
        }
    }, "200");
}

//------------------ Extrai categorias ----------------------
function extraiCategoria(combo) {
    try {
        let data = dadosJson;
        let nomes = []; // Array para armazenar os nomes
        for (let chave in data) { // Percorre cada chave (propriedade) do objeto "data"
            if (data[chave].categoria) { // Verifica se a chave atual tem um atributo "nome"
                nomes.push(data[chave].categoria); // Adiciona o nome no array "nomes"
            }
        }
        insereDadosCombobox(removerElementosRepetidos(nomes), combo); //insere os nomes no combobox (select) removendo os nomes repetidos.
        extraiTipo(idTipo); //Chama a função para extrair o tipo.
    } catch (error) {
        console.error('Erro ao processar o JSON:', error);
        return [];
    }
};
//------------------ Extrai categorias ----------------------

//------------------ Extrai Remove itens repetidos ----------------------
function removerElementosRepetidos(array) {
    const mapa = {};
    const elementosUnicos = [];

    // Percorre o array original
    for (const elemento of array) {
        if (!mapa[elemento]) {
            // Se o elemento ainda não foi encontrado, adiciona no mapa e no novo array
            mapa[elemento] = true;
            elementosUnicos.push(elemento);
        }
    }
    return elementosUnicos;
};
//------------------ Extrai Remove itens repetidos ----------------------

//------------------ Limpa Combobox ----------------------
function limpaCombobox(combo) {
    document.getElementById(combo).innerHTML = '';
};
//------------------ Limpa Combobox ----------------------

//------------------ Insere itens no combobox ----------------------
function insereDadosCombobox(array, combo) {
    const combobox = document.getElementById(combo);
    for (let i in array) {
        const option = document.createElement('option');
        option.text = array[i];
        combobox.add(option);
    }
};
//------------------ Insere itens no combobox ----------------------

//------------------ Extrai Tipo ----------------------
function extraiTipo(combo) {
    try {

        // Array para armazenar os nomes
        let nomes = [];
        let data = dadosJson;
        // Percorre cada chave (propriedade) do objeto "data"
        let comboboxCategoria = objSelectCategoria.value;
        for (let chave in data) {
            // Verifica se a chave atual tem um atributo "nome"
            if (data[chave].categoria === comboboxCategoria) {
                nomes.push(data[chave].tipo); // Adiciona o nome no array "nomes"
            }
        }
        limpaCombobox(combo);
        insereDadosCombobox(removerElementosRepetidos(nomes), combo);
        extraiUnidade(idUnidade);
    } catch (error) {
        console.error('Erro ao processar o JSON:', error);
        return [];
    }

};
//------------------ Extrai Tipo ----------------------

//------------------ Extrai Unidade ----------------------
function extraiUnidade(combo) {
    try {
        // Array para armazenar os nomes
        let data = dadosJson;
        let nomes = [];
        arrayCoeficientes = [];
        // Percorre cada chave (propriedade) do objeto "data"
        let comboboxTipo = objSelectTipo.value;
        if (checkComum === false) {
            if (checkSi === '') {
                for (let chave in data) {
                    // Verifica se a chave atual tem um atributo "nome"
                    if (data[chave].tipo === comboboxTipo) {
                        nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                        arrayCoeficientes.push(data[chave].coeficiente);
                    };
                };
            } else {
                for (let chave in data) {
                    // Verifica se a chave atual tem um atributo "nome"
                    if (data[chave].tipo === comboboxTipo && data[chave].sistema === checkSi) {
                        nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                        arrayCoeficientes.push(data[chave].coeficiente);
                    };
                };
            };
        } else {
            if (checkSi === '') {
                for (let chave in data) {
                    // Verifica se a chave atual tem um atributo "nome"
                    if (data[chave].tipo === comboboxTipo && data[chave].frequente === checkComum) {
                        nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                        arrayCoeficientes.push(data[chave].coeficiente);
                    };
                };
            } else {
                for (let chave in data) {
                    // Verifica se a chave atual tem um atributo "nome"
                    if (data[chave].tipo === comboboxTipo && data[chave].sistema === checkSi && data[chave].frequente === checkComum) {
                        nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                        arrayCoeficientes.push(data[chave].coeficiente);
                    };
                };
            };
        };
        limpaCombobox(combo);
        insereDadosCombobox(removerElementosRepetidos(nomes), combo);
        limpaCombobox(combo + '-2');
        insereDadosCombobox(removerElementosRepetidos(nomes), combo + '-2');
        calcula();
        // console.log(arrayCoeficientes);
    } catch (error) {
        console.error('Erro ao processar o JSON:', error);
        return [];
    }
};
//------------------ Extrai Unidade ----------------------

//calcula();
function calcula() {
    if (objTextUnidade.value === "") {
        objTextUnidade2.value = '';
        return;
    };

    let indexSelectUnidade = objSelectUnidade.selectedIndex;
    let indexSelectUnidade2 = objSelectUnidade2.selectedIndex;
    if (indexSelectUnidade === -1) {
        indexSelectUnidade = 0;
    };
    if (indexSelectUnidade2 === -1) {
        indexSelectUnidade2 = 0;
    };
    if (objSelectCategoria.value === 'Temperatura') {
        calculaTemperatura(indexSelectUnidade, indexSelectUnidade2);
    } else {
        let coeficienteUnidade = arrayCoeficientes[indexSelectUnidade];
        let coeficienteUnidade2 = arrayCoeficientes[indexSelectUnidade2];
        let taxa = coeficienteUnidade / coeficienteUnidade2;
        objTextUnidade2.value = Math.round(Number(objTextUnidade.value) * taxa * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };

}

function calculaTemperatura(indexSelectUnidade, indexSelectUnidade2) {
    if (indexSelectUnidade === 0 && indexSelectUnidade2 === 1) {
        objTextUnidade2.value = Math.round((Number(objTextUnidade.value) - 273.15) * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === 1 && indexSelectUnidade2 === 0) {
        objTextUnidade2.value = Math.round((Number(objTextUnidade.value) + 273.15) * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === 0 && indexSelectUnidade2 === 2) {
        objTextUnidade2.value = Math.round((Number(objTextUnidade.value) * 1.8 - 459.67) * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === 2 && indexSelectUnidade2 === 0) {
        objTextUnidade2.value = Math.round(((Number(objTextUnidade.value) + 459.67) / 1.8) * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === 1 && indexSelectUnidade2 === 2) {
        objTextUnidade2.value = Math.round((Number(objTextUnidade.value) / 5 * 9 + 32) * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === 2 && indexSelectUnidade2 === 1) {
        objTextUnidade2.value = Math.round((Number(objTextUnidade.value) - 32) * 5 / 9 * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };
    if (indexSelectUnidade === indexSelectUnidade2) {
        objTextUnidade2.value = objTextUnidade.value
    };
};

function decimais() {
    objTextDecimais.innerHTML = objRangeDecimais.value + ' casas decimais';
    casasDecimais = Number(objRangeDecimais.value);
    calcula();
};

function unidadesComuns() {
    if (checkComum === true) {
        checkComum = false;
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    } else {
        checkComum = true;
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    };
};

function sistemaSi() {
    if (checkSi === '') {
        checkSi = 'SI';
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    } else {
        checkSi = '';
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    };
};

function trocaUnidades() {
    let i = objSelectUnidade.selectedIndex;
    objSelectUnidade.selectedIndex = objSelectUnidade2.selectedIndex;
    objSelectUnidade2.selectedIndex = i;
    calcula();
}

//Iniciando as funções
funcaoPrincipal();
verifica();
decimais();