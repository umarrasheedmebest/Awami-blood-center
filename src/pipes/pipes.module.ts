import { NgModule } from '@angular/core';
import { SearchDonarPipe } from './search-donar/search-donar';
import { DaysCounterPipe } from './days-counter/days-counter';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SimpleSearchPipe } from './simple-search/simple-search';
@NgModule({
	declarations: [SearchDonarPipe,
		DaysCounterPipe,
    SimpleSearchPipe,
		TimeAgoPipe
	],
	imports: [],
	exports: [SearchDonarPipe,
		DaysCounterPipe,
    SimpleSearchPipe,
		TimeAgoPipe
	]
})
export class PipesModule { }
