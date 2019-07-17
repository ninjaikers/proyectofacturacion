import { Injectable } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';



@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private indexedDB: NgxIndexedDB;

  constructor() {
    this.indexedDB = new NgxIndexedDB('facturacion', 1);

    this.indexedDB.openDatabase(1, (evt) => {
      const objectStore = evt.currentTarget.result.createObjectStore(
        'facturas', { autoIncrement : true });
    });
  }//end constructor


  public async addFactura(factura?) {

    try {
      let result = await this.indexedDB.add('facturas', factura);
      window.alert('Factura Registrada ');
    } catch (erro) {
      window.alert('Error al Registrar la Factura');
      console.error(erro);
    }
  }

  public async updateFactura(factura) {
    try {
      let result = await this.indexedDB.update('facturas', factura, factura.facturaNumero);
      window.alert('Factura Actualizada');
    } catch (erro) {
      window.alert('Error al actualizar la factura');
      console.error(erro);
    }
  }

  


  getTotalFacturas(){
    return new Promise( (resolve, reject) => {
      let db: NgxIndexedDB = new NgxIndexedDB('facturacion', 1);

      db.openDatabase(1).then(function() {
        db.count('facturas').then((person) => {
            if (person) {
              resolve(person);
            } else {
              reject('Error al obtener las factuas');
            }
          }, (error) => {
            console.log(error);
          });
       });
})
  }

  getByFacturaNumero(facturaNumero){
    return new Promise( (resolve, reject) => {
      let db: NgxIndexedDB = new NgxIndexedDB('facturacion', 1);

      db.openDatabase(1).then(function() {
        db.getByKey('facturas', facturaNumero).then((person) => {
            if (person) {
              resolve(person);
            } else {
              reject('Error al obtener las factuas');
            }
          }, (error) => {
            console.log(error);
          });
       });
})
  }

  getByIndex(){
    let db: NgxIndexedDB = new NgxIndexedDB('facturacion', 1);
    db.openDatabase(1)
        .then(function() {
    db.getByIndex('facturas', 'documento', 'documento').then(
      person => {
          console.log(person.descripcion);
      },
      error => {
          console.log(error);
      }
  );
});
  }

  getAllFacturas(){
    return new Promise( (resolve, reject) => {
        let db: NgxIndexedDB = new NgxIndexedDB('facturacion', 1);

        db.openDatabase(1).then(function() {
          db.getAll('facturas').then((person) => {
              if (person) {
                resolve(person);
              } else {
                reject('Error al obtener las factuas');
              }
            }, (error) => {
              console.log(error);
            });
         });
 })
  }




  async deleteFactura(factura){
    factura.facturaStatus ='borrada';
    //const f = ({facturaStatus : 'borrada'});
    try {
      let result = await this.indexedDB.update('facturas', factura, factura.facturaNumero);
      window.alert('Factura Eliminada');
    } catch (erro) {
      window.alert('Error saving to db');
      console.error(erro);
      
    }
  }
  


}//end class
