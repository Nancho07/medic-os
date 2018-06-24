function setName() {
	/*usuario.usuario = getCookie('usuario_medicall');
	usuario.usuario_k = getCookie('usuario_medicall_k');
	usuario.citas.doctor_k = getCookie('usuario_medicall_doctor_k');
	usuario.usuario_nombre = getCookie('usuario_medicall_name');
	usuario.especialidad_k = getCookie('usuario_medicall_area');
	usuario.citas.especialidad_k = getCookie('usuario_medicall_area');
	usuario.changeDoctor = 0;
	usuario.prefix = getCookie('usuario_medicall_prefix');
	usuario.email = getCookie('usuario_medicall_email');
	usuario.pagina = "menu";
	
	usuario.fecha_operacion = moment(new Date()).format('YYYY-MM-DD');
	if(usuario.usuario && usuario.usuario!=undefined){
        usuario.aplicacion_parent_k = 6;
		socket.emit('identificacion', usuario);
	}else{
	  document.location.href="index.html";
	}*/
}
function cargarMedicos(datos){
	usuario.cambioArea = datos;
	agendaMenu();
	socket.emit("buscarMedicos",usuario); 
}
function cargarMedicosData(datos){
	usuario.citas.doctor_k = datos;
	agendaMenu();
}
function seleccionado(data){
	var id = $(data).attr("id");
	id=id.replace(/^selecc_/, "");
	setCookie('usuario_medicall_seleccionado',id,0);
	$.each($(".pacientes-list li span"),function(item,index){
		$(index).css("color","black");
	});
	$(data).parent().parent().children("span").css("color","blue");
	$(data).parent().parent().children("span:first").css("color","red");
}
function aceptar(){
	usuario.citas.cancelar = 1;
	usuario.citas.paciente_k="update";
	usuario.citas.accion="cancelar";
	socket.emit("programaConsulta",usuario);
}
function aceptar_restauracion(){
	usuario.citas.cancelar = 0;
	usuario.citas.paciente_k="update";
	usuario.citas.accion="restaurar";
	socket.emit("programaConsulta",usuario);
}
function cancelar(){
	usuario.citas.cancelar = 0;
}
function cancelado(data){
	if($("#tabs_p_cancelados").attr("class")=="active"){
		var fn = aceptar_restauracion,
				mensaje= "¿Realmente desea restaurar esta cita?";
	}else{
		var fn = aceptar,
				mensaje= "¿Realmente desea cancelar esta cita?";
	}
	var id = $(data).attr("id");
	id=id.replace(/^quitar_/, "");
	usuario.citas.cita_k = id;
	var datos = {
		mensaje:mensaje,
		data:id,
		btnConfirma:"Si",
		funcionCancela:cancelar,
		funcionConfirma:fn
	};
	delServidor(datos);
}

