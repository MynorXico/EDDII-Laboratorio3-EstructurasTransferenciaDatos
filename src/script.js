
function clearJSON(){
	
	var strJSON = '{"added-items":[]}';
	localStorage.setItem("JSON", strJSON);
	alert("Se limpiaron los registros");
	
}
function addRegister(){
	var new_key = document.getElementById("key").value;
	var new_value = document.getElementById("value").value;
	if(new_key == ""|| new_value == ""){
		alert("Ingrese datos válidos");
		return;
	}
	// Crea el JSON cuando aún no está creado
	var a = localStorage.getItem("JSON");
	if(a==null){
		alert("Se creará JSON");
		var strJSON = '{"added-items":[]}';
		localStorage.setItem("JSON", strJSON);
	}
	// Se asume que ya existe
	var JSON_obj = JSON.parse(localStorage.getItem("JSON"));
	JSON_obj["added-items"].push(JSONItem(new_key, new_value));
	var strJSON = JSON.stringify(JSON_obj);
	localStorage.setItem("JSON", strJSON);
}
function showJSON(){
	document.getElementById("output").innerHTML = "Hola";
	if(localStorage.getItem("JSON") == null){
		alert("Aún no existen registros");
		return;
	}
	document.getElementById("output").innerHTML = localStorage.getItem("JSON");
}


function JSONItem(key, value){
	return {"key": key, "value": value};
}