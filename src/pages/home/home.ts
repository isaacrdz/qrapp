import { Component } from '@angular/core';

//Componentes
import { ToastController, Platform } from 'ionic-angular';

//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform) {}

  scan(){
    console.log("Realizando Scan");
    if (!this.platform.is('cordova')){
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log("result:",barcodeData.text);
     console.log("format",barcodeData.format);
     console.log("cancelled",barcodeData.cancelled);
    }, (err) => {
        // An error occurred
        console.log("Error: ", err);
        this.mostrar_error("Error: " + err);
    });
  }
  mostrar_error(mensaje:string){
    let toast = this.toastCtrl.create({
     message: mensaje,
     duration: 2500
   });
   toast.present();
  }

}
