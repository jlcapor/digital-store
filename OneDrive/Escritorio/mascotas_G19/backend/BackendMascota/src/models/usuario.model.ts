import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Rol} from './rol.model';
import {RolUsuario} from './rol-usuario.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;


  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
  })
  token?: string;

  @property({
    type: 'string',
    default: false,
  })
  confirmado?: string;

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  @hasMany(() => Rol, {through: {model: () => RolUsuario}})
  roles: Rol[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
