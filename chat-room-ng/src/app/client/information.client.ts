import { filter, map, Observable, tap } from 'rxjs';
import { InformationClientGateway } from '../domain/gateway/information.client.gateway';
import { Information } from '../domain/model/information.model';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { InformationDto } from './dto/information.dto';
import { mapInfoToDto, mapInfoToModel } from './mapper/information.mapper';

export class InformationClient extends InformationClientGateway {

  httpClient = inject(HttpClient)


  override sendInformation(info: Information): Observable<Information> {

    let informationDto: InformationDto = mapInfoToDto(info);

    return this.httpClient.post<InformationDto>('http://localhost:3000/information', informationDto).pipe(
      tap(console.log),
      map(mapInfoToModel),
      tap(console.log),
    )
  }

}