function guardarOrden(){
	var data=[];
	$.each($(".pacientes-list span"),function(item,index){
		if($(index).hasClass("text")==true){
			var datos = {}
			var texto = $(index).text();
			var array = texto.split('-');
			var hora = array[0].trim();
			var hora_ant = $(index).attr("data-time");
			var cita_k = $(index).parent().attr("id");
			datos.hora_ant= hora_ant;
			datos.hora= hora;
			datos.cita_k=cita_k;
			if(hora!=hora_ant){
				data.push(datos);
			}
		}
	});
	usuario.reordenarCitas = data;
	socket.emit("reOrdenarCitas",usuario);
}
$(document).ready(function($){
	$(".pacientes-list").empty();
	$(".pacientes-list0").empty();
	$(".pacientes-list1").empty();
	$("#seccion_a").empty();
	/*var texto_list = '<li>'+
		'<!--<span class="handle">'+
			'<i class="fa fa-ellipsis-v"></i>'+
			'<i class="fa fa-ellipsis-v"></i>'+
		'</span>'+
		'<input type="checkbox" value="" name="" />-->'+
		'<span class="text">No hay registros de citas para hoy</span>'+
		'<!--<small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small>'+
		'<div class="tools">'+
			'<i class="fa fa-edit"></i>'+
			'<i class="fa fa-trash-o"></i>'+
		'</div>-->'+
	'</li>';*/
    var texto_list = '<li class="list-group-item allow-badge widget uib_w_12" data-uib="twitter%20bootstrap/list_item" data-ver="1" style="height:70px;">'+
        '<div class="col-xs-2" style="padding:0px;height:100%;float:left"><img class="handle" src="images/salud.png" width="100%" /></div>'+
        '<div class="col-xs-10">'+
        '<h4 class="list-group-item-heading">No hay pacientes registrados</h4>'+
            '<p class="list-group-item-text"><H5> Hora:xx:xx:xx- Edad:xx  años</H5></p>'+
        '</div>'+
    '</li>';
	$(".pacientes-list").append(texto_list);

	$(".pacientes-list").todolist({
		onCheck: function (ele) {
			console.log("El registro ha sido chequeado")
		},
		onUncheck: function (ele) {
			console.log("El registro ha sido liberado")
		}
	});

	function pad(num) {
    return ("0"+num).slice(-2);
	}
	function hhmmss(secs) {
	  var minutes = Math.floor(secs / 60);
	  secs = secs%60;
	  var hours = Math.floor(minutes/60)
	  minutes = minutes%60;
	  return pad(hours)+":"+pad(minutes)+":"+pad(secs);
	}

	$(".pacientes-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999,
		update: function(){
			var horas = [];
			var valores;
			var minutos;
			var z=0;
			$.each($(".pacientes-list span"),function(item,index){
				if($(index).hasClass("text")==true){
					var hora = moment($(index).attr("data-time"), 'HH:mm:ss');
					horas.push(hora._d);
				}
			});
			horas.sort();
			var mtotal  = horas.length;
			var minute  = Math.max("1200000");//20minutos
			var result_min  = Math.min.apply(null,horas);
			var result  = moment(Math.min.apply(null,horas)).format('HH:mm:ss');
			var resultm = moment(Math.max.apply(null,horas)).format('HH:mm:ss');
			/*for(var i=0;i<mtotal;i++){
				var sumar = minute*i;
				console.log(moment(result_min+sumar).format('HH:mm:ss'));
			}*/
			$.each($(".pacientes-list span"),function(item,index){
				var sumar = minute*z;
				if($(index).hasClass("text")==true){
					var texto = $(index).text();
					var array = texto.split('-');
					var fin_texto = moment(result_min+sumar).format('HH:mm:ss')+" -"+array[1]+" -"+array[2];
					$(index).text(fin_texto);
					z++;
				}
			});
      var ordenElementos = $(this).sortable("toArray").toString();
			var nuevoOrden = ordenElementos;
			usuario.nuevoOrden=nuevoOrden;
      //socket.emit("reOrdenarCitas",usuario);
	   }
  });
	$("#restablecerOrden").click(function(){
		agendaMenu();
		/*$.each($(".pacientes-list span"),function(item,index){
			if($(index).hasClass("text")==true){
				var texto = $(index).text();
				var array = texto.split('-');
				var fin_texto = $(index).attr("data-time")+" -"+array[1]+" -"+array[2];
				$(index).text(fin_texto);
			}
		});*/
	});
	socket.on("cargarCitasMenu",function(data){         
		var p_cancelados = 0;
		if(data.success2==true){
				if(data.periodo_citas=="dia"){
					$("#pacientes_hoy").empty();
					$("#pacientes_hoy").val(data.parent2.length);

					if(data.parent2.length>0){
						$(".pacientes-list").empty();
						$(".pacientes-list0").empty();
						$(".pacientes-list1").empty();
						for(var i = 0; i<data.parent2.length;i++){
							if(data.parent2[i].cancelado===0){
								var vclase = "";
							}else{
								var vclase = "text-danger";
							}
                            console.log(data.parent2[i].sexo)
                            if(data.parent2[i].sexo=="F"){
                                var imagen = "images/femenino.png";
                            }if(data.parent2[i].sexo=="M"){
                                var imagen = "images/masculino.png";
                            }else if(data.parent2[i].sexo==""){
                                var imagen = "images/salud.png";
                            }
                            var texto_list = '<li class="list-group-item allow-badge widget uib_w_12" data-uib="twitter%20bootstrap/list_item" data-ver="1" style="height:70px;">'+
                                '<div class="col-xs-2" style="padding:0px;height:100%;float:left"><img class="handle" src='+imagen+' width="100%" /></div>'+
                                '<div class="col-xs-10">'+
                                '<h4 class="list-group-item-heading">'+data.parent2[i].paciente+'</h4>'+
                                    '<p class="list-group-item-text"><H5> Hora: '+data.parent2[i].time+' - Edad: '+data.parent2[i].edadReal+' años</H5></p>'+
                                '</div>'+
                            '</li>';
                            /*data.parent2[i].title =data.parent2[i].paciente;
							var texto_list = '<li id="'+data.parent2[i].cita_k+'">'+
                                '<div class="label label-primary col-xs-12" align="left">'+
                                    '<span id="num_'+i+'" class="handle" style="font-size: 25px;">'+
                                        '<i class="fa fa-ellipsis-v"></i>'+
                                        '<i class="fa fa-ellipsis-v"></i>'+
                                        '<i class="fa fa-ellipsis-v"></i>'+
                                        '<i class="fa fa-ellipsis-v"></i>'+
                                    '</span>'+
                                    '<input type="checkbox" value="" name="" id="'+data.parent2[i].expediente_k+'" style="display:none"/>'+ 
                                
                                    '<span data-time = "'+data.parent2[i].time+'" class="text '+vclase+'"  style="font-size:15px;">'+data.parent2[i].time+' - '+' Edad: '+data.parent2[i].edadReal+' años</span><br>'+

                                    '<span class="text '+vclase+'"  style="font-size:15px;">'+data.parent2[i].title+'</span><br>'+                         
                                    
                                    '<div class="tools">'+
                                        '<i id="selecc_'+data.parent2[i].identidad+'" class="fa fa-edit" onclick="seleccionado(this)"></i>'+
                                        '<i id="quitar_'+data.parent2[i].cita_k+'"class="fa fa-trash-o" onclick="cancelado(this)"></i>'+
                                    '</div>'+
                                '</div>'+								
							'</li>';*/

							if(data.parent2[i].cancelado===0){
								$(".pacientes-list").append(texto_list);
							}else{
								p_cancelados++;
								$("#p_cancelados").text(p_cancelados);
								$(".pacientes-list1").append(texto_list);
								//$("#quitar_"+data.parent2[i].cita_k).remove();
							}
							if(i+1==data.parent2.length){
								buscarAtencionMedica();
							}
                        }
					}
				}
		}else{
			$("#pacientes_hoy").val(0);
			$("#total_pacientes").val(0);
			$("#p_atendidos").val(0);
			$("#p_hoy").text(0);
			$(".pacientes-list").empty();
			$(".pacientes-list0").empty();
			$(".pacientes-list1").empty();
			var texto_list = '<li>'+
				'<span class="handle">'+
					'<i class="fa fa-ellipsis-v"></i>'+
					'<i class="fa fa-ellipsis-v"></i>'+
				'</span>'+
				'<input type="checkbox" value="" name="" id="" style="display:none"/>'+
				'<span class="text">'+data.mensaje2+'</span>'+
			'</li>';
			$(".pacientes-list").append(texto_list);
		}
		$(".pacientes-list").todolist({
			onCheck: function (ele) {
				//console.log("El registro ha sido chequeado")
			},
			onUncheck: function (ele) {
				//console.log("El registro ha sido liberado")
			}
		});
  });
	socket.on("cargarSinCitasMenu",function(data){
		var p_cancelados = 0;
		if(data.success2==true){
				if(data.periodo_citas=="dia"){
					$("#p_sin_citas").text(0);
					//$("#pacientes_hoy").val(data.parent2.length);
					if(data.parent2.length>0){
						$(".pacientes-list2").empty();
						var atend =0;
						for(var i = 0; i<data.parent2.length;i++){
							if(data.parent2[i].cancelado===0){
								var vclase = "";
							}else{
								var vclase = "text-danger";
							}
              data.parent2[i].title =data.parent2[i].time+' - '+data.parent2[i].paciente+' - Edad: '+data.parent2[i].edadReal+" -> NO TENIA CITA";
							/*var texto_list = '<li id="l2'+data.parent2[i].expediente_k+'">'+
								'<span id="num_'+i+'"class="handle">'+
									'<i class="fa fa-ellipsis-v"></i>'+
									'<i class="fa fa-ellipsis-v"></i>'+
									'<i class="fa fa-ellipsis-v"></i>'+
									'<i class="fa fa-ellipsis-v"></i>'+
								'</span>'+
								'<input type="checkbox" value="" name="" id="c'+data.parent2[i].expediente_k+'" style="display:none"/>'+
								'<span data-time = "'+data.parent2[i].time+'" class="text '+vclase+'">'+data.parent2[i].title+'</span>'+
								'<div class="tools">'+
									'<i id="selecc_'+data.parent2[i].identidad+'" class="fa fa-edit" onclick="seleccionado(this)"></i>'+
								'</div>'+
							'</li>';*/
                            console.log(data.parent2[i].sexo)
                            if(data.parent2[i].sexo=="F"){
                                var imagen = "images/femenino.png";
                            }if(data.parent2[i].sexo=="M"){
                                var imagen = "images/masculino.png";
                            }else if(data.parent2[i].sexo==""){
                                var imagen = "images/salud.png";
                            }
                            var texto_list = '<li class="list-group-item allow-badge widget uib_w_12" data-uib="twitter%20bootstrap/list_item" data-ver="1" style="height:70px;">'+
                                '<div class="col-xs-2" style="padding:0px;height:100%;float:left"><img class="handle" src='+imagen+' width="100%" /></div>'+
                                '<div class="col-xs-10">'+
                                '<h4 class="list-group-item-heading">'+data.parent2[i].paciente+'</h4>'+
                                    '<p class="list-group-item-text"><H5> Hora: '+data.parent2[i].time+' - Edad: '+data.parent2[i].edadReal+' años</H5></p>'+
                                '</div>'+
                            '</li>';
							if(data.parent2[i].cancelado===0){
								atend++;
								//$("#p_sin_citas").text(atend);
								$(".pacientes-list0").append(texto_list);
								var id = data.parent2[i].expediente_k;
								$("#l2"+id).addClass("done");
								//console.log(parseInt(atendidos)+atend)
							}else{
								p_cancelados++;
								$("#p_cancelados").text(p_cancelados);
								$(".pacientes-list1").append(texto_list);
							}
							if(i+1==data.parent2.length){
								var total=(i+1);
								var tp0 = $("#total_pacientes").val();
								var tp = parseInt(tp0)+parseInt(total);
								$("#total_pacientes").val(tp);
								$("#p_atendidos").text(tp);
							}
            }
					}
				}
		}
  });
	//agendaMenu();
	function buscarAtencionMedica(){
 	 usuario.citas.pagina	= "menu";
 	 usuario.periodo_citas = "dia";
 	 //usuario.citas.name	= getCookie('usuario_medicall');
	 if(usuario.changeDoctor == 1){

	 }else{
         /* usuario doctor_k es para las enfermeras puedan seleccionar el doctor */
		 usuario.citas.doctor_k=usuario.config_k;
	 }
	 //usuario.email=getCookie('usuario_medicall_email');
 	 usuario.citas.fecha = {};
 	 usuario.citas.fecha.start=moment(new Date()).format('YYYY-MM-DD');
 	 usuario.citas.fecha.end=moment(new Date()).format('YYYY-MM-DD');
 	 //usuario.prefix=getCookie('usuario_medicall_prefix');
 	 usuario.citas.cita_k=0;
	 usuario.fecha_hoy=moment(new Date()).format('YYYY-MM-DD');
	 //console.log("Agenda Menu2: ",usuario);
 	 socket.emit("buscarAtencionMedica",usuario);
  }

	socket.on("buscarAtencionMedica",function(datos){
		//console.log("Buscar Atencion Medica-->->-> ",datos.parent2);
		var o = 0;
		var total = datos.parent2.length;
		for(var i = 0; i<total;i++){
			$(".pacientes-list input").each(function(item,index){
				var id = $(index).attr("id");
				$("#total_pacientes").val(o);
				$("#p_atendidos").text(o);
				if(datos.parent2[i].expediente_k == id){
					if(datos.parent2[i].cita_expediente!=null){
						o=o+1;
						$("#"+id).click();
						$("#quitar_"+id).remove();
						var liNuevo = $("#"+id).parent().clone();
						$("#"+id).parent().remove();
						$(".pacientes-list0").append(liNuevo);
					}else if(datos.parent2[i].cita_pre!=null){
						$("#"+id).click();
					}else if(datos.parent2[i].cita_consulta!=null){
						$("#"+id).click();
					}
				}
		   });
			 if(i+1==total){
				 $("#pacientes_hoy").val($("#pacientes_hoy").val()-o);
				 $("#p_hoy").text(parseInt($("#pacientes_hoy").val())-parseInt($("#p_cancelados").text()));
				 usuario.citas.periodo="dia";
				 usuario.periodo_citas="dia";
				 socket.emit("cargarSinCitasMenu",usuario);
			 }
		}
	});
	/********RELOJ***********************************************************************************************/
	function show(){
		var Digital=new Date()
		var hours=Digital.getHours()
		var minutes=Digital.getMinutes()
		var seconds=Digital.getSeconds()
		var dn="AM"
		if (hours>12){
		dn="PM"
		hours=hours-12
		}
		if (hours==0)
		hours=12
		if (minutes<=9)
		minutes="0"+minutes
		if (seconds<=9)
		seconds="0"+seconds
		$("#hora").val(hours+":"+minutes+":"+seconds+" "+dn);
		setTimeout(function(){
			show();
		},1000);
	}
	show();
	/**********************/
	socket.on('areasClinicas',function (data){
		$("#nombreDr").empty();
		$("#areas").empty();
		for(var i = 0; i<data.data.length;i++){
			var area = '<option value="'+data.data[i].area_k+'" style="font-size:1em">'+data.data[i].nombre+'</option>';
			$("#areas").append(area);
		}
		//usuario.area_k=getCookie('usuario_medicall_area_k');
		$("#areas option[value='"+usuario.area_k+"']").attr('selected', true);
		cargarMedicos(usuario.area_k);
	});

	socket.on("buscarMedicos",function(data){
		//console.log(data);
        var total = data.data.length;
		$("#nombreDr").empty();
		for(var i = 0; i<data.data.length;i++){
			var medicos = '<option value="'+data.data[i].usuario_k+'">'+data.data[i].nombre+'</option>';
			$("#nombreDr").append(medicos);
			if(data.data[i].nombre == "no hay datos que mostrar"){
				$("#pacientes_hoy").val(0);
				$("#total_pacientes").val(0);
				$("#p_hoy").text(0);
				$("#p_atendidos").val(0);
				$(".pacientes-list").empty();
				$(".pacientes-list0").empty();
				$(".pacientes-list1").empty();
				var texto_list = '<li>'+
					'<span class="handle">'+
						'<i class="fa fa-ellipsis-v"></i>'+
						'<i class="fa fa-ellipsis-v"></i>'+
					'</span>'+
					'<input type="checkbox" value="" name="" id="" style="display:none"/>'+
					'<span class="text">'+data.data[i].nombre+'</span>'+
				'</li>';
				$(".pacientes-list").append(texto_list);
			}else{
				usuario.changeDoctor = 0;
				//agendaMenu();
			}
            if(i+1 == total){
				$("#restablecerOrden").click();
			}
		}
		$("#nombreDr option[value="+usuario.doctor_k+"]").attr('selected', true);
		$(".fc-month-button").click();
		/*$("#nombreDr option[value='"+getCookie('usuario_medicall_name')+"']").attr('selected', true);
		cargarMedicos(getCookie('usuario_medicall_name'));*/
	});
	$(".fc-row").css("height","20px");
});
function agendaMenu(){
	$(".pacientes-list").empty();
	$(".pacientes-list0").empty();
	$(".pacientes-list1").empty();
	$("#p_cancelados").text(0);
	$("#p_atendidos").text(0);
	$("#p_hoy").text(0);
	usuario.citas.pagina	= "menu";
	usuario.periodo_citas = "dia";
	usuario.citas.name	= usuario.nombre;
	//usuario.email=getCookie('usuario_medicall_email');
	usuario.citas.especialidad_k=$("#areas").val();
	usuario.citas.doctor_k=$("#nombreDr").val();
	usuario.citas.fecha = {};
	usuario.citas.fecha.start=moment(new Date()).format('YYYY-MM-DD');
	usuario.citas.fecha.end=moment(new Date()).format('YYYY-MM-DD');
	usuario.citas.cita_k=0;
	usuario.fecha_hoy=moment(new Date()).format('YYYY-MM-DD');
    //console.log("cargarCitasMenu: ",usuario)
	socket.emit("cargarCitasMenu",usuario);
}
