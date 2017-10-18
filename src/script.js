
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
	var flag=localStorage.getItem("XML");
	if(flag==null)
	{
		alert("Se creara la esctructura xml");
		var strXML="";
		localStorage.setItem("XML",strXML);
	}
	//crar el xml 
	var header='<?xml version="1.0" encoding="UTF-8"?'+'\n';
	var counter=json_object.length;
	var auxlenght=0;
	var masterCloseTag='';
	for(var i=0;i<counter;i++)
	{
		
		if(json_object.charAt(i)=='[')//la primera llave
		{
			var JSONname='<'+json_object.substring(2,auxlenght-2)+'>';//lo que va donde iria <catalog>
		     masterCloseTag=JSONname;
			var allValues=json_object.substring(auxlenght);//quito mas porqueria
			allValues=allValues.substring(1,allValues.length-2);//quito mas porqueria
			var pairs=allValues.split("}");//separo lo que van a ser las tags
			var xmlBody=header+JSONname+'\n';
			for(var j=0;j<pairs.length-1;j++)//limpiar cada par de llave-valor
		    {
				var keyvalue=pairs[j];
				keyvalue=j!=0?keyvalue.substring(2):keyvalue.substring(1);
				var chain=keyvalue.split(",");//se tiene los pares llave valor
				var tag='<'+chain[0].split(":")[1]+'>';//la cosas que abren y cierran
				var closetag=tag.substring(0,tag.length-2)+'/>';
				var tagvalue='    		'+(tag+chain[1].split(":")[1]+closetag).replace('"', "");//las cosas que tienen adentro las tags
				xmlBody+=tagvalue+'\n';
			}
			break;
		}
		auxlenght++;
	}
	masterCloseTag=masterCloseTag.substring(0,masterCloseTag.length-2)+'/>';
	xmlBody+=masterCloseTag;	
	return xmlBody;
	
}


function JSONItem(key, value){
	return {"key": key, "value": value};
}