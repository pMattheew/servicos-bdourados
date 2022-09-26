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
  password: any;

  constructor(
    private loadingCtrl: LoadingController,
    private usrService: UsuarioService,
    private nav: NavController,
    public alerta: AlertController
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

  async criarAlerta(titulo: string, msg: string) {

    const alert = await this.alerta.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });

    return alert.present();
  }

  async enviarUsuario() {
    
    const loading = await this.loadingCtrl.create({message:'Carregando...'});

    loading.present();

    if (this.password.length < 8)
    {
      loading.dismiss();
      return this.criarAlerta('Ops!','A senha deve ser igual ou maior do que 8 caracteres.');
    }
    
    this.usrService.registrarUsuario(this.form.value)
    .pipe(take(1))
    .subscribe(() => {

      loading.dismiss();
      this.nav.navigateBack('/login');
      this.criarAlerta('=D', 'Usuário cadastrado com sucesso!')

    }, (ex) => {

      loading.dismiss();
      this.criarAlerta('Ops!', 'Um erro ocorreu, certifique-se de inserir um email válido.');

    });
    
  }
}
