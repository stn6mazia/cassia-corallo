import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { map } from 'rxjs/operators';
import { Store } from '../../shared/store';

@Component({
  selector: 'app-store-settings-page',
  templateUrl: './store-settings-page.component.html',
  styleUrls: ['./store-settings-page.component.scss']
})
export class StoreSettingsPageComponent implements OnInit {

  districts
  storeInfo
  haveStoreInfo
  store: Store = new Store();

  returnedDistricts
  aditStore

  editDistrict
  editDistrictId
  editDistrictBody

  searchDistrictString
  returnedDistrictSearch: any[] = []

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    // função para rodar antes de criar ambiente
    //this.mountDistricts()

    this.getStoreInformation()
  }

  getStoreInformation() {
    this.storeService.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(store => {
      if (store.length > 0) {
        this.store = store[0]

        for (let i = 0; i < store[0].localRanges.length; i++) {
          store[0].localRanges[i].id = i
        }
        this.returnedDistricts = store[0].localRanges
        delete store[0].localRanges
        this.storeInfo = store[0]
        this.haveStoreInfo = true
      } else {
        this.haveStoreInfo = false
      }
    });
  }

  mountStore() {
    this.store.name = 'Carbonite Burger'
    this.store.offlinePayment = true
    this.store.adminKey = '-LwIyJs0fxiWHMdxc-uN'
    this.store.localRanges = this.districts
    this.store.open = true;
    this.store.transferPayment = false

    this.storeService.createStore(this.store)
  }

  logout() {
    sessionStorage.clear();
    window.location.reload()
  }

  searchDistrict(evt) {
    this.returnedDistrictSearch = []
    for (let i = 0; i < this.returnedDistricts.length; i++) {
      if (this.returnedDistricts[i].name.toUpperCase().includes(evt.toUpperCase())) {
        this.returnedDistrictSearch.push(this.returnedDistricts[i])
      }
    }
  }

  updateStoreInfo() {
    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        name: this.store.name,
        email: this.store.email,
        phone: this.store.phone,
        address: this.store.address,
        number: this.store.number,
        neightborhood: this.store.neightborhood,
      }
    )
      .catch(err => console.log(err));
    this.aditStore = false
  }

  openAndCloseStore() {
    this.storeInfo.open = !this.storeInfo.open
    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        open: this.storeInfo.open,
      }
    )
      .catch(err => console.log(err));
  }

  updateOfflinePaymentStatus() {
    this.storeInfo.offlinePayment = !this.storeInfo.offlinePayment
    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        offlinePayment: this.storeInfo.offlinePayment,
      }
    )
      .catch(err => console.log(err));
  }


  updateTransferPaymentStatus() {
    this.storeInfo.transferPayment = !this.storeInfo.transferPayment
    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        transferPayment: this.storeInfo.transferPayment,
      }
    )
      .catch(err => console.log(err));
  }
  updateMpPaymentStatus() {
    this.storeInfo.mpPayment = !this.storeInfo.mpPayment
    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        mpPayment: this.storeInfo.mpPayment,
      }
    )
      .catch(err => console.log(err));
  }

  updateDistrict(evt) {
    evt.value = parseInt(evt.value)
    for (let i = 0; i < this.returnedDistricts.length; i++) {
      if (this.returnedDistricts[i].id == evt.id) {
        this.returnedDistricts[i] = evt
      }
    }

    this.store.localRanges = this.returnedDistricts

    let key = this.storeInfo.key
    setTimeout(() => {
      this.storeService.updateStore(
        key,
        {
          localRanges: this.store.localRanges,
        }
      )
        .catch(err => console.log(err));
    }, 100)

    this.searchDistrict(evt.name)

    this.editDistrict = false

  }

  updateDistrictStatus(id) {
    for (let i = 0; i < this.returnedDistricts.length; i++) {
      if (this.returnedDistricts[i].id == id) {
        this.returnedDistricts[i].status = !this.returnedDistricts[i].status
      }
    }

    this.store.localRanges = this.returnedDistricts

    let key = this.storeInfo.key
    this.storeService.updateStore(
      key,
      {
        localRanges: this.store.localRanges,
      }
    )
      .catch(err => console.log(err));
  }

  saveStore() {
    this.store.name = this.storeInfo.name
    this.store.email = this.storeInfo.email
    this.store.phone = this.storeInfo.phone
    this.store.address = this.storeInfo.address
    this.store.number = this.storeInfo.number
    this.store.neightborhood = this.storeInfo.neightborhood
    this.updateStoreInfo()
  }

  mountDistricts() {
    this.districts = [

      {
        name: 'Albatroz 1',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Aldeia Indígena',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'B Mogiano',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Balneário Itapoã',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Balneário Magiano Boraceia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Balneário Mogiano',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Balneário Mogiano Boraceia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Baraceia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Bertioga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Boraceia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Caibura',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Caiubura',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Caruara',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Centro',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Chácara Itapanhau',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Chácara Jardim Vista',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Chácara Jardim Vista Linda',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Chácara Vista Linda',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Chácaras Itapanhau',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Cliper',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Costa do Sol',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Costa Sol',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Enseada',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Firiera São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Graratuba',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Guarajuba',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Guaratuba',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Guaratuba II',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Indaiá',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Itaguaré',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Albatros',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Albatroz',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Albatroz I',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Albatroz II',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Ana Paula',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Ana Paula Jardim das Nações',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Caiçara',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Cancoes',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim das Cancoes',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Indaiá',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Itapoan',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Lido',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Morelli',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Neptunia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Paulista',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Rafael',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Raphael',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Refúgio',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Remanso',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Rio da Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Rio Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Rua da Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim S Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim S Lourenço I',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim São Rafael',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim São Vicente',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Sol',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vic de Carvalho',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vicente Carvalho',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vicente Carvalho I',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vicente de Carvalho Ii',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vila Carvalho I',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vila Carvalho Ii',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vista Alegre',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Jardim Vista Linda',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Km 210',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Km 248 200 Mts',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Loteamento Jardim Vista Alegre',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Loteamento Miguel Vila Cury Paulo',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Loteamento Oswaldo Cruz',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Maitinga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Morada da Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Morada Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Parque Bertioga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Parque Caiubura',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Parque Estoril',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Pomares',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia da Enseada',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia da Maitinga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia de Guaratuba',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia de Maitinga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia do Maitinga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia Guaratuba',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Praia Maitinga',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Residencial Módulo 18',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Residencial Módulo 2',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Residencial Módulo 26',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Residencial Módulo 3',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Residencial Módulo 6',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Revieira São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riv de São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riv S Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riv São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera de São Lor',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera de São Lorenco',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera de São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera de Só Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera S Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera São Lorenco',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera São Lourenc',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Riviera São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rivsao Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 18',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 2',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 20',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 26',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 27',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 3',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 30',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 4',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 5',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 6',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 7',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo 8',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Dois',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Quatro',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Seis',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Sete',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Três',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rsl Módulo Vinte Sete',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Rua de S Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Santista',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'São Lourenço',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Sítio Caiubura',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Sítio São João',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Valhoz',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Veleiro',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vic Carvalho Ii',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vicente Carvalho',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vicente de Carvalho',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vicente de Carvalho 2',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vicente de Carvalho Ii',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Agao',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Agao II',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Carvalho Ii',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Clais',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Clipper',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Itagua',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Itapanhau',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Santa Teresa',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Tamoios',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vila Tupi',
        value: 0,
        timeToDelivery: 0,
        status: false
      },
      {
        name: 'Vista Linda',
        value: 0,
        timeToDelivery: 0,
        status: false
      }
    ]

    this.mountStore()
  }
}
