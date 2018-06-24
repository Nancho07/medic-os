function alerta(alertas){
    if(alertas.btnConfirma=="Si"){
      $.confirm({
          title: 'Requiere Confirmaci&oacute;n:',
          theme: alertas.tema,
          draggable: true,
          content: alertas.contenido,
          icon: alertas.icon,
          color : alertas.color,
		      btnColor:alertas.btnColor,
          animation: 'scale',
          closeAnimation: 'scale',
          opacity: 0.5,
          type: alertas.color,
          useBootstrap: false,
          boxWidth: alertas.columnClass || '30%',
          buttons:{
              confirm:{
                  text: "Aceptar",
                  btnClass: 'btn-warning',
                  action: function(){
                      alertas.funcionConfirma();
                  }
              },
              cancel: {
                  text: "Cancelar",
                  btnClass: 'btn-success',
                  action: function(){
                      alertas.funcionCancela();
                  }
              }
          }
      });
    }else if(alertas.btnConfirma=="No"){
        $.confirm({
            title: 'Mensaje:',
            icon: alertas.icon,
            content: alertas.contenido,
            theme: alertas.tema,
            draggable: true,
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.9,
            color : alertas.color,
			      btnColor:alertas.btnColor,
            type: alertas.color,
            typeAnimated: true,
            useBootstrap: false,
            boxWidth: alertas.columnClass || '30%',
            buttons: {
		        somethingElse: {
		            text: 'Aceptar',
		            btnClass: alertas.btnColor,
		            keys: ['enter', 'shift'],
		            action: function(){
		                //$.alert('Something else?');
		            }
		        }
		    }
        });
    }
}
