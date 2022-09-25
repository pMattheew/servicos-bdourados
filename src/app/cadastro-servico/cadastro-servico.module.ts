import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroServicoPageRoutingModule } from './cadastro-servico-routing.module';

import { CadastroServicoPage } from './cadastro-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadastroServicoPageRoutingModule
  ],
  declarations: [CadastroServicoPage]
})
export class CadastroServicoPageModule {}
