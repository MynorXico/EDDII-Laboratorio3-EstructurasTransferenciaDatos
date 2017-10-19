
function clearJSON(){
	
	var strJSON = '{"key-value-pairs":[]}';
	localStorage.setItem("JSON", strJSON);
	alert("Se limpiaron los registros");
	document.getElementById("output").innerHTML="";
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
		var strJSON = '{"key-value-pairs":[]}';
		localStorage.setItem("JSON", strJSON);
	}
	// Se asume que ya existe
	var JSON_obj = JSON.parse(localStorage.getItem("JSON"));
	JSON_obj["key-value-pairs"].push(JSONItem(new_key, new_value));
	var strJSON = JSON.stringify(JSON_obj);
	localStorage.setItem("JSON", strJSON);
	alert("El registro se agregó correctamente");	
}
function showJSON(){
	
	document.getElementById("output").innerHTML = "";
	if(localStorage.getItem("JSON") == null){
		alert("Aún no existen registros");
		return;
	}
	if(document.getElementById('xmlb').checked)
	{
	
		var str= JSON.stringify( localStorage.getItem("JSON"));
		var o=JSONtoXML(str);
		document.getElementById("output").innerHTML = o;
	}
	else
	{
		document.getElementById("output").innerHTML = localStorage.getItem("JSON");
	}
	return false;
}
function JSONtoXML(json_object)
{
	json_object=json_object.replace(/\\/g,"");
	json_object=json_object.replace(/\"/g, "");
	//crar el xml 
	var header='&lt;?xml version="1.0" encoding="UTF-8"?>'+'<br/>';
	var counter=json_object.length;
	var auxlenght=0;
	var finaltag='';
	for(var i=0;i<counter;i++)
	{
		if(json_object.charAt(i)=='[')//la primera llave
		{
			finaltag=json_object.substring(1,auxlenght-2);
			var JSONname='&lt;'+json_object.substring(1,auxlenght-2)+'>'+'<br/>';//lo que va donde iria <catalog>
			var allValues=json_object.substring(auxlenght);
			allValues=allValues.substring(1,allValues.length-2);
			var pairs=allValues.split("}");//separo lo que van a ser las tags
			var xmlBody=header+JSONname+'\n';
			for(var j=0;j<pairs.length-1;j++)//limpiar cada par de llave-valor
		    {
				var keyvalue=pairs[j];
				keyvalue=j!=0?keyvalue.substring(2):keyvalue.substring(1);
				var chain=keyvalue.split(",");//se tiene los pares llave valor
				var tag='&lt;'+(chain[0].split(":")[1])+">";//la cosas que abren y cierran
				var closetag=tag.substring(0,tag.length-1)+"/>" ;
				var tagvalue='&nbsp;'+'&nbsp;'+'&nbsp;'+((tag+chain[1].split(":")[1]+closetag));//las cosas que tienen adentro las tags
				xmlBody+=tagvalue+'<br/>';
			}
			break;
		}
		auxlenght++;
	}
	xmlBody+='&lt'+finaltag+'/>';	
	return xmlBody;	
}
function JSONItem(key, value){
	return {"key": key, "value": value};
}