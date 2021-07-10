import { Directive, HostListener, ElementRef   } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Directive({
  selector: '[numero]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDirective,
    multi: true
  }]
})
export class NumeroDirective {

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event'])

  onKeyUp($event: any) {

    let valor = $event.target.value;
    let posiDeci = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, ''); //tudo que não é numero será removido

    if(posiDeci > 0 ) {
      valor = valor.substr(0, posiDeci) + '.' + valor.substr(posiDeci); //valor 0 da posiDeci + . + o valor em si, que seria os centavos
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

  //Registra função a ser chamada para atualizar o valor no model
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

    //Obtem o exato valor contido no model
  writeValue(value: any) {
    this.el.nativeElement.value = value;
  }
}
