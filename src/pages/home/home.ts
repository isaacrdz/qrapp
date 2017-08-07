import { Component } from '@angular/core';

//Componentes
import { ToastController, Platform } from 'ionic-angular';

//Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//Servicios
import { HistorialService } from '../../providers/historial/historial'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private _historialService:HistorialService ) {}

  scan(){
    console.log("Realizando Scan");
    if (!this.platform.is('cordova')){
      this._historialService.agregar_historial("http://google.com")
      return;
    }
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log("result:",barcodeData.text);
     console.log("format",barcodeData.format);
     console.log("cancelled",barcodeData.cancelled);

     if(barcodeData.cancelled == false && barcodeData.text != null){
       this._historialService.agregar_historial(barcodeData.text)

     }
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
