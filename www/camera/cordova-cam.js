(function(){
'use strict';
var pictureSource;
var destinationType;
var imageID;
function onDeviceReady() {
    if (!navigator.camera) {
      throw new Error('Cordova camera plugin required to access hardware camera.');
    }
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;    
    if (!FileTransfer) {
      throw new Error('Cordova File Transfer required.');
    }
} 
document.addEventListener("app.Ready", onDeviceReady, false);
function onPhotoDataSuccess(imageData) {
    delServidor({mensaje:"Capturando imagen" + imageData});
  var imageNode = $(imageID);
  var photo = imageData; //'data:image/jpeg;base64,' + imageData;
  imageNode.attr('src', photo);
    function win(r) {
        //console.log("Code = " + r.responseCode);
    }    
    function fail(error) {
        delServidor({mensaje:"An error has occurred: Code = " + error.code,success:false});
    }
    var uri = encodeURI($("#inputrootUrl").val());
    var fileURL = imageData;
    var options = new FileUploadOptions();
        options.fileKey="file";
    var params={}; 
        params.paciente_k=$("#pre_paciente_k").val();
        params.nombres	=$("#pre_nombre").val();
        params.apellidos	=$("#pre_apellido").val();
        params.num_id	=$("#pre_identidad").val();
        params.prefix	=$("#pre_prefix").val();
        params.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
        //params.foto =
        options.params = params;
        var FT=fileURL.substr(fileURL.lastIndexOf('/')+1);
        var lastJpg = FT.substr(FT.length - 3);
        if(lastJpg!=="jpg"){
            FT=FT.replace(/%/g,"_");
            options.fileName=FT+".jpg";
        }
        options.mimeType="image/jpeg"; 
        options.directorio="imgPanta"; 
        var headers={'headerParam':'headerValue'};    
        options.headers = headers;
    socket.emit("imagenPaciente",options); 
    /*var ft = new FileTransfer();
    ft.onprogress = function(ProgressEvent) {
        if (ProgressEvent.lengthComputable) {
            pbar.setValue(Math.round(ProgressEvent.loaded / ProgressEvent.total*100));
            if(Math.round(ProgressEvent.loaded / ProgressEvent.total*100)==100){
                $('#msg').text('Completado!');
            }else{
                $('#msg').text('Enviando...'+FT);  
                if (Math.round(ProgressEvent.loaded / ProgressEvent.total*100) % 2 == 0){
                    $('#msg').css('bacground-color','red');
                }else{
                    $('#msg').css('bacground-color','blue');
                }
            }
        }else{
          loadingStatus.increment();
        }
    };    
    ft.upload(fileURL, uri, win, fail, options); */    
}

// Called when a photo is successfully retrieved (photo retrieved)
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  // console.log(imageURI);
  // Get image handle
  var imageDOM = $(imageID);    
  // Show the captured photo
    //alert(imageURI);
  imageDOM.attr('src', imageURI);    
}

// A button will call this function
function capturePhoto(uib_id) {
  imageID = uib_id || '#imgPre';
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
    destinationType: destinationType.FILE_URI });//DATA_URI
}
window.capturePhoto = capturePhoto;

// A button will call this function    
/******************************* save *********************************/
function captureAndSavePhoto(uib_id) {
 //$("#nombreImg").empty();
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }
  imageID = uib_id || '#IMAGE';
  //desinationType and saveToPhotoAlbum must be set correctly to save the photo to the camera roll
  var cameraOptions = {
    quality: 20,
    destinationType: destinationType.FILE_URI,
    saveToPhotoAlbum: true
  };
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, cameraOptions);
}
window.captureAndSavePhoto = captureAndSavePhoto;

// A button will call this function
function capturePhotoEdit(uib_id) {
  imageID = uib_id || '#IMAGE';
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
    destinationType: destinationType.DATA_URL,sourceType: source });
}
window.capturePhotoEdit = capturePhotoEdit;

// A button will call this function
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });//pictureSource
}
window.getPhoto = getPhoto;

// Called if something bad happens.
function onFail(message) {
  throw new Error('Camera failed: ' + message);
  alert('Error causado por: ' + message);
}
 /*********************** Hernan ***********************/
function getImage(source){
  var cameraOptions = {
    quality: 20,
    destinationType: destinationType.FILE_URI,
    sourceType: source,
    saveToPhotoAlbum: false
  };
    navigator.camera.getPicture(onPhotoDataSuccess, onCapturePhotoError,cameraOptions);
    
    /*var cameraOptions1 = {
    quality: 20,
    destinationType: destinationType.DATA_URL,
    sourceType: source,
    saveToPhotoAlbum: false
  };
    navigator.camera.getPicture(onCapturePhotoSuccess, onCapturePhotoError,cameraOptions1);*/
}
window.getImage = getImage;
function onCapturePhotoSuccess(imageURI){ 
  var imageNode = document.getElementById('IMAGE');
  var photo = imageURI;
  imageNode.src="data:image/jpeg;base64,"+photo;
}
function onCapturePhotoError(message){
    console.log('Captured Failed because: ' + message); 
}  
})();
