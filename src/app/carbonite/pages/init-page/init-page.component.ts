import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.scss']
})
export class InitPageComponent implements OnInit {

  @Output() scrollPosition = new EventEmitter<any>();

  showGalery
  images
  count = 1
  constructor() { }

  ngOnInit() {
    this.images = [
      {
        id: 1,
        src: '../../../../assets/no-bg/frasco-chimichurri.png'
      },
      {
        id: 2,
        src: '../../../../assets/no-bg/frasco-frango.png'
      },
      {
        id: 3,
        src: '../../../../assets/no-bg/frasco-peixe.png'
      },
      {
        id: 4,
        src: '../../../../assets/no-bg/frasco-sal-grosso-chimichurri.png'
      },
      {
        id: 5,
        src: '../../../../assets/no-bg/frasco-sal-grosso-cordeiro-carneiro.png'
      },
      {
        id: 6,
        src: '../../../../assets/no-bg/frasco-sal-temperado-churrasco.png'
      },
      {
        id: 7,
        src: '../../../../assets/no-bg/fumaca-liquida.png'
      },
      {
        id: 8,
        src: '../../../../assets/no-bg/moedor-sal-grosso-chimichurri.png'
      },
      {
        id: 9,
        src: '../../../../assets/no-bg/moedor-sal-rosa.png'
      },
      {
        id: 10,
        src: '../../../../assets/no-bg/pimenta-calabresa.png'
      },
      {
        id: 11,
        src: '../../../../assets/no-bg/pimenta-labios-de-moca.png'
      },
      {
        id: 12,
        src: '../../../../assets/no-bg/pimenta-verde.png'
      },
      {
        id: 13,
        src: '../../../../assets/no-bg/sache-alho-frito.png'
      },
      {
        id: 14,
        src: '../../../../assets/no-bg/sache-baiano.png'
      },
      {
        id: 15,
        src: '../../../../assets/no-bg/sache-bruschetta.png'
      },
      {
        id: 16,
        src: '../../../../assets/no-bg/sache-caipira.png'
      },
      {
        id: 17,
        src: '../../../../assets/no-bg/sache-carneiro-cordeiro.png'
      },
      {
        id: 18,
        src: '../../../../assets/no-bg/sache-chimi-churry.png'
      },
      {
        id: 19,
        src: '../../../../assets/no-bg/sache-churrasco.png'
      },
      {
        id: 20,
        src: '../../../../assets/no-bg/sache-farofa.png'
      },
      {
        id: 21,
        src: '../../../../assets/no-bg/sache-gaucho.png'
      },
      {
        id: 22,
        src: '../../../../assets/no-bg/sache-nordestino.png'
      },
      {
        id: 23,
        src: '../../../../assets/no-bg/sache-peixe.png'
      },
      {
        id: 24,
        src: '../../../../assets/no-bg/sache-sal-grosso.png'
      },
      {
        id: 25,
        src: '../../../../assets/no-bg/sache-vinagrete.png'
      }
    ]
  }

  sendScrollPosition() {
    let scroll = document.getElementsByClassName('page-content-scroll')[0].scrollTop
    console.log(scroll)
      if (scroll > 100) {
        this.scrollPosition.emit(true)
      } else {
        this.scrollPosition.emit(false)
      }
  }

  changeCountId(operator) {
    debugger
    if (operator == '+') {
      if (this.count != this.images.length) {
        this.count += 1
      } else {
        this.count = 1
      }
    } else {
      if (this.count != 1) {
        this.count -= 1
      } else {
        this.count = this.images.length
      }
    }
  }

}
