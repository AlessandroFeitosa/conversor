const caminhoJson = 'unidades.json';
var dadosJson = '';
var arrayCoeficientes = [];
var casasDecimais = 3;
var checkComum = false;

const idCategoria = 'selecao-categoria';
const idTipo = 'selecao-tipo';
const idUnidade = 'selecao-unidade';
const idUnidade2 = 'selecao-unidade-2';
const idTextUnidade = 'text-unidade';
const idTextUnidade2 = 'text-unidade-2';
const idRangeDecimais = 'range-decimais';
const idTextDecimais = 'text-decimais';

const objSelectCategoria = document.getElementById(idCategoria);
const objSelectTipo = document.getElementById(idTipo);
const objSelectUnidade = document.getElementById(idUnidade);
const objSelectUnidade2 = document.getElementById(idUnidade2);
const objTextUnidade = document.getElementById(idTextUnidade);
const objTextUnidade2 = document.getElementById(idTextUnidade2);
const objRangeDecimais = document.getElementById(idRangeDecimais);
const objTextDecimais = document.getElementById(idTextDecimais);

objTextUnidade.addEventListener('input', () => {
    calcula();
});

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



async function funcaoPrincipal() {
    dadosJson = await extraiJson(caminhoJson);
    //console.log(dadosJson);
    return;
};

function verifica() {
    setTimeout(() => {
        if (dadosJson === '') {
            // console.log('Não mudou');
            verifica();
        } else {
            extraiCategoria(idCategoria);
            // console.log('mudou');
        }
    }, "200");
    console.log('rodando');
}

verifica();

//------------------ Extrai categorias ----------------------
function extraiCategoria(combo) {
    try {
        // Array para armazenar os nomes
        let data = dadosJson;
        let nomes = [];
        // Percorre cada chave (propriedade) do objeto "data"
        for (let chave in data) {
            // Verifica se a chave atual tem um atributo "nome"
            if (data[chave].categoria) {
                nomes.push(data[chave].categoria); // Adiciona o nome no array "nomes"
            }
        }
        insereDadosCombobox(removerElementosRepetidos(nomes), combo);
        extraiTipo(idTipo);
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
        if (checkComum === false){
            for (let chave in data) {
                // Verifica se a chave atual tem um atributo "nome"
                if (data[chave].tipo === comboboxTipo) {
                    nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                    arrayCoeficientes.push(data[chave].coeficiente);
                }
            };
        } else{
            for (let chave in data) {
                // Verifica se a chave atual tem um atributo "nome"
                if (data[chave].tipo === comboboxTipo && data[chave].frequente === true) {
                    nomes.push(data[chave].nick); // Adiciona o nome no array "nomes"
                    arrayCoeficientes.push(data[chave].coeficiente);
                }
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
    if (objSelectCategoria.value === 'Temperatura'){
        if (indexSelectUnidade === 0 && indexSelectUnidade2 === 1) {
            objTextUnidade2.value = Math.round((Number(objTextUnidade.value) -273.15) * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === 1 && indexSelectUnidade2 === 0) {
            objTextUnidade2.value = Math.round((Number(objTextUnidade.value) +273.15) * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === 0 && indexSelectUnidade2 === 2) {
            objTextUnidade2.value = Math.round((Number(objTextUnidade.value) *1.8 -459.67) * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === 2 && indexSelectUnidade2 === 0) {
            objTextUnidade2.value = Math.round(((Number(objTextUnidade.value)+459.67)/1.8 ) * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === 1 && indexSelectUnidade2 === 2) {
            objTextUnidade2.value = Math.round((Number(objTextUnidade.value) /5*9+32) * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === 2 && indexSelectUnidade2 === 1) {
            objTextUnidade2.value = Math.round((Number(objTextUnidade.value) -32) *5/9 * (10 ** casasDecimais)) / (10 ** casasDecimais);
        };
        if (indexSelectUnidade === indexSelectUnidade2){
            objTextUnidade2.value = objTextUnidade.value
        };
    } else{
        let coeficienteUnidade = arrayCoeficientes[indexSelectUnidade];
        let coeficienteUnidade2 = arrayCoeficientes[indexSelectUnidade2];
        let taxa = coeficienteUnidade / coeficienteUnidade2;
        objTextUnidade2.value = Math.round(Number(objTextUnidade.value) * taxa * (10 ** casasDecimais)) / (10 ** casasDecimais);
    };

}

function decimais() {
    objTextDecimais.innerHTML = objRangeDecimais.value + ' casas decimais';
    casasDecimais = Number(objRangeDecimais.value);
    calcula();
};

function unidadesComuns(){
    if (checkComum === true){
        checkComum = false;
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    } else{
        checkComum = true;
        extraiUnidade(idUnidade);
        extraiUnidade(idUnidade2);
    };
};

funcaoPrincipal();
decimais();