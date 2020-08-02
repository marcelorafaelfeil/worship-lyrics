import { worshipServer } from './http/worshipServer';
import { configuration } from './configuration';

export function bootstrap() {
  configuration().initialize();
  worshipServer().initialize();
}
