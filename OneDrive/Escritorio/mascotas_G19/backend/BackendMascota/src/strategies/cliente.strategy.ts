import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {RedirectRoute} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class EstartegiaCliente implements AuthenticationStrategy {
  name: "cliente";
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    throw new Error('Method not implemented.');
  }
}
