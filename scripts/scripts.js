const caminhoJson="data/unidades.json";var dadosJson="",arrayCoeficientes=[],casasDecimais=3,checkComum=!1,checkSi="",dolar="",euro="",bitcoin="";const idCategoria="selecao-categoria",idTipo="selecao-tipo",idUnidade="selecao-unidade",idUnidade2="selecao-unidade-2",idTextUnidade="text-unidade",idTextUnidade2="text-unidade-2",idRangeDecimais="range-decimais",idTextDecimais="text-decimais",idSelectMoedas="selecao-moeda",idLateral="lateral-d",objSelectCategoria=document.getElementById(idCategoria),objSelectTipo=document.getElementById(idTipo),objSelectUnidade=document.getElementById(idUnidade),objSelectUnidade2=document.getElementById(idUnidade2),objTextUnidade=document.getElementById(idTextUnidade),objTextUnidade2=document.getElementById(idTextUnidade2),objRangeDecimais=document.getElementById(idRangeDecimais),objTextDecimais=document.getElementById(idTextDecimais),objSelectMoeda=document.getElementById(idSelectMoedas),objLateral=document.querySelector(".lateral-d");async function extraiJson(e){return await fetch(e).then((e=>e.json())).then((e=>{try{return e}catch(e){return console.error("Erro ao processar o JSON: "+e),[]}})).catch((e=>alert("Erro ao acessar a base de dados "+e)))}async function funcaoPrincipal(){dadosJson=await extraiJson(caminhoJson)}function verifica(){setTimeout((()=>{""===dadosJson?verifica():extraiCategoria(idCategoria)}),"200")}function extraiCategoria(e){try{let a=dadosJson,t=[];for(let e in a)a[e].categoria&&t.push(a[e].categoria);insereDadosCombobox(removerElementosRepetidos(t),e),extraiTipo(idTipo)}catch(e){return alert("Erro ao acessar a base de dados. "+e),[]}}function removerElementosRepetidos(e){const a={},t=[];for(const o of e)a[o]||(a[o]=!0,t.push(o));return t}function limpaCombobox(e){document.getElementById(e).innerHTML=""}function insereDadosCombobox(e,a){const t=document.getElementById(a);for(let a in e){const o=document.createElement("option");o.text=e[a],t.add(o)}}function extraiTipo(e){try{let a=[],t=dadosJson,o=objSelectCategoria.value;for(let e in t)t[e].categoria===o&&a.push(t[e].tipo);limpaCombobox(e),insereDadosCombobox(removerElementosRepetidos(a),e),extraiUnidade(idUnidade)}catch(e){return alert("Erro ao acessar a base de dados "+e),[]}}function extraiUnidade(e){try{let a=dadosJson,t=[];arrayCoeficientes=[];let o=objSelectTipo.value;if(!1===checkComum)if(""===checkSi)for(let e in a)a[e].tipo===o&&(t.push(a[e].nick),arrayCoeficientes.push(a[e].coeficiente));else for(let e in a)a[e].tipo===o&&a[e].sistema===checkSi&&(t.push(a[e].nick),arrayCoeficientes.push(a[e].coeficiente));else if(""===checkSi)for(let e in a)a[e].tipo===o&&a[e].frequente===checkComum&&(t.push(a[e].nick),arrayCoeficientes.push(a[e].coeficiente));else for(let e in a)a[e].tipo===o&&a[e].sistema===checkSi&&a[e].frequente===checkComum&&(t.push(a[e].nick),arrayCoeficientes.push(a[e].coeficiente));limpaCombobox(e),insereDadosCombobox(removerElementosRepetidos(t),e),limpaCombobox(e+"-2"),insereDadosCombobox(removerElementosRepetidos(t),e+"-2"),calcula()}catch(e){return alert("Erro ao acessar a base de dados. (Extrai unidades)"+e),[]}}function calcula(){if(""===objTextUnidade.value)return objTextUnidade2.value="",void preencheTabela();let e=objSelectUnidade.selectedIndex,a=objSelectUnidade2.selectedIndex;if(-1===e&&(e=0),-1===a&&(a=0),"Temperatura"===objSelectCategoria.value)calculaTemperatura(e,a);else{let t=arrayCoeficientes[e]/arrayCoeficientes[a];objTextUnidade2.value=Math.round(Number(objTextUnidade.value)*t*10**casasDecimais)/10**casasDecimais}ajustaTexto(),preencheTabela()}function calculaTemperatura(e,a){0===e&&1===a&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)-273.15)*10**casasDecimais)/10**casasDecimais),1===e&&0===a&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)+273.15)*10**casasDecimais)/10**casasDecimais),0===e&&2===a&&(objTextUnidade2.value=Math.round((1.8*Number(objTextUnidade.value)-459.67)*10**casasDecimais)/10**casasDecimais),2===e&&0===a&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)+459.67)/1.8*10**casasDecimais)/10**casasDecimais),1===e&&2===a&&(objTextUnidade2.value=Math.round((Number(objTextUnidade.value)/5*9+32)*10**casasDecimais)/10**casasDecimais),2===e&&1===a&&(objTextUnidade2.value=Math.round(5*(Number(objTextUnidade.value)-32)/9*10**casasDecimais)/10**casasDecimais),e===a&&(objTextUnidade2.value=objTextUnidade.value)}function decimais(){objTextDecimais.innerHTML=objRangeDecimais.value+" casas decimais",casasDecimais=Number(objRangeDecimais.value),calcula()}function unidadesComuns(){!0===checkComum?(checkComum=!1,extraiUnidade(idUnidade)):(checkComum=!0,extraiUnidade(idUnidade))}function sistemaSi(){""===checkSi?(checkSi="SI",extraiUnidade(idUnidade)):(checkSi="",extraiUnidade(idUnidade))}function trocaUnidades(){let e=objSelectUnidade.selectedIndex;objSelectUnidade.selectedIndex=objSelectUnidade2.selectedIndex,objSelectUnidade2.selectedIndex=e,calcula()}function ajustaTexto(){objTextUnidade.value.length>8&&objTextUnidade.value.length<=11?objTextUnidade.style.fontSize="1.5rem":objTextUnidade.value.length>11?objTextUnidade.style.fontSize="1rem":objTextUnidade.style.fontSize="2rem",objTextUnidade2.value.length>8&&objTextUnidade2.value.length<=11?objTextUnidade2.style.fontSize="1.5rem":objTextUnidade2.value.length>11?objTextUnidade2.style.fontSize="1rem":objTextUnidade2.style.fontSize="2rem"}function getCotacoes(){fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then((e=>e.json())).then((e=>{dolar=e.USDBRL.bid||"Não disponível",euro=e.EURBRL.bid||"Não disponível",bitcoin=e.BTCBRL.bid||"Não disponível",Number(dolar)&&(dolar=Number(dolar).toFixed(2)),Number(euro)&&(euro=Number(euro).toFixed(2)),Number(bitcoin)&&(bitcoin=Number(bitcoin).toFixed(2)),printCotacoes()})).catch((e=>console.error(e)))}function printCotacoes(){"Real"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent="R$ 1,00",document.getElementById("cotacoes-dolar").textContent=`R$ ${dolar}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`R$ ${euro}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`R$ ${bitcoin}`.replace(".",",")):"Dolar"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent=`$ ${(1/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`$ ${(dolar/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`$ ${(euro/dolar).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`$ ${(bitcoin/dolar).toFixed(2)}`.replace(".",",")):"Euro"===objSelectMoeda.value?(document.getElementById("cotacoes-real").textContent=`€ ${(1/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`€ ${(dolar/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`€ ${(euro/euro).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`€ ${(bitcoin/euro).toFixed(2)}`.replace(".",",")):(document.getElementById("cotacoes-real").textContent=`₿ ${(1/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-dolar").textContent=`₿ ${(dolar/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-euro").textContent=`₿ ${(euro/bitcoin).toFixed(2)}`.replace(".",","),document.getElementById("cotacoes-bitcoin").textContent=`₿ ${(bitcoin/bitcoin).toFixed(2)}`.replace(".",","))}function abreLateral(){"block"===objLateral.style.display?objLateral.style.display="none":(objLateral.style.display="block",preencheTabela())}function preencheTabela(){if(""===objTextUnidade.value){document.querySelector("#textareaTabela").value="Insira um valor para conversão!",objTextUnidade.focus()}else{let a=document.querySelector("#textareaTabela"),t=objTextUnidade.value+" "+objSelectUnidade.value+" equivale a:\n\n";for(var e=0;e<objSelectUnidade2.options.length;e++)t=t+calculai(e)+" "+objSelectUnidade2.options[e].value+"\n";let o=document.querySelector(".lateral-d");a.value=t,o.appendChild(a),ajustaTexto()}}function calculai(e){if(""===objTextUnidade.value)return void(objTextUnidade2.value="");let a=objSelectUnidade.selectedIndex,t=e;if(-1===a&&(a=0),-1===t&&(t=0),"Temperatura"===objSelectCategoria.value)return calculaTemperaturai(a,t);{let e=arrayCoeficientes[a]/arrayCoeficientes[t];return Math.round(Number(objTextUnidade.value)*e*10**casasDecimais)/10**casasDecimais}}function calculaTemperaturai(e,a){return 0===e&&1===a?Math.round((Number(objTextUnidade.value)-273.15)*10**casasDecimais)/10**casasDecimais:1===e&&0===a?Math.round((Number(objTextUnidade.value)+273.15)*10**casasDecimais)/10**casasDecimais:0===e&&2===a?Math.round((1.8*Number(objTextUnidade.value)-459.67)*10**casasDecimais)/10**casasDecimais:2===e&&0===a?Math.round((Number(objTextUnidade.value)+459.67)/1.8*10**casasDecimais)/10**casasDecimais:1===e&&2===a?Math.round((Number(objTextUnidade.value)/5*9+32)*10**casasDecimais)/10**casasDecimais:2===e&&1===a?Math.round(5*(Number(objTextUnidade.value)-32)/9*10**casasDecimais)/10**casasDecimais:e===a?objTextUnidade.value:void 0}objTextUnidade.addEventListener("input",(()=>{calcula()})),funcaoPrincipal(),verifica(),decimais(),getCotacoes();