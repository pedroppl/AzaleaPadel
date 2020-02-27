import { NgModule } from '@angular/core';
import { HorasPipe } from './horas/horas';
import { TramosPipe } from './tramos/tramos';
import { DiasSemanaPipe } from './dias-semana/dias-semana';
import { NombresMesesPipe } from './nombres-meses/nombres-meses';
@NgModule({
	declarations: [HorasPipe,
    TramosPipe,
    DiasSemanaPipe,
    NombresMesesPipe],
	imports: [],
	exports: [HorasPipe,
    TramosPipe,
    DiasSemanaPipe,
    NombresMesesPipe]
})
export class PipesModule {}
