import { Information } from '../../domain/model/information.model';
import { InformationDto } from '../dto/information.dto';

export function mapInfoToDto(info: Information): InformationDto {
  return {
    info: info.message,
    date: info.date.getTime(),
    id: info.id
  }
}

export function mapInfoToModel(infoDto: InformationDto): Information {

  let { info, date, ...rest} = infoDto;

  return {
    ...rest,
    message: info,
    date: new Date(date)
  }
}
