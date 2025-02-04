import { Information } from '../model/information.model';
import { Observable } from 'rxjs';

export abstract class InformationClientGateway {

  abstract sendInformation(info: Information): Observable<Information>;

}
