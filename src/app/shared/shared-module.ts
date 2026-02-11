import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Input } from '../shared/components/input/input';
import { Button } from '../shared/components/button/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, Input, Button],
  exports: [Input, Button],
})
export class SharedModule {}
