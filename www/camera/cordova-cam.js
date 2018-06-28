(function(){
'use strict';
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var imageID;
// Cordova is ready to be used!
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
// Called when a photo is successfully retrieved (photo taken)
function onPhotoDataSuccess(imageData) {
  var imageNode = $(imageID);
  imageNode.attr('src', "data:image/jpeg;base64,"+imageData); 
    function win(r) {
        //console.log("Code = " + r.responseCode);
    }    
    function fail(error) {
        delServidor({mensaje:"An error has occurred: Code = " + error.code,success:false});
    }
    
    var datosPaciente={};    
        datosPaciente.paciente_k=$("#pre_paciente_k").val().trim();
        datosPaciente.nombres	=$("#pre_nombre").val().trim();
        datosPaciente.apellidos	=$("#pre_apellido").val().trim();
        datosPaciente.num_id	=$("#pre_identidad").val().trim();
        datosPaciente.prefix	=$("#pre_prefix").val().trim();
        datosPaciente.fecha_modificacion = moment(new Date()).format('YYYY-MM-DD');
        datosPaciente.foto = imageNode.attr('src');
        datosPaciente.app	="medic"; 
        
    imageNode.load(function(){   
        socket.emit("imagenPaciente",datosPaciente);   
    }); 
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
  // Take picture using device camera and retrieve image as base64-encoded string
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }    
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
    destinationType: destinationType.DATA_URL,correctOrientation:true,saveToPhotoAlbum: false});//DATA_URI,DATA_URL,sourceType: source
}
window.capturePhoto = capturePhoto;

// A button will call this function    
/******************************* save *********************************/
function captureAndSavePhoto(uib_id) {
 //$("#nombreImg").empty();
  if(!navigator.camera) {
    onFail('Missing the Cordova camera plugin');
  }
  imageID = uib_id || '#imgPre';
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
  imageID = uib_id || '#imgPre';
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
    var imageNode = document.getElementById('imgPre');
    var photo = imageURI;
    imageNode.src="data:image/jpeg;base64,"+photo;
}
function onCapturePhotoError(message){
    console.log('Captured Failed because: ' + message); 
}  
})();
