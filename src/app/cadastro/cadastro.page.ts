import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { UsuarioService } from '../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  form: FormGroup;

  constructor(
    private loadingCtrl: LoadingController,
    private usrService: UsuarioService,
    private nav: NavController,
    private alerta: AlertController
  ) { }

  ngOnInit() {
    this.initUsuarioForm();
  }

  initUsuarioForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async enviarUsuario() {
    const loading = await this.loadingCtrl.create({message:'Carregando...'});
    loading.present();
    
    const alert = await this.alerta.create({
      header: "=D",
      message: 'Usuário cadastrado com sucesso!',
      buttons: ['OK']
    })

    this.usrService.registrarUsuario(this.form.value)
    .pipe(take(1))
    .subscribe((usuario) => {
      console.log(usuario);
      loading.dismiss();
      alert.present();
      this.nav.navigateBack('/login');
    })
  }
}
